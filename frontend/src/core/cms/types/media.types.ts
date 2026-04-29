export interface MediaAsset {
  id: string | number;
  url: string;
  title?: string | null;
  description?: string | null;
  mimeType?: string | null;
  width?: number | null;
  height?: number | null;
  filename?: string | null;
}
