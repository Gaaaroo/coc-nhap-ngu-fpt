# Booth 4 — Mật mã số 4

Web app kiosk cho sự kiện Cóc Nhập Ngũ 2026. React + Vite + TypeScript. Không backend, không tài khoản, không lưu dữ liệu người dùng.

## Chạy local

```bash
npm install
npm test
npm run dev
```

Mở http://localhost:5173 trên điện thoại (cùng wifi) hoặc DevTools mobile viewport 390×844.

## Build

```bash
npm run build
npm run preview
```

## Chỉnh nội dung (không đụng logic)

| File | Việc |
| --- | --- |
| `src/config/questions.config.ts` | Câu hỏi FSD |
| `src/config/scoring.config.ts` | Ngưỡng BMI / thể lực / trọng số |
| `src/config/knowledge.config.ts` | Thẻ kiến thức |
| `src/config/copy.config.ts` | Disclaimer, nhãn |

Khung avatar được vẽ bằng Canvas trong `src/lib/canvas.ts`, không phụ thuộc file ảnh. Khi có bản thiết kế PNG 1080×1080 nền trong suốt, bỏ vào `public/frames/` rồi trỏ đường dẫn ở `src/config/avatar.config.ts`.

Analytics ẩn danh (tuỳ chọn): set `VITE_ANALYTICS_URL` trong `.env`. Payload chỉ có tên bước, không có chỉ số hay ảnh.

## Tài liệu

- `BRD-Booth4-Mat-Ma-So-4.md`
- `TECH-SPEC-Booth4-Mat-Ma-So-4.md`
- `.cursor/skills/booth4-ui-ux/`
