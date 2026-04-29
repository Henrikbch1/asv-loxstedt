export interface NavigationItem {
  key: string;
  label: string;
  href: string | null;
  sort: number | null;
  children: NavigationItem[];
}
