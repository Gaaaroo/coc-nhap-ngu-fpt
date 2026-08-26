import type { Area } from 'react-easy-crop';
import { avatarConfig } from '../config/avatar.config';
import { copy } from '../config/copy.config';

const SIZE = avatarConfig.size;
const MARGIN = 36;
const BORDER = 18;
const BAND_TOP = 104;
const BAND_BOTTOM = 190;

const BRASS = '#E2B34A';
const BRASS_DEEP = '#9A6B18';
const INK_MUTED = '#C6BBA6';
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
      document.fonts.load('500 30px "Be Vietnam Pro"'),
    ]);
  } catch {
    /* font dự phòng vẫn đọc được, không chặn luồng */
  }
}

function drawFrame(ctx: CanvasRenderingContext2D): void {
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
  for (const [x, y] of [
    [MARGIN, MARGIN],
    [SIZE - MARGIN - 120, MARGIN],
    [MARGIN, SIZE - MARGIN - BORDER],
    [SIZE - MARGIN - 120, SIZE - MARGIN - BORDER],
  ]) {
    ctx.fillRect(x, y, 120, BORDER);
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = BRASS;
  ctx.font = '600 34px Oswald, sans-serif';
  drawTracked(ctx, copy.event, SIZE / 2, inner + BAND_TOP / 2, 10);

  ctx.font = '700 76px Oswald, sans-serif';
  drawTracked(ctx, copy.unlock.badge, SIZE / 2, bottomY + 76, 16);

  ctx.fillStyle = INK_MUTED;
  ctx.font = '500 30px "Be Vietnam Pro", sans-serif';
  drawTracked(ctx, copy.codeName, SIZE / 2, bottomY + 146, 6);
}

export async function composeAvatar(sourceUrl: string, crop: Area): Promise<Blob> {
  const photo = await loadImage(sourceUrl).catch(() => {
    throw new Error('Không mở được ảnh vừa chọn.');
  });
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Thiết bị không hỗ trợ xử lý ảnh.');

  ctx.drawImage(photo, crop.x, crop.y, crop.width, crop.height, 0, 0, SIZE, SIZE);

  const overlay = avatarConfig.frameOverlayUrl
    ? await loadImage(avatarConfig.frameOverlayUrl).catch(() => null)
    : null;

  if (overlay) {
    ctx.drawImage(overlay, 0, 0, SIZE, SIZE);
  } else {
    drawFrame(ctx);
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
