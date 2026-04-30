import type { BlockProps, BlockData } from '../renderer/block.types';

type HeroBlockData = BlockData<{
  type: 'hero';
  title?: string | null;
  subtitle?: string | null;
  imageUrl?: string | null;
}>;

export function HeroBlock({ block }: BlockProps<HeroBlockData>) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 py-16 text-center">
      {block.imageUrl ? (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src={block.imageUrl}
        />
      ) : null}
      <div className="relative z-10">
        {block.title ? (
          <h2 className="text-3xl font-bold">{block.title}</h2>
        ) : null}
        {block.subtitle ? (
          <p className="mt-2 text-lg">{block.subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
