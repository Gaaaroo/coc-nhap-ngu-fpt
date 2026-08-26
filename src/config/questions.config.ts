import type { Question } from '../domain/types';

/** [CHỜ FSD] Bộ câu hỏi mẫu — thay bằng nguyên văn khi FSD về. */
export const questions: Question[] = [
  {
    id: 'sleep-1',
    group: 'sleep',
    prompt: 'Đêm qua (hoặc đêm thường), tân binh ngủ khoảng bao lâu?',
    options: [
      { id: 's1-a', label: 'Dưới 5 giờ', score: 0 },
      { id: 's1-b', label: '5–6 giờ', score: 1 },
      { id: 's1-c', label: '7–8 giờ', score: 3 },
      { id: 's1-d', label: 'Trên 9 giờ, vẫn mệt', score: 1 },
    ],
  },
  {
    id: 'sleep-2',
    group: 'sleep',
    prompt: 'Trước khi ngủ, màn hình điện thoại thường tắt lúc nào?',
    options: [
      { id: 's2-a', label: 'Ngay trên gối, cuộn tới khi ngủ', score: 0 },
      { id: 's2-b', label: 'Khoảng 15 phút trước', score: 1 },
      { id: 's2-c', label: 'Trên 30 phút trước', score: 2 },
      { id: 's2-d', label: 'Một tiếng trước, phòng tối', score: 3 },
    ],
  },
  {
    id: 'nutrition-1',
    group: 'nutrition',
    prompt: 'Bữa chính trong ngày thường trông thế nào?',
    options: [
      { id: 'n1-a', label: 'Bỏ bữa hoặc ăn vội đồ chiên', score: 0 },
      { id: 'n1-b', label: 'Cơm/mì + ít rau', score: 1 },
      { id: 'n1-c', label: 'Đủ cơm, đạm, rau', score: 3 },
      { id: 'n1-d', label: 'Ăn no nhưng toàn đồ ngọt', score: 1 },
    ],
  },
  {
    id: 'nutrition-2',
    group: 'nutrition',
    prompt: 'Đồ uống có đường (trà sữa, nước ngọt) mỗi tuần?',
    options: [
      { id: 'n2-a', label: 'Hầu như mỗi ngày', score: 0 },
      { id: 'n2-b', label: '3–5 lần', score: 1 },
      { id: 'n2-c', label: '1–2 lần', score: 2 },
      { id: 'n2-d', label: 'Hiếm hoặc không', score: 3 },
    ],
  },
  {
    id: 'hydration-1',
    group: 'hydration',
    prompt: 'Một ngày tân binh uống khoảng bao nhiêu nước lọc?',
    options: [
      { id: 'h1-a', label: 'Dưới 3 ly, chủ yếu nước ngọt', score: 0 },
      { id: 'h1-b', label: 'Khoảng 4–6 ly', score: 1 },
      { id: 'h1-c', label: 'Khoảng 1.5–2 lít', score: 3 },
      { id: 'h1-d', label: 'Uống nhiều nhưng toàn cà phê', score: 1 },
    ],
  },
  {
    id: 'hydration-2',
    group: 'hydration',
    prompt: 'Khi nào tân binh nhớ uống nước?',
    options: [
      { id: 'h2-a', label: 'Chỉ khi khát khô cổ', score: 0 },
      { id: 'h2-b', label: 'Khi nhớ ra giữa buổi', score: 1 },
      { id: 'h2-c', label: 'Mang chai, uống đều', score: 3 },
      { id: 'h2-d', label: 'Uống dồn một lúc buổi tối', score: 1 },
    ],
  },
  {
    id: 'activity-1',
    group: 'activity',
    prompt: 'Trong 7 ngày gần đây, tân binh vận động mạnh (chạy, bóng, gym) bao lâu?',
    options: [
      { id: 'a1-a', label: 'Gần như không', score: 0 },
      { id: 'a1-b', label: 'Dưới 1 giờ tổng', score: 1 },
      { id: 'a1-c', label: 'Khoảng 2–3 giờ', score: 2 },
      { id: 'a1-d', label: 'Từ 3 giờ trở lên', score: 3 },
    ],
  },
  {
    id: 'activity-2',
    group: 'activity',
    prompt: 'Ngày thường, tân binh ngồi liền một mạch bao lâu?',
    options: [
      { id: 'a2-a', label: 'Trên 6 giờ, ít đứng', score: 0 },
      { id: 'a2-b', label: '4–6 giờ, thỉnh thoảng đi lại', score: 1 },
      { id: 'a2-c', label: 'Dưới 4 giờ, có nghỉ chân', score: 2 },
      { id: 'a2-d', label: 'Làm việc đứng / đi nhiều', score: 3 },
    ],
  },
  {
    id: 'mental-1',
    group: 'mental',
    prompt: 'Áp lực học / việc tuần này, tân binh xử lý ra sao?',
    options: [
      { id: 'm1-a', label: 'Căng suốt, khó tắt', score: 0 },
      { id: 'm1-b', label: 'Căng nhưng còn ngủ được', score: 1 },
      { id: 'm1-c', label: 'Có cách xả (đi bộ, nói chuyện)', score: 3 },
      { id: 'm1-d', label: 'Xả bằng thức khuya cuộn mạng', score: 1 },
    ],
  },
  {
    id: 'mental-2',
    group: 'mental',
    prompt: 'Tân binh có khoảng lặng (không màn hình) trong ngày không?',
    options: [
      { id: 'm2-a', label: 'Không, luôn dính máy', score: 0 },
      { id: 'm2-b', label: 'Thỉnh thoảng vài phút', score: 1 },
      { id: 'm2-c', label: 'Có 15–30 phút cố ý', score: 2 },
      { id: 'm2-d', label: 'Có thói quen hằng ngày', score: 3 },
    ],
  },
];
