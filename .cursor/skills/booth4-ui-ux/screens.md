# Screens

One job each. Primary CTA sticky. Header: back (if allowed) + ProgressBelt. Safe areas respected.

Wireframe legend: `=` brass rule, `[ CTA ]` bottom thumb zone.

## 1 Landing — job: start with eyes open

```
CÓC NHẬP NGŨ 2026
MẬT MÃ SỐ 4
BẺ ĐIỂM KHUYẾT – BIẾT ĐIỂM KHỎE
= brass =
[DisclaimerWell]
[ BẮT ĐẦU KIỂM TRA ]
```

Hero is the mission title in Oswald, not a stock soldier photo. Disclaimer visible without opening a modal.

## 2 Intake — job: capture body metrics without a keyboard

Gender OptionCards (2). Four NumberSteppers. BMI DogTag-mini updates live ("Chỉ số hình thể" — never "health score"). CTA "Tiếp tục".

## 3 Fitness — job: log volunteer-counted reps

Short how-to for volunteer (20s, 20kg nữ / 30kg nam). NumberStepper for reps. CTA "Ghi nhận kết quả".

## 4 Quiz — job: one tap, next question

Prompt 18px. 2–4 OptionCards. Auto-advance. ProgressBelt by group. No "Next".

## 5 Calculating — job: one theatrical beat

900ms stamp animation (reduced-motion: 200ms fade). No fake percentage that looks clinical.

## 6 Result — job: show 2 khỏe + 2 khuyết without diagnosing

Radar. Total as "Điểm tân binh" (wording from `copy.config.ts` only). Two + two groups. DisclaimerWell. CTA "Đọc bí kíp".

## 7 Knowledge — job: teach, then unlock

KnowledgeSwipe. CTA on last card "Nhận khung tân binh".

## 8 Unlock — job: reward

One orchestrated motion. Then auto-go to upload or CTA "Tạo avatar".

## 9 Upload — job: pick a photo

Large dashed plate. "Chọn ảnh từ máy". Privacy line: ảnh không rời khỏi điện thoại.

## 10 Crop — job: frame the face

CropViewport. CTA "Dùng ảnh này".

## 11 Preview — job: export

1080 preview. ShareBar. Do not generate blob on tap — blob already ready.

## 12 Done — job: hand the phone back

Thanks in tân-binh voice. Huge "Bắt đầu lượt mới" for volunteers. QR remains unused here.

## Flow chrome

- No URL routes (Tech Spec §7). In-app Back only where the machine allows.
- Auto-reset overlay can appear on any screen except mid-share.
- 390×844 first. If a screen needs two CTAs, stack them; never shrink below 48px.
