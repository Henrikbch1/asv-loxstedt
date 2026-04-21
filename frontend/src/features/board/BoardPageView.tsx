import { RichText } from "../../components/ui/RichText";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import type { CmsPage, Category, Person } from "../../types/cms";
import { getCmsAssetLabel, getCmsAssetUrl } from "../../utils/assets";
import { useSiteTitle } from "../../hooks/useSiteTitle";
import { useBoardRolesQuery } from "./useBoardQueries";

interface BoardPageViewProps {
  page: CmsPage;
}

export function BoardPageView({ page }: BoardPageViewProps) {
  useSiteTitle(page.title);

  const imageUrl = getCmsAssetUrl(page.featured_image, {
    fit: "cover",
    width: 1600,
  });

  const { data: roles, isLoading, isError } = useBoardRolesQuery();

  const sortedRoles = roles
    ? [...roles].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    : [];

  return (
    <article className="content-page">
      <header className="page-hero page-hero--content">
        <div className="page-hero__copy">
          <span className="eyebrow">Seite</span>
          <h1>{page.title}</h1>
        </div>
        {imageUrl ? (
          <div className="page-hero__media">
            <img alt={getCmsAssetLabel(page.featured_image)} src={imageUrl} />
          </div>
        ) : null}
      </header>

      <RichText className="rich-text content-page__body" html={page.content} />

      <section className="content-page__body">
        {isLoading ? <LoadingState /> : null}
        {isError ? <ErrorState /> : null}
        {sortedRoles.length > 0 ? (
          <ul className="board-list">
            {sortedRoles.map((role) => {
              const person =
                role.person_link && typeof role.person_link === "object"
                  ? (role.person_link as Person)
                  : null;
              const category =
                role.category && typeof role.category === "object"
                  ? (role.category as Category)
                  : null;
              const fullName = [person?.firstname, person?.lastname]
                .filter(Boolean)
                .join(" ");

              return (
                <li key={String(role.id)} className="board-card">
                  <div className="eyebrow">{role.role}</div>
                  {category ? (
                    <span className="news-card__badge">{category.name}</span>
                  ) : null}
                  {role.is_vacant ? (
                    <p className="board-card__vacant">Zurzeit unbesetzt</p>
                  ) : (
                    <p className="board-card__name">{fullName || "—"}</p>
                  )}
                  {!role.is_vacant && role.email ? (
                    <a
                      className="board-card__email"
                      href={`mailto:${role.email}`}
                    >
                      {role.email}
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>
    </article>
  );
}
