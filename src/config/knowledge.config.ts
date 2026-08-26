import type { KnowledgeCard } from '../domain/types';

/** [CHỜ FSD / BTC] Kiến thức chung về lối sống — không nhắm vào cá nhân người chơi. */
export const knowledgeCards: KnowledgeCard[] = [
  {
    id: 'k-sleep',
    group: 'sleep',
    title: 'Ngủ đủ trước đã, tính chuyện khác sau',
    body: 'Ngủ 7–8 tiếng đều đặn là lúc cơ thể phục hồi và nội tiết trở lại nhịp bình thường. Thức khuya vài hôm thì chưa sao, nhưng thiếu ngủ kéo dài sẽ kéo theo mệt mỏi, khó tập trung và ăn uống thất thường.',
  },
  {
    id: 'k-nutrition',
    group: 'nutrition',
    title: 'Một bữa nên có đủ ba phần',
    body: 'Tinh bột, đạm và rau trong cùng một bữa giúp bạn no lâu, đỡ tụt năng lượng giữa buổi. Trà sữa hay nước ngọt không xấu, chỉ là uống ngày nào cũng có thì lượng đường cộng dồn nhanh hơn bạn tưởng.',
  },
  {
    id: 'k-hydration',
    group: 'hydration',
    title: 'Uống nước trước khi thấy khát',
    body: 'Đến lúc khát khô cổ thì cơ thể đã thiếu nước từ trước rồi. Khoảng 1,5–2 lít mỗi ngày, chia đều ra, dễ hơn nhiều so với uống dồn một lúc. Cà phê và nước ngọt không thay được nước lọc.',
  },
  {
    id: 'k-activity',
    group: 'activity',
    title: 'Không cần tập nặng, chỉ cần đừng ngồi lì',
    body: 'Đi bộ nhanh, đá bóng, leo cầu thang — cộng lại được khoảng 150 phút mỗi tuần là đã tốt cho tim mạch. Điều nên tránh là ngồi liền 6–8 tiếng không đứng dậy lần nào.',
  },
  {
    id: 'k-mental',
    group: 'mental',
    title: 'Căng thẳng thường ăn vào giấc ngủ',
    body: 'Áp lực học hành hay công việc kéo dài ít khi dừng ở đó, nó quay lại dưới dạng mất ngủ và ăn uống lung tung. Mỗi ngày để ra 15 phút rời màn hình — đi bộ, nghe nhạc, nói chuyện với bạn bè — là cách rẻ nhất để cắt vòng lặp.',
  },
];
