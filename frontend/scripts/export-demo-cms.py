from __future__ import annotations

import json
import sqlite3
from collections import OrderedDict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT.parent / "cms" / "database" / "data.db"
OUT_PATH = ROOT / "public" / "demo" / "cms.json"


def fetch_rows(conn: sqlite3.Connection, table: str, order_by: str | None = None) -> list[dict[str, Any]]:
    query = f"SELECT * FROM {table}"
    if order_by:
        query += f" ORDER BY {order_by}"

    conn.row_factory = sqlite3.Row
    cursor = conn.execute(query)
    return [dict(row) for row in cursor.fetchall()]


def clean(value: Any) -> Any:
    if isinstance(value, dict):
        return {key: clean(inner_value) for key, inner_value in value.items() if inner_value is not None}

    if isinstance(value, list):
        return [clean(item) for item in value]

    return value


def build_export(conn: sqlite3.Connection) -> dict[str, Any]:
    files = {row["id"]: row for row in fetch_rows(conn, "directus_files")}
    categories = {row["id"]: row for row in fetch_rows(conn, "categories", "sort, name")}
    persons = {row["id"]: row for row in fetch_rows(conn, "persons", "sort, firstname, lastname")}
    pages = {row["id"]: row for row in fetch_rows(conn, "pages", "title")}
    navigation = fetch_rows(conn, "navigation", "sort, label")
    news = fetch_rows(conn, "news", "date DESC, id DESC")
    downloads = fetch_rows(conn, "downloads", "category, sort, title")
    features = fetch_rows(conn, "features", "key")
    roles = fetch_rows(conn, "roles", "sort, role")
    global_settings = fetch_rows(conn, "global_settings")

    def file_object(file_id: Any) -> dict[str, Any] | None:
        if not file_id:
            return None

        row = files.get(file_id)
        if not row:
            return {"id": file_id}

        return clean(
            {
                "id": row.get("id"),
                "title": row.get("title"),
                "filename_download": row.get("filename_download"),
                "type": row.get("type"),
                "width": row.get("width"),
                "height": row.get("height"),
                "description": row.get("description"),
            }
        )

    def category_object(category_id: Any) -> dict[str, Any] | None:
        if not category_id:
            return None

        row = categories.get(category_id)
        if not row:
            return {"id": category_id}

        return clean(
            {
                "id": row.get("id"),
                "sort": row.get("sort"),
                "name": row.get("name"),
            }
        )

    def person_object(person_id: Any) -> dict[str, Any] | None:
        if not person_id:
            return None

        row = persons.get(person_id)
        if not row:
            return {"id": person_id}

        return clean(
            {
                "id": row.get("id"),
                "sort": row.get("sort"),
                "firstname": row.get("firstname"),
                "lastname": row.get("lastname"),
            }
        )

    def page_summary(page_id: Any) -> dict[str, Any] | None:
        if not page_id:
            return None

        row = pages.get(page_id)
        if not row:
            return {"id": page_id}

        return clean(
            {
                "id": row.get("id"),
                "title": row.get("title"),
                "slug": row.get("slug"),
                "navigation_title": row.get("navigation_title"),
            }
        )

    def page_object(row: dict[str, Any]) -> dict[str, Any]:
        data = dict(row)
        data["featured_image"] = file_object(data.get("featured_image"))
        return clean(data)

    def news_object(row: dict[str, Any]) -> dict[str, Any]:
        data = dict(row)
        data["image"] = file_object(data.get("image"))
        data["category"] = category_object(data.get("category"))
        return clean(data)

    def download_object(row: dict[str, Any]) -> dict[str, Any]:
        data = dict(row)
        data["file"] = file_object(data.get("file"))
        data["category"] = category_object(data.get("category"))
        return clean(data)

    def role_object(row: dict[str, Any]) -> dict[str, Any]:
        data = dict(row)
        data["category"] = category_object(data.get("category"))
        data["person_link"] = person_object(data.get("person_link"))
        return clean(data)

    def nav_object(row: dict[str, Any]) -> dict[str, Any]:
        data = dict(row)
        data["page"] = page_summary(data.get("page"))

        parent_id = data.get("parent")
        if parent_id:
            parent_row = next((item for item in navigation if item["id"] == parent_id), None)
            if parent_row:
                data["parent"] = {
                    "label": parent_row["label"],
                    "page": page_summary(parent_row.get("page")),
                }
            else:
                data["parent"] = {"id": parent_id}
        else:
            data["parent"] = None

        return clean(data)

    settings_data = dict(global_settings[0]) if global_settings else {}
    settings_data["logo"] = file_object(settings_data.get("logo"))

    manifest: OrderedDict[str, Any] = OrderedDict()
    manifest["global_settings"] = {"data": clean(settings_data)}
    manifest["navigation"] = {"data": [nav_object(row) for row in navigation]}
    manifest["pages"] = {"data": [page_object(row) for row in pages.values()]}
    manifest["news"] = {
        "data": [news_object(row) for row in news],
        "meta": {
            "filter_count": len(news),
            "total_count": len(news),
        },
    }
    manifest["downloads"] = {"data": [download_object(row) for row in downloads]}
    manifest["features"] = {"data": [clean(row) for row in features]}
    manifest["roles"] = {"data": [role_object(row) for row in roles]}

    return manifest


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit(f"SQLite database not found: {DB_PATH}")

    with sqlite3.connect(DB_PATH) as conn:
        manifest = build_export(conn)

    OUT_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_PATH}")


if __name__ == "__main__":
    main()