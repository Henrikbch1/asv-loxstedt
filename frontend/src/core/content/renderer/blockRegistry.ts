import type { BlockComponent, ContentBlock } from './block.types';
import { RichTextBlock } from '../blocks/RichTextBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { HeroBlock } from '../blocks/HeroBlock';
import { GalleryBlock } from '../blocks/GalleryBlock';
import { ButtonGroupBlock } from '../blocks/ButtonGroupBlock';
import { UnknownBlock } from '../blocks/UnknownBlock';

/**
 * Whitelist of allowed content block types.
 * Only registered block types are rendered; anything else is handled by UnknownBlock.
 */
const registry: Record<string, BlockComponent<ContentBlock>> = {
  richtext: RichTextBlock as BlockComponent<ContentBlock>,
  image: ImageBlock as BlockComponent<ContentBlock>,
  hero: HeroBlock as BlockComponent<ContentBlock>,
  gallery: GalleryBlock as BlockComponent<ContentBlock>,
  buttongroup: ButtonGroupBlock as BlockComponent<ContentBlock>,
};

export function resolveBlock(type: string): BlockComponent<ContentBlock> {
  return registry[type] ?? UnknownBlock;
}

export function getRegisteredBlockTypes(): string[] {
  return Object.keys(registry);
}
