# TECHNICAL ARCHITECTURE DOCUMENT (TAD)

## Web App Booth 4 — "MẬT MÃ SỐ 4: BẺ ĐIỂM KHUYẾT – BIẾT ĐIỂM KHỎE"

*Sự kiện: CÓC NHẬP NGŨ 2026*

### Thông tin tài liệu

| | |
| --- | --- |
| Phiên bản | 0.1 |
| Trạng thái | Dự thảo kỹ thuật — chờ FSD để chốt phần logic chấm điểm |
| Tài liệu nguồn | BRD-Booth4-Mat-Ma-So-4.md (v1.0) |
| Tài liệu còn thiếu | Functional Specification for Developer — Booth 4 |
| Đối tượng đọc | Developer, Technical Lead, Product Manager |

> **Quy ước:** những mục gắn nhãn **[CHỜ FSD]** là phần chưa thể chốt vì phụ thuộc bộ câu hỏi nguyên văn, trọng số và benchmark nằm trong FSD. Kiến trúc bên dưới được thiết kế để các giá trị đó nạp từ file config, nên khi FSD về chỉ cần điền dữ liệu, không phải sửa logic.

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này chuyển các yêu cầu nghiệp vụ trong BRD thành quyết định kỹ thuật cụ thể: công nghệ, cấu trúc mã nguồn, mô hình dữ liệu, ranh giới module, chiến lược kiểm thử và tiêu chí nghiệm thu kỹ thuật. Tài liệu không lặp lại nội dung nghiệp vụ đã có trong BRD.

Phạm vi: toàn bộ Web App Booth 4. Không bao gồm Card Battle Trạm 2 (xem Mục 13).

---

## 2. RÀNG BUỘC KIẾN TRÚC DẪN XUẤT TỪ BRD

Bảy ràng buộc dưới đây là nguồn gốc của mọi quyết định kỹ thuật trong tài liệu:

| # | Ràng buộc | Nguồn BRD | Hệ quả kiến trúc |
| --- | --- | --- | --- |
| C1 | Không lưu dữ liệu người dùng lâu dài | 4.2, 7 | Không backend, không database, không object storage |
| C2 | Không tài khoản, không đăng nhập | BR-12 | Không auth layer, không session server |
| C3 | Xử lý phần lớn logic ở client | 7 | Toàn bộ chấm điểm và xử lý ảnh chạy trong trình duyệt |
| C4 | Mạng yếu tại booth | Rủi ro #3 | Static asset + PWA precache, không gọi API trong flow chính |
| C5 | Tách biệt tuyệt đối Card Battle | BR-10 | Repo riêng, origin riêng, không thư viện dùng chung |
| C6 | Hoàn thành trong 3–5 phút | 7, 9 | Tối thiểu thao tác gõ phím, auto-advance, bundle nhẹ |
| C7 | Benchmark chưa được duyệt | 9 | Toàn bộ ngưỡng điểm phải là dữ liệu cấu hình, không hard-code |

**Kết luận kiến trúc:** ứng dụng là một **Single Page Application tĩnh, chạy hoàn toàn phía client, không có backend**. Đây không phải lựa chọn tối giản cho tiện — nó là cách duy nhất thỏa mãn đồng thời C1, C2 và ràng buộc ngân sách trong BRD Mục 9.

---

## 3. QUYẾT ĐỊNH CÔNG NGHỆ

### 3.1 Stack chính

| Lớp | Công nghệ | Lý do chọn |
| --- | --- | --- |
| Ngôn ngữ | TypeScript (strict mode) | Logic chấm điểm nhiều nhánh, cần type an toàn và test được |
| UI framework | React 18 | Hệ sinh thái crop ảnh trên mobile tốt nhất, đội ngũ dễ tuyển |
| Build tool | Vite | Output tĩnh thuần, dev server nhanh, cấu hình PWA sẵn |
| Styling | Tailwind CSS | Mobile-first mặc định, dựng design token quân đội nhanh |
| State | Zustand | Một store phẳng cho phiên chơi, ít boilerplate hơn Redux |
| Animation | Framer Motion | Chuyển màn và hiệu ứng "mở khóa" phần thưởng |
| Crop ảnh | react-easy-crop | Hỗ trợ pinch-zoom và kéo thả trên touch, trả về vùng crop theo pixel |
| Kiểm thử đơn vị | Vitest | Cùng hệ Vite, chạy nhanh, dùng cho module chấm điểm |
| Kiểm thử E2E | Playwright | Giả lập viewport mobile, kiểm tra flow đầu-cuối |
| PWA | vite-plugin-pwa (Workbox) | Precache asset, đáp ứng C4 |
| Hosting | Cloudflare Pages hoặc Vercel (static) | CDN, HTTPS sẵn, chi phí bằng 0 |

