import type { Question } from '../domain/types';

export const questions: Question[] = [
  {
    id: 'sleep-1',
    group: 'sleep',
    prompt:
      'Một đêm bình thường, bạn ngủ được khoảng bao nhiêu tiếng (tính từ lúc nhắm mắt đến lúc dậy đi học/làm)?',
    options: [
      { id: 's1-a', label: "Dưới 5 tiếng – ngủ 'chợp mắt' là chính", score: 25 },
      { id: 's1-b', label: '5–6 tiếng – đủ để không gục giữa giờ', score: 50 },
      { id: 's1-c', label: '7–8 tiếng – ngủ đúng chuẩn tân binh', score: 100 },
      { id: 's1-d', label: 'Trên 9 tiếng – ngủ nướng là sở trường', score: 75 },
    ],
  },
  {
    id: 'sleep-2',
    group: 'sleep',
    prompt:
      'Bạn có hay ôm điện thoại, cày phim, lướt mạng đến sau 12h đêm mới chịu ngủ không?',
    options: [
      { id: 's2-a', label: 'Gần như đêm nào cũng vậy, ngủ trễ là chuyện thường', score: 25 },
      { id: 's2-b', label: 'Khoảng 3–4 đêm/tuần', score: 50 },
      { id: 's2-c', label: 'Thỉnh thoảng 1–2 đêm/tuần', score: 75 },
      { id: 's2-d', label: 'Hiếm khi, đến giờ là tắt máy đi ngủ', score: 100 },
    ],
  },
  {
    id: 'nutrition-1',
    group: 'nutrition',
    prompt: 'Một tuần bình thường, bữa ăn của bạn có rau xanh hoặc trái cây khoảng mấy lần?',
    options: [
      { id: 'n1-a', label: 'Gần như không có rau, chủ yếu đạm và tinh bột', score: 25 },
      { id: 'n1-b', label: '2–3 lần/tuần, thỉnh thoảng ăn cho có', score: 50 },
      { id: 'n1-c', label: '4–6 lần/tuần, khá đều đặn', score: 75 },
      { id: 'n1-d', label: 'Gần như bữa nào cũng có rau/trái cây', score: 100 },
    ],
  },
  {
    id: 'nutrition-2',
    group: 'nutrition',
    prompt: "Đồ chiên rán, trà sữa, thức ăn nhanh, nước ngọt... bạn 'nạp' vào người mấy lần một tuần?",
    options: [
      { id: 'n2-a', label: 'Gần như ngày nào cũng có mặt trong thực đơn', score: 25 },
      { id: 'n2-b', label: 'Khoảng 3–4 lần/tuần', score: 50 },
      { id: 'n2-c', label: '1–2 lần/tuần, thỉnh thoảng thèm thì ăn', score: 75 },
      { id: 'n2-d', label: 'Hiếm khi, ưu tiên đồ ăn lành mạnh', score: 100 },
    ],
  },
  {
    id: 'hydration-1',
    group: 'hydration',
    prompt: 'Một ngày bình thường, bạn uống khoảng mấy chai nước lọc loại 500ml?',
    options: [
      { id: 'h1-a', label: 'Dưới 2 chai (dưới 1 lít) – nhớ ra mới uống', score: 25 },
      { id: 'h1-b', label: '2–3 chai (1–1.5 lít)', score: 50 },
      { id: 'h1-c', label: '3–5 chai (1.5–2.5 lít) – uống đều đặn cả ngày', score: 100 },
      { id: 'h1-d', label: 'Trên 5 chai (trên 2.5 lít)', score: 75 },
    ],
  },
  {
    id: 'hydration-2',
    group: 'hydration',
    prompt: "Trà sữa, cà phê, nước ngọt có 'thế chỗ' nước lọc trong ngày của bạn không?",
    options: [
      { id: 'h2-a', label: 'Có, gần như thay hẳn nước lọc luôn', score: 25 },
      { id: 'h2-b', label: 'Khá thường xuyên, ngày nào cũng có 1 ly', score: 50 },
      { id: 'h2-c', label: 'Thỉnh thoảng, vài ngày mới uống 1 lần', score: 75 },
      { id: 'h2-d', label: "Hiếm khi, nước lọc vẫn là 'bạn thân'", score: 100 },
    ],
  },
  {
    id: 'activity-1',
    group: 'activity',
    prompt:
      'Một tuần, bạn vận động đổ mồ hôi thật sự (chạy bộ, gym, đá banh, nhảy, bơi...) khoảng mấy buổi?',
    options: [
      { id: 'a1-a', label: 'Không buổi nào, đi từ giường ra bàn học/làm là chính', score: 25 },
      { id: 'a1-b', label: '1–2 buổi/tuần', score: 50 },
      { id: 'a1-c', label: '3–4 buổi/tuần, khá chăm', score: 75 },
      { id: 'a1-d', label: '5 buổi trở lên/tuần, chuẩn tinh thần rèn luyện', score: 100 },
    ],
  },
  {
    id: 'activity-2',
    group: 'activity',
    prompt:
      "Ngoài giờ học/làm, bạn ngồi 'dính ghế' liên tục bao lâu mỗi ngày (học bài, làm việc, xem phim, chơi game...)?",
    options: [
      { id: 'a2-a', label: 'Trên 8 tiếng, đứng dậy là chuyện hiếm', score: 25 },
      { id: 'a2-b', label: '5–8 tiếng', score: 50 },
      { id: 'a2-c', label: '3–5 tiếng, thỉnh thoảng đứng dậy đi lại', score: 75 },
      { id: 'a2-d', label: 'Dưới 3 tiếng, hay đứng lên vận động', score: 100 },
    ],
  },
  {
    id: 'mental-1',
    group: 'mental',
    prompt: "Dạo này bạn thấy đầu óc mình 'căng như dây đàn' cỡ nào?",
    options: [
      { id: 'm1-a', label: 'Cực kỳ căng thẳng, áp lực từ mọi phía', score: 25 },
      { id: 'm1-b', label: 'Khá căng thẳng, hay stress', score: 50 },
      { id: 'm1-c', label: 'Bình thường, đôi lúc căng nhưng vẫn ổn', score: 75 },
      { id: 'm1-d', label: 'Khá thoải mái, tinh thần thư thái', score: 100 },
    ],
  },
  {
    id: 'mental-2',
    group: 'mental',
    prompt:
      "Trong tuần, bạn có dành thời gian làm điều mình thích (nghe nhạc, chơi game, gặp bạn bè, đọc sách...) để 'xả hơi' không?",
    options: [
      { id: 'm2-a', label: 'Hầu như không có thời gian cho bản thân', score: 25 },
      { id: 'm2-b', label: '1–2 lần/tuần', score: 50 },
      { id: 'm2-c', label: '3–4 lần/tuần', score: 75 },
      { id: 'm2-d', label: 'Gần như ngày nào cũng có', score: 100 },
    ],
  },
];
