import { useEffect, useMemo, useState } from 'react';
import { ContentPage } from '@/shared/ui/ContentPage';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { RichText } from '@/shared/ui/RichText';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Badge } from '@/shared/ui/Badge';
import { useSiteTitle } from '@/core/settings/useSiteTitle';
import type {
  CmsPage,
  FishRegulation,
  FishWaterType,
} from '@/shared/types/domain';
import { getCmsAssetLabel, getCmsAssetUrl } from '@/shared/utils/assets';
import { useFishRegulationsQuery } from './useFishRegulationsQuery';
import {
  formatClosedSeason,
  formatMinimumSize,
  getFishRegulationStatus,
} from './model/seasonStatus';
import { cn } from '@/shared/lib/cn';

const styles = {
  controls: 'grid gap-3 rounded-lg border border-border bg-white p-4 shadow-sm',
  searchInput:
    'w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20',
  filterBar: 'flex flex-wrap gap-2',
  filterButton:
    'rounded-full border border-border px-3 py-1.5 text-sm font-medium transition hover:border-brand hover:text-brand',
  filterButtonActive: 'border-brand bg-brand text-white hover:text-white',
  list: 'grid gap-3 sm:grid-cols-2 xl:grid-cols-3',
  card: 'grid gap-3 rounded-lg border border-border bg-white p-4 shadow-sm',
  cardHeader: 'flex items-start gap-3',
  imageWrap:
    'h-24 shrink-0 overflow-hidden rounded-md border border-border bg-surface-strong sm:h-28',
  image: 'block h-full w-auto object-contain',
  fallbackIcon: 'flex h-full w-24 items-center justify-center text-muted sm:w-28',
  fishName: 'text-base font-semibold leading-tight text-black',
  fishMeta: 'grid gap-2 text-sm text-muted',
  metaRow: 'flex items-center justify-between gap-3',
  statusWrap: 'pt-1',
} as const;

type WaterFilter = FishWaterType | null;

interface FishRegulationsPageViewProps {
  page: CmsPage;
}

function getWaterFilterLabel(value: string): string {
  return value
    .split('_')
    .map((segment) =>
      segment.length > 0
        ? `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`
        : segment,
    )
    .join(' ');
}

function matchesWaterType(
  itemType: FishWaterType,
  filter: WaterFilter,
): boolean {
  if (!filter) {
    return true;
  }

  if (itemType === 'all') {
    return true;
  }

  return itemType === filter;
}

function FishFallbackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8"
      fill="none"
      viewBox="-2 -2 28 28"
      width="28"
      height="28"
    >
      <path
        d="M3 12c2.1-2.7 5.5-4.5 9.5-4.5 3.1 0 5.8 1 7.8 2.6l.7-.6v5l-3.9 1.4.7-.9A12.2 12.2 0 0 1 12.5 16.5C8.5 16.5 5.1 14.7 3 12Zm8.5-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function FishRegulationCard({ item }: { item: FishRegulation }) {
  const imageUrl = getCmsAssetUrl(item.image, {
    width: 320,
    height: 320,
    fit: 'inside',
    format: 'webp',
    quality: 70,
  });

  const status = getFishRegulationStatus(item);
  const isBlocked = status === 'blocked';

  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.imageWrap} aria-hidden="true">
          {imageUrl ? (
            <img
              alt={getCmsAssetLabel(item.image)}
              className={styles.image}
              loading="lazy"
              decoding="async"
              src={imageUrl}
            />
          ) : (
            <div className={styles.fallbackIcon}>
              <FishFallbackIcon />
            </div>
          )}
        </div>
        <h2 className={styles.fishName}>{item.name}</h2>
      </div>

      <dl className={styles.fishMeta}>
        <div className={styles.metaRow}>
          <dt>Mindestmass</dt>
          <dd>{formatMinimumSize(item.minimum_size_cm)}</dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Schonzeit</dt>
          <dd>{formatClosedSeason(item)}</dd>
        </div>
      </dl>

      {isBlocked ? (
        <div className={styles.statusWrap}>
          <Badge className="bg-red-100 text-red-700">Gesperrt</Badge>
        </div>
      ) : null}
    </li>
  );
}

