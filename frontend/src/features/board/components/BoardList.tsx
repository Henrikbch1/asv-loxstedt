import { Fragment } from 'react';
import { Badge } from '@/core/ui/Badge';
import { LoadingState } from '@/core/ui/LoadingState';
import { ErrorState } from '@/core/ui/ErrorState';
import { boardClasses } from '../styles/board.classes';
import { BoardCard } from './BoardCard';
import type { BoardGroup } from '../model/board.types';

interface BoardListProps {
  groups: BoardGroup[];
  isLoading: boolean;
  isError: boolean;
}

export function BoardList({ groups, isLoading, isError }: BoardListProps) {
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (groups.length === 0) return null;

  return (
    <ul className={boardClasses.list}>
      {groups.map((group, i) => (
        <Fragment key={group.category?.name ?? i}>
          {group.category ? (
            <li className={boardClasses.section}>
              <Badge>{group.category.name}</Badge>
            </li>
          ) : null}
          {group.roles.map((role) => (
            <BoardCard key={String(role.id)} role={role} />
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
