import type { Area } from 'react-easy-crop';

const SIZE = 1080;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Không tải được khung avatar.'));
    img.src = src;
  });
}

export async function composeAvatar(
  sourceUrl: string,
  crop: Area,
  frameUrl: string,
): Promise<Blob> {
  const [photo, frame] = await Promise.all([loadImage(sourceUrl), loadImage(frameUrl)]);
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Thiết bị không hỗ trợ xử lý ảnh.');
  ctx.drawImage(
    photo,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    SIZE,
    SIZE,
  );
  ctx.drawImage(frame, 0, 0, SIZE, SIZE);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Không ghép được avatar.'))),
      'image/png',
    );
  });
}

export function blobToFile(blob: Blob, name = 'tan-binh-coc-nhap-ngu.png'): File {
  return new File([blob], name, { type: blob.type || 'image/png' });
}
