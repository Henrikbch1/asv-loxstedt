import type { BlockProps, ContentBlock } from '../renderer/block.types';

/**
 * Fallback rendered for any block type not registered in blockRegistry.
 * In production this renders nothing; in development it shows a warning.
 */
export function UnknownBlock({ block }: BlockProps<ContentBlock>) {
  if (import.meta.env.DEV) {
    return (
      <div className="rounded border border-dashed border-orange-400 bg-orange-50 p-4 text-sm text-orange-700">
        Unknown block type: <code>{block.type}</code>
      </div>
    );
  }
  return null;
}