Không pin version cứng trong tài liệu này; version được chốt tại thời điểm `install` và khóa bằng lockfile.

### 3.2 Các phương án đã cân nhắc và loại bỏ

**Next.js** — loại. Không có nhu cầu SSR, SEO hay API route. Next kéo theo một tầng server (hoặc cấu hình static export phức tạp) mà app 12 màn hình không cần, đồng thời làm tăng bề mặt vi phạm C1 vì lập trình viên dễ vô tình thêm route server lưu dữ liệu.

**Vue / Svelte** — không loại vì kỹ thuật, hoàn toàn khả thi và bundle còn nhẹ hơn. Chọn React chỉ vì `react-easy-crop` là thư viện crop mobile trưởng thành nhất, phần rủi ro cao nhất của dự án (BR-08).

**Backend nhẹ (Firebase / Supabase)** — loại. Vi phạm trực tiếp mục 4.2 của BRD và tạo rủi ro compliance không cần thiết.

**Native app** — loại. Người chơi tại booth không cài app cho một trải nghiệm 4 phút; QR code mở web là ma sát thấp nhất.

---

## 4. CẤU TRÚC MÃ NGUỒN

```
booth4-mat-ma-so-4/
├── public/
│   ├── frames/                  # khung Avatar PNG 1080×1080 nền trong suốt
│   ├── icons/                   # icon PWA
│   └── manifest.webmanifest
├── src/
│   ├── app/                     # bootstrap, provider, máy trạng thái flow
│   ├── config/                  # ★ VÙNG BTC/PM CHỈNH SỬA
│   │   ├── scoring.config.ts    # trọng số, ngưỡng BMI, mốc thể lực
│   │   ├── questions.config.ts  # bộ câu hỏi 5 nhóm
│   │   ├── knowledge.config.ts  # nội dung giáo dục
│   │   └── copy.config.ts       # disclaimer, nhãn, văn phong tân binh
│   ├── domain/                  # ★ LOGIC THUẦN, KHÔNG IMPORT REACT
│   │   ├── types.ts
│   │   ├── bmi.ts
│   │   ├── fitness.ts
│   │   ├── quiz.ts
│   │   ├── score.ts             # tổng hợp, xác định Điểm Khỏe / Điểm Khuyết
│   │   └── __tests__/
│   ├── features/
│   │   ├── landing/
│   │   ├── intake/              # tuổi, giới tính, chiều cao, cân nặng, BMI
│   │   ├── fitness/             # nhập số lần gập thanh lò xo
│   │   ├── quiz/
│   │   ├── result/              # radar chart, Điểm Khỏe / Điểm Khuyết
│   │   ├── knowledge/           # thẻ kiến thức vuốt
│   │   └── avatar/              # upload, crop, ghép khung, xuất file
│   ├── components/ui/           # Button, NumberStepper, OptionCard, ProgressBar…
│   ├── store/
│   │   └── session.store.ts     # Zustand + sessionStorage
│   ├── lib/
│   │   ├── image.ts             # decode, EXIF orientation, HEIC
│   │   ├── canvas.ts            # pipeline ghép Avatar
│   │   ├── share.ts             # Web Share API + fallback download
│   │   ├── analytics.ts         # đếm bước ẩn danh
│   │   └── idle.ts              # auto-reset kiosk
│   └── styles/
├── tests/e2e/
└── vite.config.ts
```

