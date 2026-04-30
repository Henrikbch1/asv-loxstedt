import type { Role, Category, Person } from '@/shared/types/domain';
import { expandDirectusRelation } from '@/shared/utils/directus';
import type { BoardRole, BoardGroup } from './board.types';

export function mapRoleToBoardRole(role: Role): BoardRole {
  return {
    id: role.id,
    sort: role.sort,
    role: role.role,
    email: role.email ?? null,
    isVacant: role.is_vacant,
    category: expandDirectusRelation<Category>(role.category),
    person: expandDirectusRelation<Person>(role.person_link),
  };
}

export function groupBoardRoles(roles: BoardRole[]): BoardGroup[] {
  const groups: BoardGroup[] = [];
  for (const role of roles) {
    const last = groups[groups.length - 1];
    if (!last || last.category?.name !== role.category?.name) {
      groups.push({ category: role.category, roles: [role] });
    } else {
      last.roles.push(role);
    }
  }
  return groups;
}
