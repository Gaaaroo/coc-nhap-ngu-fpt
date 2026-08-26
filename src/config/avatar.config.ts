/**
 * Khung mặc định được vẽ bằng Canvas trong src/lib/canvas.ts.
 * Khi designer giao file PNG 1080×1080 nền trong suốt, đặt vào public/frames/
 * rồi trỏ đường dẫn vào đây. Nạp lỗi thì tự quay về khung vẽ sẵn.
 */
export const avatarConfig = {
  size: 1080,
  frameOverlayUrl: null as string | null,
};