Nguyên tắc quan trọng nhất của cấu trúc này: **`src/domain/` không được import React, không đọc DOM, không đọc store**. Toàn bộ là hàm thuần nhận input trả output. Nhờ vậy công thức chấm điểm test được bằng bảng dữ liệu, và khi BTC đổi benchmark thì chỉ cần đổi `src/config/` rồi chạy lại test.

---

## 5. MÔ HÌNH DỮ LIỆU

### 5.1 Kiểu cơ sở

```ts
// src/domain/types.ts

export type Gender = 'male' | 'female';

export type LifestyleGroup =
  | 'sleep'        // Giấc ngủ
  | 'nutrition'    // Dinh dưỡng
  | 'hydration'    // Uống nước
  | 'activity'     // Vận động
  | 'mental';      // Tinh thần

export interface BodyMetrics {
  age: number;         // 15–60, chặn ở tầng input
  gender: Gender;
  heightCm: number;    // 120–220
  weightKg: number;    // 30–200
}

export interface FitnessResult {
  reps: number;        // số lần gập thanh lò xo trong 20 giây
}

/** Đáp án: questionId -> optionId */
export type QuizAnswers = Record<string, string>;
```

### 5.2 Cấu hình chấm điểm

```ts
// src/config/scoring.config.ts  — [CHỜ FSD] điền số thực tế

export interface BandRule<T extends string> {
  band: T;
  min: number;          // bao gồm
  max: number;          // không bao gồm
  score: number;
  label: string;        // nhãn hiển thị theo văn phong tân binh
}

export interface ScoringConfig {
  bmiBands: BandRule<BmiBand>[];
  fitnessBands: Record<Gender, BandRule<FitnessBand>[]>;
  groupWeights: Record<LifestyleGroup, number>;  // tổng = 1
  componentWeights: {
    bmi: number;
    fitness: number;
    lifestyle: number;                            // tổng 3 phần = 1
  };
}
```

Ràng buộc "tổng trọng số bằng 1" được kiểm tra bằng unit test chạy trong CI, để một lần sửa config sai không âm thầm làm lệch toàn bộ điểm số.

### 5.3 Kết quả chấm điểm

```ts
export interface GroupScore {
  group: LifestyleGroup;
  raw: number;
  max: number;
  normalized: number;   // 0–100, dùng cho radar chart
}

export interface ScoreResult {
  bmi:      { value: number; band: BmiBand; score: number };
  fitness:  { reps: number; band: FitnessBand; score: number };
  groups:   Record<LifestyleGroup, GroupScore>;
  total:    number;                        // 0–100
  strengths:  [LifestyleGroup, LifestyleGroup];  // Điểm Khỏe  (BR-05)
  weaknesses: [LifestyleGroup, LifestyleGroup];  // Điểm Khuyết (BR-05)
}
```

**Quy tắc phá hòa (tie-break):** khi hai nhóm bằng điểm, xếp hạng theo thứ tự ưu tiên cố định `sleep → nutrition → hydration → activity → mental`. Quy tắc này phải xác định (deterministic) để cùng một bộ đáp án luôn cho ra cùng kết quả, phục vụ kiểm thử và tránh khiếu nại tại booth. **[CHỜ FSD]** xác nhận thứ tự ưu tiên mong muốn.

**Ràng buộc bắt buộc:** một nhóm không được xuất hiện đồng thời ở `strengths` và `weaknesses`. Với 5 nhóm và mỗi bên lấy 2, điều này luôn thỏa mãn, nhưng vẫn cần một assertion trong `score.ts` để phòng thay đổi số nhóm về sau.

### 5.4 Trạng thái phiên chơi

```ts
// src/store/session.store.ts

export interface SessionState {
  step: FlowStep;
  metrics: Partial<BodyMetrics>;
  fitness: Partial<FitnessResult>;
  answers: QuizAnswers;
  result: ScoreResult | null;
  knowledgeCompleted: boolean;   // cổng mở khóa Avatar (BR-07)
  avatarBlobUrl: string | null;  // chỉ tồn tại trong bộ nhớ
  startedAt: number;
}
```

