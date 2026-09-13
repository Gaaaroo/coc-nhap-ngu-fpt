import type { Area } from 'react-easy-crop';
import { avatarConfig } from '../config/avatar.config';
import { copy } from '../config/copy.config';

const SIZE = avatarConfig.size;
const MARGIN = 0;
const BORDER = 18;
const BAND_TOP = 88;
const BAND_BOTTOM = 132;

// Tím lấy từ key visual. MAT_FILL theo nền chàm #0A0718 của app.
const FRAME = '#C07BF5';
const FRAME_DEEP = '#7326B8';
const MAT_FILL = '#0A0718';

/**
 * Ảnh và khung KV nằm gọn trong một ô vuông giữa hai dải chữ, nên cạnh ô bị
 * chiều cao khống chế chứ không phải chiều ngang — phần thừa hai bên thành
 * mép mat tối bao quanh.
 */
const CONTENT_SIDE = SIZE - (MARGIN + BORDER) * 2 - BAND_TOP - BAND_BOTTOM;
const CONTENT_X = (SIZE - CONTENT_SIDE) / 2;
const CONTENT_Y = MARGIN + BORDER + BAND_TOP;

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

/** Viền, hai đường kẻ ngăn dải, bốn góc và hai dòng chữ. Nền mat đã vẽ sẵn. */
function drawFrame(ctx: CanvasRenderingContext2D, frameTitle: string): void {
  const inner = MARGIN + BORDER;
  const innerSize = SIZE - inner * 2;
  const bottomY = SIZE - inner - BAND_BOTTOM;

  ctx.strokeStyle = FRAME;
  ctx.lineWidth = BORDER;
  ctx.strokeRect(
    MARGIN + BORDER / 2,
    MARGIN + BORDER / 2,
    SIZE - MARGIN * 2 - BORDER,
    SIZE - MARGIN * 2 - BORDER,
  );

  ctx.strokeStyle = FRAME_DEEP;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(inner, inner + BAND_TOP);
  ctx.lineTo(inner + innerSize, inner + BAND_TOP);
  ctx.moveTo(inner, bottomY);
  ctx.lineTo(inner + innerSize, bottomY);
  ctx.stroke();

  ctx.fillStyle = FRAME_DEEP;
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

  ctx.fillStyle = FRAME;
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

  ctx.fillStyle = MAT_FILL;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const src = clampCrop(photo, crop);
  ctx.drawImage(
    photo,
    src.x,
    src.y,
    src.width,
    src.height,
    CONTENT_X,
    CONTENT_Y,
    CONTENT_SIDE,
    CONTENT_SIDE,
  );

  const overlay = avatarConfig.frameOverlayUrl
    ? await loadImage(avatarConfig.frameOverlayUrl).catch(() => null)
    : null;

  // Khung KV lồng đúng vào ô ảnh; khung tím thì luôn bao bên ngoài, kể cả khi
  // PNG hỏng không tải được.
  if (overlay) {
    ctx.drawImage(overlay, CONTENT_X, CONTENT_Y, CONTENT_SIDE, CONTENT_SIDE);
  }
  drawFrame(ctx, frameTitle);

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
