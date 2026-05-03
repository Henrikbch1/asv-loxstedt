import type { ComponentType } from 'react';

export interface ContentBlock {
  type: string;
  [key: string]: unknown;
}

export interface BlockProps<T extends ContentBlock = ContentBlock> {
  block: T;
}

// Utility to make a specific block data type satisfy the ContentBlock index signature
export type BlockData<T extends Record<string, unknown>> = T & ContentBlock;

export type BlockComponent<T extends ContentBlock = ContentBlock> =
  ComponentType<BlockProps<T>>;
