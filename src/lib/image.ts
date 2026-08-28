import { copy } from '../config/copy.config';
import { IMAGE_LIMITS } from '../domain/types';

export function revokeUrl(url: string | null | undefined): void {
  if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
}

export function validateImageFile(file: File): string | null {
  if (file.size > IMAGE_LIMITS.maxBytes) return copy.upload.tooLarge;
  const mimeOk = IMAGE_LIMITS.mime.includes(file.type as (typeof IMAGE_LIMITS.mime)[number]);
  const name = file.name.toLowerCase();
  const extOk = IMAGE_LIMITS.extensions.some((ext) => name.endsWith(ext));
  if (!mimeOk && !extOk) return copy.upload.error;
  return null;
}

export async function decodeImageFile(file: File): Promise<ImageBitmap> {
  const invalid = validateImageFile(file);
  if (invalid) throw new Error(invalid);
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error(copy.upload.error);
  }
}

export async function bitmapToObjectUrl(
  bitmap: ImageBitmap,
  maxEdge = 2048,
): Promise<string> {
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Thiết bị không hỗ trợ xử lý ảnh.');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Không xuất được ảnh.'))),
      'image/jpeg',
      0.92,
    );
  });
  return URL.createObjectURL(blob);
}