Store persist vào **`sessionStorage`**, không phải `localStorage`. Đóng tab là dữ liệu biến mất, đúng yêu cầu riêng tư ở BRD Mục 7. `avatarBlobUrl` **không** được persist: object URL không sống qua reload và ảnh cá nhân không được ghi xuống đĩa.

---

## 6. MODULE CHẤM ĐIỂM

Bốn hàm thuần, mỗi hàm một trách nhiệm:

```ts
calcBmi(metrics: BodyMetrics): { value: number; band: BmiBand; score: number }
calcFitness(reps: number, gender: Gender, cfg): { band: FitnessBand; score: number }
calcGroupScores(answers: QuizAnswers, questions, cfg): Record<LifestyleGroup, GroupScore>
composeResult(bmi, fitness, groups, cfg): ScoreResult
```

BMI tính theo `weightKg / (heightCm/100)²`, làm tròn 1 chữ số thập phân khi hiển thị nhưng giữ nguyên độ chính xác khi so ngưỡng, tránh trường hợp 24.95 hiển thị 25.0 nhưng lại rơi vào band dưới.

Ngưỡng BMI, mốc quy đổi số lần gập theo giới tính, và trọng số từng nhóm: **[CHỜ FSD Mục 6–7]**.

**Yêu cầu bắt buộc về ngôn từ:** mọi nhãn sinh ra từ module này phải lấy từ `copy.config.ts` và không bao giờ chứa chuỗi "Fertility Score" hay "Reproductive Health Score" (BR-11). Bổ sung một test tự động quét toàn bộ file config và mã nguồn để chặn hai chuỗi này — xem Mục 15.

---

## 7. MÁY TRẠNG THÁI FLOW

```ts
type FlowStep =
  | 'landing' | 'intake' | 'fitness'
  | 'quiz'    | 'calculating' | 'result'
  | 'knowledge' | 'avatarUnlock' | 'avatarUpload'
  | 'avatarCrop' | 'avatarPreview' | 'done';
```

Điều hướng bằng state trong store, **không dùng URL routing**. Lý do: tại booth, nút Back của trình duyệt sẽ phá vỡ tính toàn vẹn của flow và tạo trạng thái nửa vời (ví dụ quay lại quiz sau khi đã chấm điểm). Một hàm `goNext()` / `goBack()` có kiểm soát cho phép chặn các bước lùi không hợp lệ.

Hai cổng chặn bắt buộc:

- `avatarUnlock` chỉ mở khi `knowledgeCompleted === true` (BR-07).
- `result` chỉ vào được khi `result !== null`.

Màn `calculating` là màn giả lập chấm điểm khoảng 1.5–2 giây. Về kỹ thuật việc tính toán là tức thời; màn này tồn tại vì lý do trải nghiệm (tạo cảm giác hồi hộp) và cần được tính vào ngân sách thời gian 3–5 phút.

---

## 8. MODULE AVATAR

Đây là phần rủi ro kỹ thuật cao nhất. Pipeline gồm bốn bước:

**Bước 1 — Nhận ảnh.** `<input type="file" accept="image/*">`. Không dùng `capture` để người chơi có thể chọn ảnh có sẵn.

**Bước 2 — Chuẩn hóa.** Đây là nơi phát sinh phần lớn lỗi thực tế:

- *EXIF orientation*: ảnh chụp dọc từ điện thoại thường bị xoay khi vẽ lên canvas. Xử lý bằng `createImageBitmap(file, { imageOrientation: 'from-image' })`.
- *HEIC*: iPhone có thể trả về file HEIC khi người dùng chọn từ ứng dụng Files. Safari giải mã được, các trình duyệt khác thì không. Phải phát hiện lỗi decode và hiển thị thông báo hướng dẫn chọn ảnh khác, thay vì để màn hình trắng.
- *Ảnh quá lớn*: ảnh 48MP làm treo thiết bị yếu. Downscale cạnh dài về tối đa 2048px trước khi đưa vào crop.

**Bước 3 — Crop.** `react-easy-crop` với `aspect = 1`, `cropShape` theo thiết kế khung. Component trả về `croppedAreaPixels`, đây là dữ liệu đầu vào cho bước ghép.

**Bước 4 — Ghép và xuất.**

