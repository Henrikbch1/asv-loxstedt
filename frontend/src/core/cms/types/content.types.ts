export type ContentBlockType = 'text' | 'image' | 'gallery' | 'embed';

export interface ContentBlock {
  id: string | number;
  type: ContentBlockType;
  sort?: number | null;
  data?: Record<string, unknown>;
}
