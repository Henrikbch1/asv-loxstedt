import type { BlockProps, BlockData } from '../renderer/block.types';

interface GalleryItem {
  src: string;
  alt?: string | null;
}

type GalleryBlockData = BlockData<{
  type: 'gallery';
  images?: GalleryItem[] | null;
}>;

export function GalleryBlock({ block }: BlockProps<GalleryBlockData>) {
  if (!block.images?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {block.images.map((image, index) => (
        <img
          key={index}
          alt={image.alt ?? ''}
          className="aspect-square w-full rounded-lg object-cover"
          src={image.src}
        />
      ))}
    </div>
  );
}
