import type { Question } from '../domain/types';

export const questions: Question[] = [
  {
    id: 'sleep-1',
    group: 'sleep',
    prompt: 'Một đêm bình thường, bạn ngủ được tầm mấy tiếng?',
    options: [
      { id: 's1-a', label: "Dưới 5 tiếng – ngủ kiểu 'chợp mắt' cho qua", score: 25 },
      { id: 's1-b', label: '5–6 tiếng – đủ xài, không gục giữa giờ là được', score: 50 },
      { id: 's1-c', label: '7–8 tiếng – ngủ chuẩn bài luôn', score: 100 },
      { id: 's1-d', label: 'Trên 9 tiếng – ngủ nướng là nghề của tui', score: 75 },
    ],
  },
  {
    id: 'nutrition-1',
    group: 'nutrition',
    prompt: 'Một tuần bạn ăn rau xanh, trái cây khoảng mấy lần?',
    options: [
      { id: 'n1-a', label: 'Gần như không đụng tới rau', score: 25 },
      { id: 'n1-b', label: '2–3 lần/tuần, ăn cho có', score: 50 },
      { id: 'n1-c', label: '4–6 lần/tuần, khá chăm đó nha', score: 75 },
      { id: 'n1-d', label: 'Gần như bữa nào cũng có rau/trái cây', score: 100 },
    ],
  },
  {
    id: 'hydration-1',
    group: 'hydration',
    prompt: 'Một ngày bạn uống khoảng mấy chai nước 500ml?',
    options: [
      { id: 'h1-a', label: 'Dưới 2 chai (dưới 1 lít) – nhớ ra mới uống', score: 25 },
      { id: 'h1-b', label: '2–3 chai (1–1.5 lít)', score: 50 },
      { id: 'h1-c', label: '3–5 chai (1.5–2.5 lít) – uống đều cả ngày', score: 100 },
      { id: 'h1-d', label: 'Trên 5 chai (trên 2.5 lít)', score: 75 },
    ],
  },
  {
    id: 'activity-1',
    group: 'activity',
    prompt: "Ngoài giờ học/làm, bạn 'dính ghế' liên tục bao lâu mỗi ngày?",
    options: [
      { id: 'a1-a', label: 'Trên 8 tiếng, đứng dậy là chuyện hiếm', score: 25 },
      { id: 'a1-b', label: '5–8 tiếng', score: 50 },
      { id: 'a1-c', label: '3–5 tiếng, thỉnh thoảng đứng dậy đi lại', score: 75 },
      { id: 'a1-d', label: 'Dưới 3 tiếng, hay đứng lên vận động', score: 100 },
    ],
  },
  {
    id: 'mental-1',
    group: 'mental',
    prompt: "Dạo này đầu óc bạn 'căng như dây đàn' cỡ nào?",
    options: [
      { id: 'm1-a', label: 'Cực căng, áp lực tứ bề', score: 25 },
      { id: 'm1-b', label: 'Khá căng, hay stress', score: 50 },
      { id: 'm1-c', label: 'Bình thường, đôi lúc căng nhưng vẫn ổn', score: 75 },
      { id: 'm1-d', label: 'Khá thoải mái, tinh thần thư thái', score: 100 },
    ],
  },
];