```
canvas 1080×1080
  ├── vẽ vùng ảnh đã crop (drawImage với sx, sy, sw, sh từ croppedAreaPixels)
  ├── vẽ khung PNG trong suốt đè lên
  └── toBlob('image/png')
```

Kích thước 1080×1080 nằm an toàn dưới giới hạn diện tích canvas của iOS Safari và là chuẩn tốt cho ảnh mạng xã hội.

**Tải về và chia sẻ (BR-09).** Ưu tiên Web Share API cấp 2:

```ts
if (navigator.canShare?.({ files: [file] })) {
  await navigator.share({ files: [file], title, text });
} else {
  // fallback: <a download> + objectURL, revoke sau khi click
}
```

Cần lưu ý `navigator.share` bắt buộc phải được gọi trực tiếp trong user gesture; nếu `await` việc tạo blob trước khi gọi `share`, Safari sẽ từ chối. Vì vậy blob phải được tạo sẵn ở màn preview, không tạo tại thời điểm bấm nút.

Mọi object URL phải `URL.revokeObjectURL()` khi rời màn hoặc khi reset phiên.

---

## 9. DESIGN SYSTEM VÀ GIAO DIỆN

### 9.1 Token

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `army-900` | `#1F2937` | Nền tối, chữ tiêu đề trên nền sáng |
| `army-700` | olive đậm | Nền khối, thẻ |
| `amber-600` | `#B45309` | Màu nhấn, CTA, đường kẻ tiêu đề |
| `khaki-100` | kaki nhạt | Nền phụ, viền thẻ |
| `success` / `warning` | xanh quân / cam | Điểm Khỏe / Điểm Khuyết |

Hai màu `#1F2937` và `#B45309` lấy trực tiếp từ style của file BRD gốc để giữ nhất quán nhận diện với tài liệu sự kiện.

### 9.2 Font

Tiêu đề dùng **Oswald** hoặc **Barlow Condensed**; nội dung dùng **Be Vietnam Pro**. Cả ba đều có bộ ký tự tiếng Việt đầy đủ.

Đây là ràng buộc cứng, không phải sở thích thẩm mỹ: phần lớn font stencil quân đội phổ biến (Black Ops One, Stencil, Bungee) **không có dấu tiếng Việt**, sẽ làm vỡ chữ ở đúng những từ quan trọng nhất như "MẬT MÃ", "ĐIỂM KHUYẾT". Nếu designer muốn dùng font stencil cho tiêu đề, phải kiểm tra bảng ký tự trước và chuẩn bị phương án tạo chữ dạng ảnh cho các tiêu đề cố định.

Font phải được self-host và precache trong PWA, không tải từ Google Fonts CDN lúc chạy (C4).

### 9.3 Nguyên tắc tương tác

Nguyên tắc chi phối toàn bộ thiết kế màn hình là **không dùng bàn phím**. Bàn phím ảo trên mobile chiếm nửa màn hình, gây lỗi nhập liệu và là nguyên nhân số một làm vỡ mốc 3–5 phút.

- Tuổi, chiều cao, cân nặng, số lần gập: dùng `NumberStepper` hoặc bánh xe chọn số, có giá trị mặc định hợp lý.
- Câu hỏi trắc nghiệm: chạm chọn là tự chuyển câu sau ~250ms, không có nút "Tiếp".
- Nút hành động chính cố định ở đáy màn hình, trong tầm ngón cái.
- Vùng chạm tối thiểu 44×44px.
- Tương phản tối thiểu 4.5:1 và tránh font mảnh, vì màn hình sẽ được đọc dưới ánh sáng mạnh ngoài trời.

### 9.4 Danh sách màn hình

