import type { ContentBlock } from './block.types';
import { resolveBlock } from './blockRegistry';

interface ContentRendererProps {
  blocks?: ContentBlock[] | null;
}

/**
 * Iterates a list of CMS content blocks and renders each via the block registry.
 * Unknown block types are handled gracefully by the UnknownBlock fallback.
 */
export function ContentRenderer({ blocks }: ContentRendererProps) {
  if (!blocks?.length) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const Block = resolveBlock(block.type);
        return <Block key={index} block={block} />;
      })}
    </div>
  );
}
