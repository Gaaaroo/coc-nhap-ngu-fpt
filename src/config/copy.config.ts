import type { LifestyleGroup } from '../domain/types';

export const copy = {
  event: 'CÓC NHẬP NGŨ 2026',
  codeName: 'MẬT MÃ SỐ 4',
  tagline: 'BẺ ĐIỂM KHUYẾT – BIẾT ĐIỂM KHỎE',
  recruitScore: 'Điểm tân binh',
  bodyIndex: 'Chỉ số hình thể',
  healthy: 'Điểm Khỏe',
  defect: 'Điểm Khuyết',
  experienceLabel: 'Benchmark trải nghiệm',
  disclaimer: {
    title: 'Đây không phải công cụ y tế',
    body: 'Kết quả chỉ mang tính trải nghiệm tại sự kiện. App không chẩn đoán, không đánh giá và không kết luận về sức khỏe sinh sản của bạn. Mọi chỉ số BMI và bài test thể lực là benchmark vận hành, chưa phải chuẩn y khoa.',
  },
  privacyPhoto: 'Ảnh không rời khỏi điện thoại này.',
  inAppBrowser:
    'Trình duyệt trong Zalo/Facebook thường chặn chia sẻ file. Mở bằng Safari hoặc Chrome để tải avatar.',
  groups: {
    sleep: 'Giấc ngủ',
    nutrition: 'Dinh dưỡng',
    hydration: 'Uống nước',
    activity: 'Vận động',
    mental: 'Tinh thần',
  } satisfies Record<LifestyleGroup, string>,
  cta: {
    start: 'Bắt đầu kiểm tra',
    continue: 'Tiếp tục',
    logFitness: 'Ghi nhận kết quả',
    readTips: 'Đọc bí kíp',
    unlockFrame: 'Nhận khung tân binh',
    makeAvatar: 'Tạo avatar',
    pickPhoto: 'Chọn ảnh từ máy',
    usePhoto: 'Dùng ảnh này',
    share: 'Chia sẻ',
    download: 'Tải về',
    openBrowser: 'Mở bằng trình duyệt',
    newRound: 'Bắt đầu lượt mới',
    stay: 'Tiếp tục',
    reset: 'Lượt mới',
    back: 'Quay lại',
  },
  idle: {
    title: 'Phiên sắp hết hạn',
    body: 'Máy có thể là thiết bị chung. Chọn Tiếp tục để giữ lượt, hoặc Lượt mới cho người sau.',
  },
  done: {
    title: 'Phiên gác hoàn thành',
    body: 'Tân binh đã bẻ điểm khuyết, biết điểm khỏe. Trả máy cho tình nguyện viên khi xong.',
  },
} as const;
