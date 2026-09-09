/**
 * Ảnh thật của sự kiện. Mặc định để null — giao diện tự dựng hình bằng SVG
 * nên không cần file nào.
 *
 * Khi có tài nguyên từ designer: đặt file vào public/media/ rồi trỏ đường dẫn
 * vào đây, ví dụ heroImageUrl: '/media/keyvisual.jpg'. Nhớ thêm đuôi file vào
 * globPatterns trong vite.config.ts nếu muốn PWA cache sẵn.
 */
export const mediaConfig = {
  /** Poster key visual, hiện ở đầu màn hình chào. */
  heroImageUrl: null as string | null,
};