export function FishRegulationsPageView({
  page,
}: FishRegulationsPageViewProps) {
  useSiteTitle(page.title || 'Schonzeiten und Mindestmasse');

  const [searchValue, setSearchValue] = useState('');
  const [waterFilter, setWaterFilter] = useState<WaterFilter>(null);
  const regulationsQuery = useFishRegulationsQuery();

  const availableWaterFilters = useMemo<FishWaterType[]>(() => {
    const values = new Set<FishWaterType>();

    for (const item of regulationsQuery.data ?? []) {
      if (item.water_type !== 'all') {
        values.add(item.water_type);
      }
    }

    const ordered = [...values];
    ordered.sort((a, b) => a.localeCompare(b, 'de-DE'));

    return ordered;
  }, [regulationsQuery.data]);

  useEffect(() => {
    if (availableWaterFilters.length === 0) {
      if (waterFilter !== null) {
        setWaterFilter(null);
      }
      return;
    }

    if (!waterFilter || !availableWaterFilters.includes(waterFilter)) {
      setWaterFilter(availableWaterFilters[0]);
    }
  }, [availableWaterFilters, waterFilter]);

  const filteredItems = useMemo(() => {
    const term = searchValue.trim().toLowerCase();

    return (regulationsQuery.data ?? [])
      .filter((item) => matchesWaterType(item.water_type, waterFilter))
      .filter((item) =>
        term.length === 0 ? true : item.name.toLowerCase().includes(term),
      )
      .sort((a, b) => {
        const sortA = a.sort ?? Number.MAX_SAFE_INTEGER;
        const sortB = b.sort ?? Number.MAX_SAFE_INTEGER;

        if (sortA !== sortB) {
          return sortA - sortB;
        }

        return a.name.localeCompare(b.name, 'de-DE');
      });
  }, [regulationsQuery.data, searchValue, waterFilter]);

  if (regulationsQuery.isPending) {
    return <LoadingState title="Schonzeiten und Mindestmasse werden geladen" />;
  }

  if (regulationsQuery.isError) {
    return (
      <ErrorState
        message="Die Fischregelungen konnten nicht geladen werden."
        onRetry={() => {
          void regulationsQuery.refetch();
        }}
      />
    );
  }

  return (
    <ContentPage>
      <SectionHeading
        eyebrow="Gewaesser"
        title={page.title || 'Schonzeiten und Mindestmasse'}
        description={
          page.intro ??
          'Suche nach Fischarten und pruefe Mindestmass, Schonzeit und Freigabe-Status fuer Lune und Stoteler See.'
        }
      />

      {page.content ? (
        <RichText className={ContentPage.bodyClass} html={page.content} />
      ) : null}

      <section
        className={styles.controls}
        aria-label="Filter fuer Fischregelungen"
      >
        <label>
          <span className="sr-only">Suche nach Fischname</span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Fischname suchen"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </label>

        <div
          className={styles.filterBar}
          role="tablist"
          aria-label="Wasser filter"
        >
          {availableWaterFilters.map((filter) => (
            <button
              key={filter}
              className={cn(
                styles.filterButton,
                waterFilter === filter && styles.filterButtonActive,
              )}
              type="button"
              onClick={() => {
                setWaterFilter(filter);
              }}
              role="tab"
              aria-selected={waterFilter === filter}
            >
              {getWaterFilterLabel(filter)}
            </button>
          ))}
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <EmptyState
          title="Keine passenden Fische gefunden"
          message="Passe Suche oder Filter an, um vorhandene Regelungen zu sehen."
        />
      ) : (
        <ul className={styles.list}>
          {filteredItems.map((item) => (
            <FishRegulationCard key={String(item.id)} item={item} />
          ))}
        </ul>
      )}
    </ContentPage>
  );
}
