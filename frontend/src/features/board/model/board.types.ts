import type { Category, Person } from '@/shared/types/domain';

export interface BoardRole {
  id: string | number;
  sort: number | null;
  role: string;
  email: string | null;
  isVacant: boolean;
  category: Category | null;
  person: Person | null;
}

export interface BoardGroup {
  category: Category | null;
  roles: BoardRole[];
}
