import type { BoardRole } from '../model/board.types';
import { boardClasses } from '../styles/board.classes';

interface BoardCardProps {
  role: BoardRole;
}

export function BoardCard({ role }: BoardCardProps) {
  const fullName = [role.person?.firstname, role.person?.lastname]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={boardClasses.card}>
      <div className={boardClasses.eyebrow}>{role.role}</div>
      {role.isVacant ? (
        <p className={boardClasses.vacant}>Zurzeit unbesetzt</p>
      ) : (
        <p className={boardClasses.name}>{fullName || '—'}</p>
      )}
      {!role.isVacant && role.email ? (
        <a className={boardClasses.email} href={`mailto:${role.email}`}>
          {role.email}
        </a>
      ) : null}
    </li>
  );
}
