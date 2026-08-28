import type { OverallTier, ScoreGroup } from '../domain/types';

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
    physical: 'Thể lực',
    sleep: 'Giấc ngủ',
    nutrition: 'Dinh dưỡng',
    hydration: 'Uống nước',
    activity: 'Vận động',
    mental: 'Tinh thần',
  } satisfies Record<ScoreGroup, string>,

  landing: {
    intro:
      'Ba phút thôi: đo vài chỉ số, gập thanh lò xo, trả lời nhanh mấy câu về thói quen hằng ngày. Xong là biết mình đang khỏe ở đâu, hụt ở đâu — và nhận một khung ảnh riêng.',
    beats: [
      { n: '01', label: 'Chỉ số' },
      { n: '02', label: 'Lò xo' },
      { n: '03', label: 'Hỏi đáp' },
    ],
  },

  intake: {
    eyebrow: 'Bước 1/3',
    title: 'Hồ sơ tân binh',
    female: 'Nữ',
    male: 'Nam',
    femaleHint: 'Thanh lò xo 20kg',
    maleHint: 'Thanh lò xo 30kg',
    needGender: 'Vui lòng chọn giới tính.',
    age: 'Tuổi',
    height: 'Chiều cao',
    weight: 'Cân nặng',
  },

  fitness: {
    eyebrow: 'Bước 2/3',
    title: 'Gập thanh lò xo',
    bar: (kg: number) => `Thanh tạ ${kg}kg`,
    timer: '20 giây',
    guide:
      'Bạn gập thanh lò xo trong 20 giây, tình nguyện viên đếm giúp. Xong thì bấm +/− hoặc bấm vào số rồi gõ.',
    reps: 'Số lần gập',
    repsUnit: 'lần',
  },

  quiz: {
    eyebrow: 'Bước 3/3',
    title: 'Kiểm tra lối sống',
    counter: (current: number, total: number) => `Câu ${current}/${total}`,
    needAll: 'Vui lòng trả lời tất cả câu hỏi.',
  },

  calculating: {
    eyebrow: 'Chờ một chút',
    title: 'Đang phân tích hồ sơ tân binh...',
    stamp: 'ĐANG PHÂN TÍCH',
  },

  result: {
    eyebrow: 'Hồ sơ sức khỏe',
    title: 'Hồ sơ tân binh',
    of100: '/100',
    overallHint: 'Xếp hạng tổng thể',
    highlightHint: 'Nhóm nổi bật / Nhóm cần cải thiện',
    chartLabel: 'Sáu nhóm chỉ số',
    mix: 'Gồm thể lực 20% và năm nhóm lối sống 80%.',
    converted: (physical: number) => `Điểm thể lực (BMI 40% + gập thanh 60%): ${physical}.`,
    healthyHint: 'Hai nhóm cao nhất',
    defectHint: 'Hai nhóm thấp nhất',
    allGroups: 'Sáu nhóm chỉ số',
    body: 'Hình thể',
    strength: 'Thể lực',
    bmiUnit: 'BMI',
    summary: (s1: string, s2: string, w1: string, w2: string) =>
      `Cao hơn ở ${s1} và ${s2}. Thấp hơn ở ${w1} và ${w2}.`,
    tiers: {
      healthy: 'Điểm Khỏe',
      stable: 'Ổn định',
      defect: 'Điểm Khuyết',
    } satisfies Record<OverallTier, string>,
  },

  knowledge: {
    eyebrow: 'Mật mã kiến thức',
    counter: (current: number, total: number) => `Thẻ ${current}/${total}`,
    nextUp: 'Tiếp theo',
    prev: 'Trước',
    next: 'Tiếp',
    note: 'Nội dung mang tính giáo dục chung, không chẩn đoán và không kết luận về khả năng sinh sản của bạn.',
  },

  unlock: {
    eyebrow: 'Phần thưởng',
    title: 'Mở khung tân binh',
    badge: 'TÂN BINH',
  },

  upload: {
    eyebrow: 'Ảnh đại diện',
    title: 'Tải ảnh lên',
    dropZone: 'Chạm để chọn ảnh có sẵn trong máy',
    camera: 'Chụp ảnh',
    library: 'Chọn từ thư viện',
    privacy: 'Ảnh được xử lý ngay trên máy bạn, không gửi đi đâu cả.',
    reading: 'Đang mở ảnh…',
    error: 'Định dạng ảnh không hỗ trợ. Vui lòng chọn file JPG, PNG hoặc WEBP.',
    tooLarge: 'Ảnh vượt quá dung lượng cho phép (tối đa 10MB).',
  },

  crop: {
    eyebrow: 'Ghép avatar',
    title: 'Kéo cho vừa khung',
    zoom: 'Phóng to',
    reset: 'Đặt lại',
    missing: 'Chưa có ảnh',
    missingBody: 'Bạn quay lại chọn ảnh trước đã.',
  },

  preview: {
    eyebrow: 'Hoàn thành',
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

  sessionReset: 'Phiên chơi đã được làm mới. Vui lòng bắt đầu lại.',

  done: {
    eyebrow: 'Hết lượt',
    title: 'Xong rồi!',
    body: 'Cảm ơn bạn đã ghé booth 4. Nhớ lưu lại ảnh, rồi trả máy cho tình nguyện viên nhé.',
  },

  cta: {
    start: 'Bắt đầu nhập ngũ',
    continue: 'Tiếp tục',
    seeResult: 'Xem kết quả',
    readTips: 'Xem mật mã kiến thức',
    unlockFrame: 'Mở khóa avatar',
    makeAvatar: 'Tải ảnh lên',
    pickPhoto: 'Chọn ảnh',
    composeAvatar: 'Ghép avatar',
    usePhoto: 'Xác nhận',
    share: 'Chia sẻ',
    download: 'Tải về',
    finish: 'Xong',
    stay: 'Tôi vẫn đang chơi',
    reset: 'Nhường lượt cho người sau',
    newRound: 'Chơi lại',
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
