import { NotFoundState } from "../components/ui/NotFoundState";
import { useSiteTitle } from "../hooks/useSiteTitle";

export function NotFoundPage() {
  useSiteTitle("Seite nicht gefunden");
  return <NotFoundState />;
}
