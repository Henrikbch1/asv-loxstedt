import { Fragment } from 'react';
import { RichText } from '@/core/ui/RichText';
import { LoadingState } from '@/core/ui/LoadingState';
import { ErrorState } from '@/core/ui/ErrorState';
import { PageHero } from '@/core/ui/PageHero';
import { ContentPage } from '@/core/ui/ContentPage';
import { Badge } from '@/core/ui/Badge';
import type { CmsPage, Category, Person } from '@/shared/types/domain';
import { getCmsAssetLabel, getCmsAssetUrl } from '@/shared/utils/assets';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import { useBoardRolesQuery } from './useBoardQueries';
import { expandDirectusRelation } from '@/shared/utils/directus';

const styles = {
  boardList: 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  boardSection: 'col-span-full',
  boardCard:
    'flex flex-col gap-1 rounded-lg border border-border bg-white p-4 shadow-sm',
  eyebrow: 'text-xs font-bold uppercase tracking-wider text-brand',
  vacant: 'italic text-muted',
  name: 'font-semibold',
  email: 'text-sm text-brand hover:underline',
} as const;

interface BoardPageViewProps {
  page: CmsPage;
}

export function BoardPageView({ page }: BoardPageViewProps) {
  useSiteTitle(page.title);

  const imageUrl = getCmsAssetUrl(page.featured_image, {
    fit: 'cover',
    width: 1600,
  });

  const { data: roles, isLoading, isError } = useBoardRolesQuery();

  const sortedRoles = roles
    ? [...roles].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    : [];

  return (
    <ContentPage>
      <PageHero
        eyebrow="Unser"
        title={page.title}
        imageUrl={imageUrl}
        imageAlt={getCmsAssetLabel(page.featured_image)}
      />

      <RichText className={ContentPage.bodyClass} html={page.content} />

      <section>
        {isLoading ? <LoadingState /> : null}
        {isError ? <ErrorState /> : null}
        {sortedRoles.length > 0 ? (
          <ul className={styles.boardList}>
            {sortedRoles.map((role, index) => {
              const person = expandDirectusRelation<Person>(role.person_link);
              const category = expandDirectusRelation<Category>(role.category);
              const prevRole = index > 0 ? sortedRoles[index - 1] : null;
              const prevCategory = expandDirectusRelation<Category>(
                prevRole?.category ?? null,
              );
              const showCategoryMarker = category?.name !== prevCategory?.name;
              const fullName = [person?.firstname, person?.lastname]
                .filter(Boolean)
                .join(' ');

              return (
                <Fragment key={String(role.id)}>
                  {showCategoryMarker && category ? (
                    <li className={styles.boardSection}>
                      <Badge>{category.name}</Badge>
                    </li>
                  ) : null}
                  <li className={styles.boardCard}>
                    <div className={styles.eyebrow}>{role.role}</div>
                    {role.is_vacant ? (
                      <p className={styles.vacant}>Zurzeit unbesetzt</p>
                    ) : (
                      <p className={styles.name}>{fullName || '—'}</p>
                    )}
                    {!role.is_vacant && role.email ? (
                      <a className={styles.email} href={`mailto:${role.email}`}>
                        {role.email}
                      </a>
                    ) : null}
                  </li>
                </Fragment>
              );
            })}
          </ul>
        ) : null}
      </section>
    </ContentPage>
  );
}
