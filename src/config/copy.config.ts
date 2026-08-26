import type { LifestyleGroup } from '../domain/types';

export const copy = {
  event: 'CÓC NHẬP NGŨ 2026',
  codeName: 'MẬT MÃ SỐ 4',
  tagline: 'BẺ ĐIỂM KHUYẾT – BIẾT ĐIỂM KHỎE',

  recruitScore: 'Điểm tân binh',
  bmiLabel: 'BMI của bạn',
  healthy: 'Điểm Khỏe',
  defect: 'Điểm Khuyết',
  referenceOnly: 'Kết quả tham khảo',

  disclaimer: {
    title: 'Đọc trước khi bắt đầu',
    body: 'Đây là trò chơi trải nghiệm tại sự kiện, không phải công cụ y tế. Kết quả không chẩn đoán bệnh và không nói lên điều gì về khả năng sinh sản của bạn. Các mốc BMI và thể lực do ban tổ chức đặt ra, chưa phải chuẩn y khoa. Muốn biết chính xác, bạn nên đi khám.',
  },

  groups: {
    sleep: 'Giấc ngủ',
    nutrition: 'Dinh dưỡng',
    hydration: 'Uống nước',
    activity: 'Vận động',
    mental: 'Tinh thần',
  } satisfies Record<LifestyleGroup, string>,

  landing: {
    intro:
      'Ba phút thôi: đo vài chỉ số, gập thanh lò xo, trả lời nhanh mấy câu về thói quen hằng ngày. Xong là biết mình đang khỏe ở đâu, hụt ở đâu — và nhận một khung ảnh riêng.',
    noAccount: 'Không cần đăng nhập. Không lưu lại gì sau khi bạn đóng trang.',
    beats: [
      { n: '01', label: 'Chỉ số' },
      { n: '02', label: 'Lò xo' },
      { n: '03', label: 'Hỏi đáp' },
    ],
  },

  intake: {
    eyebrow: 'Bước 1/3',
    title: 'Vài chỉ số cơ bản',
    female: 'Nữ',
    male: 'Nam',
    femaleHint: 'Thanh lò xo 20kg',
    maleHint: 'Thanh lò xo 30kg',
    needGender: 'Chọn nam hoặc nữ để đi tiếp',
    age: 'Tuổi',
    height: 'Chiều cao',
    weight: 'Cân nặng',
  },

  fitness: {
    eyebrow: 'Bước 2/3',
    title: 'Gập thanh lò xo',
    guide:
      'Bạn gập thanh lò xo trong 20 giây, tình nguyện viên đếm giúp. Xong thì bấm +/− hoặc bấm vào số rồi gõ.',
    reps: 'Số lần gập',
    repsUnit: 'lần',
  },

  quiz: {
    eyebrow: 'Bước 3/3',
    title: 'Thói quen hằng ngày',
    counter: (current: number, total: number) => `Câu ${current}/${total}`,
  },

  calculating: {
    eyebrow: 'Chờ một chút',
    title: 'Đang tổng hợp',
    stamp: 'ĐANG CHẤM',
  },

  result: {
    eyebrow: 'Kết quả',
    title: 'Khỏe ở đâu, hụt ở đâu',
    chartLabel: 'Biểu đồ năm nhóm thói quen',
    of100: '/100',
    mix: 'Gồm hình thể 20%, thể lực 20% và thói quen 60%.',
    converted: (body: number, strength: number, lifestyle: number) =>
      `Điểm quy đổi: hình thể ${body}, thể lực ${strength}, thói quen ${lifestyle}.`,
    healthyHint: 'Hai nhóm cao nhất',
    defectHint: 'Hai nhóm thấp nhất',
    allGroups: 'Năm nhóm thói quen',
    body: 'Hình thể',
    strength: 'Thể lực',
    bmiUnit: 'BMI',
    summary: (s1: string, s2: string, w1: string, w2: string) =>
      `Cao hơn ở ${s1} và ${s2}. Thấp hơn ở ${w1} và ${w2}.`,
  },

  knowledge: {
    eyebrow: 'Gợi ý cải thiện',
    counter: (current: number, total: number) => `Thẻ ${current}/${total}`,
    nextUp: 'Tiếp theo',
    prev: 'Trước',
    next: 'Tiếp',
  },

  unlock: {
    eyebrow: 'Phần thưởng',
    title: 'Mở khung tân binh',
    badge: 'TÂN BINH',
  },

  upload: {
    eyebrow: 'Ảnh đại diện',
    title: 'Chọn một tấm ảnh',
    dropZone: 'Chạm để chọn ảnh có sẵn trong máy',
    privacy: 'Ảnh được xử lý ngay trên máy bạn, không gửi đi đâu cả.',
    reading: 'Đang mở ảnh…',
    error: 'Không mở được ảnh này. Bạn chọn một tấm JPG hoặc PNG khác nhé.',
  },

  crop: {
    eyebrow: 'Canh ảnh',
    title: 'Kéo cho vừa khung',
    zoom: 'Phóng to',
    missing: 'Chưa có ảnh',
    missingBody: 'Bạn quay lại chọn ảnh trước đã.',
  },

  preview: {
    eyebrow: 'Hoàn tất',
    title: 'Ảnh của bạn',
    alt: 'Ảnh đại diện đã lồng khung tân binh',
    composing: 'Đang lồng khung…',
    error: 'Chưa lồng được khung. Bạn thử chọn lại ảnh nhé.',
    inAppBrowser:
      'Zalo và Facebook thường chặn tải ảnh. Bấm nút “…” ở góc màn hình rồi chọn mở bằng Chrome hoặc Safari.',
    shared: 'Đã chia sẻ',
  },

  idle: {
    title: 'Bạn còn đó không?',
    body: 'Lâu rồi không thấy bạn bấm gì. Lượt chơi sẽ tự xoá để nhường cho người sau.',
  },

  done: {
    eyebrow: 'Hết lượt',
    title: 'Xong rồi!',
    body: 'Cảm ơn bạn đã ghé booth 4. Nhớ lưu lại ảnh, rồi trả máy cho tình nguyện viên nhé.',
  },

  cta: {
    start: 'Bắt đầu',
    continue: 'Tiếp tục',
    readTips: 'Xem cách cải thiện',
    unlockFrame: 'Mở khung ảnh',
    makeAvatar: 'Làm ảnh đại diện',
    pickPhoto: 'Chọn ảnh',
    usePhoto: 'Dùng ảnh này',
    share: 'Chia sẻ',
    download: 'Tải ảnh về',
    finish: 'Xong',
    stay: 'Tôi vẫn đang chơi',
    reset: 'Nhường lượt cho người sau',
    newRound: 'Bắt đầu lượt mới',
    back: 'Quay lại',
    skip: 'Về đầu',
  },

  skip: {
    title: 'Về màn hình đầu?',
    body: 'Lượt đang chơi sẽ bị xoá hết. Người sau bắt đầu lại từ đầu.',
    stay: 'Ở lại',
    leave: 'Home',
  },
} as const;