| # | Màn hình | Nội dung chính | Yêu cầu liên quan |
| --- | --- | --- | --- |
| 1 | Landing | Tiêu đề sự kiện, nút Bắt đầu, **disclaimer** | Rủi ro #2 |
| 2 | Nhập chỉ số | Tuổi, giới tính, chiều cao, cân nặng; BMI hiện tức thì | BR-01 |
| 3 | Test thể lực | Nhập số lần gập, có hướng dẫn cho tình nguyện viên | BR-02 |
| 4 | Trắc nghiệm | Một câu mỗi màn, thanh tiến trình 5 nhóm | BR-03 |
| 5 | Đang chấm | Animation 1.5–2s | — |
| 6 | Kết quả | Radar 5 cạnh, tổng điểm, 2 Điểm Khỏe + 2 Điểm Khuyết, **disclaimer** | BR-04, BR-05 |
| 7 | Kiến thức | Thẻ vuốt theo nhóm, đọc hết mới mở khóa | BR-06 |
| 8 | Mở khóa Avatar | Hiệu ứng phần thưởng | BR-07 |
| 9 | Tải ảnh | Chọn ảnh từ máy | BR-08 |
| 10 | Crop | Kéo, pinch-zoom | BR-08 |
| 11 | Xem trước | Avatar hoàn chỉnh, nút Tải về / Chia sẻ | BR-09 |
| 12 | Hoàn thành | Lời cảm ơn, nút Bắt đầu lượt mới | Vận hành |

Radar chart nên tự vẽ bằng SVG (một đa giác 5 đỉnh với 5 giá trị 0–100) thay vì kéo thư viện chart. Cách này nhẹ hơn vài chục KB và cho phép áp theme quân đội hoàn toàn.

---

## 10. PWA VÀ KHẢ NĂNG CHỊU MẠNG YẾU

Cấu hình `vite-plugin-pwa` ở chế độ precache toàn bộ: JS, CSS, font, khung Avatar PNG, icon. Sau lần tải đầu tiên, app chạy được kể cả khi wifi booth quá tải.

Chiến lược cập nhật: `autoUpdate`, nhưng **khóa cập nhật trong ngày sự kiện**. Một service worker cập nhật giữa chừng có thể reload app khi người chơi đang ở giữa flow. Trước go-live, chốt build cuối và không deploy lại trừ khi có sự cố.

Ngân sách hiệu năng: bundle JS ban đầu **dưới 200KB gzip**, thời gian tương tác được (TTI) dưới 3 giây trên mạng 3G giả lập với thiết bị Android tầm trung. Màn crop ảnh nên `lazy import` vì chỉ dùng ở nửa sau của flow.

---

## 11. ĐO LƯỜNG ẨN DANH

BRD yêu cầu tỷ lệ hoàn thành tối thiểu 90% (Mục 11) nhưng cấm lưu dữ liệu người dùng (Mục 4.2). Hai điều này dung hòa được vì số liệu tổng hợp không phải dữ liệu cá nhân.

Triển khai: một endpoint đếm sự kiện (Plausible, Umami hoặc một Cloudflare Worker đơn giản), chỉ nhận tên bước:

```
step_landing, step_intake, step_fitness, step_quiz_done,
step_result, step_knowledge_done, step_avatar_exported, step_done
```

**Tuyệt đối không gửi:** tuổi, giới tính, chiều cao, cân nặng, số lần gập, đáp án, điểm số, ảnh, hay bất kỳ định danh thiết bị nào. Không cookie, không fingerprint.

Lời gọi analytics phải là `fire-and-forget` (dùng `navigator.sendBeacon` hoặc `fetch` với `keepalive`), không bao giờ chặn luồng UI kể cả khi endpoint chết.

---

## 12. BẢO MẬT VÀ RIÊNG TƯ

| Yêu cầu | Biện pháp kỹ thuật |
| --- | --- |
| Ảnh không rời khỏi thiết bị | Không có upload endpoint trong mã nguồn; toàn bộ xử lý bằng Canvas cục bộ |
| Không lưu sau phiên | `sessionStorage`, tự xóa khi đóng tab; `revokeObjectURL` khi rời màn |
| Không lộ qua cache | Service worker chỉ precache asset tĩnh, không cache dữ liệu phiên |
| Không rò rỉ qua bên thứ ba | CSP chặn `connect-src` chỉ tới domain analytics; không nhúng script quảng cáo, không pixel mạng xã hội |
| Thiết bị dùng chung tại booth | Auto-reset sau 90 giây không thao tác, xóa sạch store và blob |

Đề xuất CSP tối thiểu (đặt qua header của hosting):

