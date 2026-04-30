import type { BlockProps, BlockData } from '../renderer/block.types';
import { RichText } from '@/shared/ui/RichText';

type RichTextBlockData = BlockData<{
  type: 'richtext';
  html?: string | null;
}>;

export function RichTextBlock({ block }: BlockProps<RichTextBlockData>) {
  return <RichText html={block.html ?? ''} />;
}
