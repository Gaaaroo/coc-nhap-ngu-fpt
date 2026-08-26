import type { KnowledgeCard } from '../domain/types';

/** [CHỜ FSD / BTC] Nội dung giáo dục chung — không chẩn đoán cá nhân. */
export const knowledgeCards: KnowledgeCard[] = [
  {
    id: 'k-sleep',
    group: 'sleep',
    title: 'Giấc ngủ là phiên gác',
    body: 'Cơ thể phục hồi hormone và nhịp sinh học khi ngủ đủ, đều. Thiếu ngủ kéo dài làm mệt, khó tập trung — đó là tín hiệu lối sống, không phải kết luận y tế về sinh sản.',
  },
  {
    id: 'k-nutrition',
    group: 'nutrition',
    title: 'Bếp là kho lương',
    body: 'Ăn đủ nhóm, hạn chế đường uống, giúp năng lượng ổn. Dinh dưỡng tốt hỗ trợ sức khỏe tổng quát. App không đánh giá khả năng sinh sản của từng người.',
  },
  {
    id: 'k-hydration',
    group: 'hydration',
    title: 'Nước lọc là tiếp tế',
    body: 'Uống nước đều trong ngày giúp cơ thể làm việc trơn. Khát khô cổ là dấu hiệu đến muộn. Đây là kiến thức lối sống chung, không phải đơn thuốc.',
  },
  {
    id: 'k-activity',
    group: 'activity',
    title: 'Vận động là huấn luyện',
    body: 'Di chuyển đều đặn tốt cho tim, cơ, tinh thần. Test thanh lò xo ở booth chỉ là benchmark trải nghiệm, không thay khám sức khỏe.',
  },
  {
    id: 'k-mental',
    group: 'mental',
    title: 'Tinh thần là kỷ luật',
    body: 'Căng thẳng kéo dài dễ kéo theo ngủ kém và ăn uống lệch. Có khoảng lặng trong ngày là cách tân binh giữ nhịp — không phải chẩn đoán tâm lý.',
  },
];