```
default-src 'self';
img-src 'self' blob: data:;
connect-src 'self' https://<analytics-domain>;
frame-ancestors 'none';
```

`frame-ancestors 'none'` cũng góp phần vào Mục 13: app không thể bị nhúng iframe vào hệ thống khác.

---

## 13. TÁCH BIỆT VỚI CARD BATTLE TRẠM 2

BR-10 là yêu cầu compliance bắt buộc, nên được bảo đảm bằng hạ tầng chứ không bằng quy ước code:

1. **Repository riêng.** Không monorepo chung với Card Battle, không package dùng chung.
2. **Origin riêng.** Deploy trên subdomain riêng, ví dụ `booth4.<domain-sukien>`. Vì `sessionStorage`, `localStorage`, IndexedDB và cookie đều bị cô lập theo origin, hai app khác origin về mặt kỹ thuật **không thể** đọc dữ liệu của nhau. Đây là lập luận dễ chứng minh nhất khi review go-live.
3. **Không liên kết chéo.** Không đặt link, redirect hay deep link sang Card Battle ở bất kỳ màn hình nào.
4. **CSP `connect-src` allowlist.** Bất kỳ request nào ra ngoài domain analytics đều bị trình duyệt chặn.

**Checklist review trước go-live** (bắt buộc có chữ ký kỹ thuật):

- [ ] `grep` toàn bộ mã nguồn: không có domain/tên/định danh nào của Card Battle
- [ ] Không có `localStorage` trong mã nguồn (chỉ `sessionStorage`)
- [ ] Danh sách toàn bộ network request khi chạy flow đầy đủ, xác nhận chỉ có asset cùng origin và analytics
- [ ] `package.json` không có dependency dùng chung với Card Battle
- [ ] Header CSP đã có hiệu lực trên môi trường production

---

## 14. VẬN HÀNH TẠI BOOTH

Thiết bị có thể là máy chung của BTC, nên app cần hai cơ chế:

- **Auto-reset**: sau 90 giây không thao tác, hiện đếm ngược 10 giây rồi xóa phiên và về Landing.
- **Nút "Bắt đầu lượt mới"** cỡ lớn ở màn Hoàn thành, cho tình nguyện viên chuyển lượt nhanh.

Điểm truy cập là QR code in tại booth trỏ tới URL production. Nên chuẩn bị sẵn một QR dự phòng trỏ tới URL thay thế (ví dụ bản deploy trên nhà cung cấp thứ hai) để xử lý sự cố hosting mà không phải in lại.

---

## 15. CHIẾN LƯỢC KIỂM THỬ

**Unit test (Vitest)** — bắt buộc phủ hết `src/domain/`:

- Bảng dữ liệu cho `calcBmi` ở từng ngưỡng và ngay tại biên (ví dụ đúng 18.5, đúng 25.0).
- `calcFitness` cho cả hai giới tính, gồm giá trị 0 và giá trị vượt trần.
- `composeResult` với các trường hợp hòa điểm, kiểm tra quy tắc tie-break.
- Assertion `strengths` và `weaknesses` không giao nhau.
- Test tính toàn vẹn config: tổng trọng số bằng 1, mọi câu hỏi đều thuộc một trong 5 nhóm, mọi option đều có điểm.

**Test compliance tự động** — quét mã nguồn và config, fail build nếu tìm thấy chuỗi `Fertility Score` hoặc `Reproductive Health Score` ở bất kỳ dạng viết hoa/thường nào (BR-11).

**E2E (Playwright)** — chạy full flow ở viewport 390×844, đo tổng thời gian thao tác tự động làm mốc tham chiếu cho ngân sách 3–5 phút.

**Kiểm thử thiết bị thật** — không thể thay thế bằng giả lập, vì rủi ro tập trung ở phần ảnh:

| Thiết bị | Điểm cần kiểm |
| --- | --- |
| iPhone Safari (iOS 16+) | Web Share API với file, HEIC, EXIF orientation, giới hạn canvas |
| Android Chrome tầm trung | Hiệu năng crop, thời gian xuất ảnh |
| Android máy yếu / RAM thấp | Ảnh độ phân giải cao có làm tab crash không |
| Zalo / Facebook in-app browser | **Rủi ro cao**: người chơi quét QR trong Zalo, trình duyệt nhúng thường thiếu Web Share API và hạn chế download |

