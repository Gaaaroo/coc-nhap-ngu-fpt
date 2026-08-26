import type { Question } from '../domain/types';

/** [CHỜ FSD] Bộ câu hỏi mẫu — thay bằng nguyên văn khi FSD về. */
export const questions: Question[] = [
  {
    id: 'sleep-1',
    group: 'sleep',
    prompt: 'Dạo này bạn ngủ được mấy tiếng một đêm?',
    options: [
      { id: 's1-a', label: 'Dưới 5 tiếng', score: 0 },
      { id: 's1-b', label: '5–6 tiếng', score: 1 },
      { id: 's1-c', label: '7–8 tiếng', score: 3 },
      { id: 's1-d', label: 'Ngủ nhiều nhưng dậy vẫn mệt', score: 1 },
    ],
  },
  {
    id: 'sleep-2',
    group: 'sleep',
    prompt: 'Bạn buông điện thoại bao lâu trước khi ngủ?',
    options: [
      { id: 's2-a', label: 'Lướt tới lúc ngủ luôn', score: 0 },
      { id: 's2-b', label: 'Khoảng 15 phút', score: 1 },
      { id: 's2-c', label: 'Khoảng nửa tiếng', score: 2 },
      { id: 's2-d', label: 'Một tiếng hoặc hơn', score: 3 },
    ],
  },
  {
    id: 'nutrition-1',
    group: 'nutrition',
    prompt: 'Bữa chính của bạn thường có những gì?',
    options: [
      { id: 'n1-a', label: 'Hay bỏ bữa, hoặc ăn tạm đồ chiên', score: 0 },
      { id: 'n1-b', label: 'Chủ yếu cơm hoặc mì, ít rau', score: 1 },
      { id: 'n1-c', label: 'Đủ cơm, thịt cá và rau', score: 3 },
      { id: 'n1-d', label: 'Ăn no nhưng phần lớn là đồ ngọt', score: 1 },
    ],
  },
  {
    id: 'nutrition-2',
    group: 'nutrition',
    prompt: 'Một tuần bạn uống trà sữa, nước ngọt mấy lần?',
    options: [
      { id: 'n2-a', label: 'Gần như ngày nào cũng có', score: 0 },
      { id: 'n2-b', label: '3–5 lần', score: 1 },
      { id: 'n2-c', label: '1–2 lần', score: 2 },
      { id: 'n2-d', label: 'Hiếm khi', score: 3 },
    ],
  },
  {
    id: 'hydration-1',
    group: 'hydration',
    prompt: 'Mỗi ngày bạn uống khoảng bao nhiêu nước lọc?',
    options: [
      { id: 'h1-a', label: 'Rất ít, chủ yếu uống nước ngọt', score: 0 },
      { id: 'h1-b', label: 'Khoảng 1 lít', score: 1 },
      { id: 'h1-c', label: 'Khoảng 1,5–2 lít', score: 3 },
      { id: 'h1-d', label: 'Uống nhiều nhưng phần lớn là cà phê', score: 1 },
    ],
  },
  {
    id: 'hydration-2',
    group: 'hydration',
    prompt: 'Bạn thường nhớ uống nước vào lúc nào?',
    options: [
      { id: 'h2-a', label: 'Chỉ khi khát khô cổ', score: 0 },
      { id: 'h2-b', label: 'Lúc nào chợt nhớ ra thì uống', score: 1 },
      { id: 'h2-c', label: 'Để chai bên cạnh, uống đều cả ngày', score: 3 },
      { id: 'h2-d', label: 'Uống dồn một lần vào buổi tối', score: 1 },
    ],
  },
  {
    id: 'activity-1',
    group: 'activity',
    prompt: 'Tuần vừa rồi bạn chạy, đá bóng hay tập gym tổng cộng bao lâu?',
    options: [
      { id: 'a1-a', label: 'Gần như không', score: 0 },
      { id: 'a1-b', label: 'Chưa tới 1 tiếng', score: 1 },
      { id: 'a1-c', label: 'Khoảng 2–3 tiếng', score: 2 },
      { id: 'a1-d', label: 'Hơn 3 tiếng', score: 3 },
    ],
  },
  {
    id: 'activity-2',
    group: 'activity',
    prompt: 'Ngày thường bạn ngồi liên tục bao lâu mới đứng dậy?',
    options: [
      { id: 'a2-a', label: 'Trên 6 tiếng, gần như ngồi suốt', score: 0 },
      { id: 'a2-b', label: '4–6 tiếng, thỉnh thoảng đi lại', score: 1 },
      { id: 'a2-c', label: 'Dưới 4 tiếng, có nghỉ giải lao', score: 2 },
      { id: 'a2-d', label: 'Ít khi ngồi lâu, đi lại nhiều', score: 3 },
    ],
  },
  {
    id: 'mental-1',
    group: 'mental',
    prompt: 'Lúc căng thẳng, bạn thường xoay xở thế nào?',
    options: [
      { id: 'm1-a', label: 'Căng suốt, không dứt ra được', score: 0 },
      { id: 'm1-b', label: 'Có căng nhưng vẫn ngủ được', score: 1 },
      { id: 'm1-c', label: 'Có cách xả: đi bộ, chơi thể thao, tâm sự', score: 3 },
      { id: 'm1-d', label: 'Xả bằng cách thức khuya lướt điện thoại', score: 1 },
    ],
  },
  {
    id: 'mental-2',
    group: 'mental',
    prompt: 'Trong ngày bạn có lúc nào rời hẳn màn hình không?',
    options: [
      { id: 'm2-a', label: 'Không, lúc nào cũng cầm máy', score: 0 },
      { id: 'm2-b', label: 'Thỉnh thoảng được vài phút', score: 1 },
      { id: 'm2-c', label: 'Có, chừng 15–30 phút', score: 2 },
      { id: 'm2-d', label: 'Có, thành thói quen mỗi ngày', score: 3 },
    ],
  },
];
