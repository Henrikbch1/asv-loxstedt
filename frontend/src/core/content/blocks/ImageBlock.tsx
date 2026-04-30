import type { BlockProps, BlockData } from '../renderer/block.types';

type ImageBlockData = BlockData<{
  type: 'image';
  src?: string | null;
  alt?: string | null;
  caption?: string | null;
}>;

export function ImageBlock({ block }: BlockProps<ImageBlockData>) {
  if (!block.src) return null;

  return (
    <figure>
      <img
        alt={block.alt ?? ''}
        className="w-full rounded-lg"
        src={block.src}
      />
      {block.caption ? (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