Trường hợp trình duyệt in-app cần được xác nhận sớm; nếu không hỗ trợ tải ảnh, phải có hướng dẫn "Mở bằng trình duyệt" ngay trên màn preview.

---

## 16. TRUY VẾT YÊU CẦU

| Mã BRD | Module chịu trách nhiệm | Kiểm chứng bằng |
| --- | --- | --- |
| BR-01 | `features/intake`, `domain/bmi.ts` | Unit test biên BMI |
| BR-02 | `features/fitness`, `domain/fitness.ts` | Unit test theo giới tính |
| BR-03 | `config/questions.config.ts`, `features/quiz` | Test toàn vẹn config |
| BR-04 | `domain/score.ts` | Unit test trọng số |
| BR-05 | `domain/score.ts` | Test tie-break và tính rời nhau |
| BR-06 | `config/knowledge.config.ts` | Duyệt nội dung thủ công |
| BR-07 | Máy trạng thái flow, cổng `knowledgeCompleted` | E2E: không bỏ qua được bước kiến thức |
| BR-08 | `features/avatar`, `lib/image.ts` | Kiểm thử thiết bị thật |
| BR-09 | `lib/share.ts`, `lib/canvas.ts` | Kiểm thử thiết bị thật |
| BR-10 | Hạ tầng: origin riêng, CSP | Checklist Mục 13 |
| BR-11 | Test compliance tự động | CI |
| BR-12 | Không có tầng auth | Review kiến trúc |

---

## 17. TIÊU CHÍ NGHIỆM THU KỸ THUẬT

- Toàn bộ unit test và test compliance pass trên CI.
- Bundle JS ban đầu dưới 200KB gzip; Lighthouse Performance ≥ 90 ở chế độ mobile.
- Flow E2E chạy trọn vẹn không lỗi console trên Chrome và Safari mobile.
- Xuất và chia sẻ Avatar thành công trên tối thiểu bốn thiết bị thật thuộc bốn nhóm ở Mục 15.
- Chạy được toàn bộ flow ở chế độ offline sau lần tải đầu (trừ analytics).
- Hoàn tất checklist tách biệt Card Battle ở Mục 13, có chữ ký kỹ thuật.
- Không có `localStorage`, không có endpoint upload trong mã nguồn production.

---

## 18. VẤN ĐỀ CÒN MỞ

| # | Vấn đề | Cần ai giải quyết |
| --- | --- | --- |
| O1 | **[CHỜ FSD]** Bộ câu hỏi nguyên văn, số câu mỗi nhóm, điểm từng đáp án | PM / FSD |
| O2 | **[CHỜ FSD]** Trọng số 5 nhóm và tỷ lệ giữa BMI / thể lực / lối sống | PM / FSD |
| O3 | **[CHỜ FSD]** Ngưỡng BMI và mốc quy đổi số lần gập theo giới tính | BTC + cố vấn y tế |
| O4 | Thứ tự ưu tiên tie-break khi hai nhóm bằng điểm | PM |
| O5 | File khung Avatar PNG 1080×1080 nền trong suốt; có mấy biến thể khung? | Designer |
| O6 | Nội dung 5 thẻ kiến thức, đã qua kiểm duyệt câu chữ theo BR-06/BR-11 | BTC + cố vấn |
| O7 | Văn bản disclaimer chính thức cho màn Landing và màn Kết quả | BTC / pháp lý |
| O8 | Chọn nhà cung cấp analytics và domain endpoint | PM / kỹ thuật |
| O9 | Subdomain production và ai quản lý DNS | BTC / kỹ thuật |
| O10 | Có bắt buộc hỗ trợ trình duyệt in-app của Zalo không? | PM |

Trong đó **O1, O2, O3, O5** chặn đường tới go-live: thiếu chúng thì chỉ dựng được khung ứng dụng và giao diện, không chốt được logic chấm điểm hay sản phẩm đầu ra.
