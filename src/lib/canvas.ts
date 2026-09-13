import type { Area } from 'react-easy-crop';
import { avatarConfig } from '../config/avatar.config';
import { copy } from '../config/copy.config';

const SIZE = avatarConfig.size;
const MARGIN = 0;
const BORDER = 18;
const BAND_TOP = 104;
const BAND_BOTTOM = 190;

const BRASS = '#E2B34A';
const BRASS_DEEP = '#9A6B18';
const BAND_FILL = 'rgba(14, 18, 12, 0.88)';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Không tải được ảnh: ${src}`));
    img.src = src;
  });
}

/** Canvas letterSpacing thiếu trên Safari cũ, nên giãn chữ thủ công. */
function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number,
): void {
  const chars = [...text];
  const glyphs = chars.map((c) => ({ c, w: ctx.measureText(c).width }));
  const total = glyphs.reduce((w, g) => w + g.w, 0) + tracking * (glyphs.length - 1);
  let x = centerX - total / 2;
  for (const g of glyphs) {
    ctx.fillText(g.c, x, y);
    x += g.w + tracking;
  }
}

async function ensureFonts(): Promise<void> {
  if (!('fonts' in document)) return;
  try {
    await Promise.all([
      document.fonts.load('600 34px Oswald'),
      document.fonts.load('700 76px Oswald'),
      document.fonts.load('700 44px Oswald'),
    ]);
  } catch {
    /* font dự phòng vẫn đọc được, không chặn luồng */
  }
}

function clampCrop(photo: HTMLImageElement, crop: Area): Area {
  const maxW = photo.naturalWidth || photo.width;
  const maxH = photo.naturalHeight || photo.height;
  const x = Math.min(Math.max(0, crop.x), Math.max(0, maxW - 1));
  const y = Math.min(Math.max(0, crop.y), Math.max(0, maxH - 1));
  const width = Math.min(crop.width, maxW - x);
  const height = Math.min(crop.height, maxH - y);
  return { x, y, width: Math.max(1, width), height: Math.max(1, height) };
}

function drawFittedTitle(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  maxWidth: number,
): void {
  let size = 76;
  let tracking = 12;
  while (size >= 36) {
    ctx.font = `700 ${size}px Oswald, sans-serif`;
    const chars = [...text];
    const total =
      chars.reduce((w, c) => w + ctx.measureText(c).width, 0) + tracking * Math.max(0, chars.length - 1);
    if (total <= maxWidth) {
      drawTracked(ctx, text, centerX, y, tracking);
      return;
    }
    size -= 4;
    tracking = Math.max(2, tracking - 1);
  }
  ctx.font = '700 36px Oswald, sans-serif';
  drawTracked(ctx, text, centerX, y, 2);
}

function drawFrame(ctx: CanvasRenderingContext2D, frameTitle: string): void {
  const inner = MARGIN + BORDER;
  const innerSize = SIZE - inner * 2;
  const bottomY = SIZE - inner - BAND_BOTTOM;

  ctx.fillStyle = BAND_FILL;
  ctx.fillRect(inner, inner, innerSize, BAND_TOP);
  ctx.fillRect(inner, bottomY, innerSize, BAND_BOTTOM);

  ctx.strokeStyle = BRASS;
  ctx.lineWidth = BORDER;
  ctx.strokeRect(
    MARGIN + BORDER / 2,
    MARGIN + BORDER / 2,
    SIZE - MARGIN * 2 - BORDER,
    SIZE - MARGIN * 2 - BORDER,
  );

  ctx.strokeStyle = BRASS_DEEP;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(inner, inner + BAND_TOP);
  ctx.lineTo(inner + innerSize, inner + BAND_TOP);
  ctx.moveTo(inner, bottomY);
  ctx.lineTo(inner + innerSize, bottomY);
  ctx.stroke();

  ctx.fillStyle = BRASS_DEEP;
  const cap = 120;
  for (const [x, y] of [
    [0, 0],
    [SIZE - cap, 0],
    [0, SIZE - BORDER],
    [SIZE - cap, SIZE - BORDER],
  ]) {
    ctx.fillRect(x, y, cap, BORDER);
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = BRASS;
  ctx.font = '600 34px Oswald, sans-serif';
  drawTracked(ctx, copy.event, SIZE / 2, inner + BAND_TOP / 2, 10);

  drawFittedTitle(ctx, frameTitle, SIZE / 2, bottomY + BAND_BOTTOM / 2, innerSize - 48);
}

export async function composeAvatar(
  sourceUrl: string,
  crop: Area,
  frameTitle: string,
): Promise<Blob> {
  const photo = await loadImage(sourceUrl).catch(() => {
    throw new Error('Không mở được ảnh vừa chọn.');
  });
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Thiết bị không hỗ trợ xử lý ảnh.');

  ctx.fillStyle = '#0A0718';
  ctx.fillRect(0, 0, SIZE, SIZE);

  const src = clampCrop(photo, crop);
  ctx.drawImage(photo, src.x, src.y, src.width, src.height, 0, 0, SIZE, SIZE);

  const overlay = avatarConfig.frameOverlayUrl
    ? await loadImage(avatarConfig.frameOverlayUrl).catch(() => null)
    : null;

  if (overlay) {
    ctx.drawImage(overlay, 0, 0, SIZE, SIZE);
  } else {
    drawFrame(ctx, frameTitle);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Không lưu được ảnh.'))),
      'image/png',
    );
  });
}

export function blobToFile(blob: Blob, name = 'tan-binh-coc-nhap-ngu.png'): File {
  return new File([blob], name, { type: blob.type || 'image/png' });
}
