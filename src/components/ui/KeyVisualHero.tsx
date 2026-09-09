import { mediaConfig } from '../../config/media.config';

/**
 * Mô-típ chính của key visual: hai vệt sáng vươn về phía nhau — hồng từ
 * trên trái, xanh từ dưới phải — và tia sáng loé lên ở chỗ chúng suýt chạm.
 *
 * Đây là bản dựng bằng SVG nên chạy offline, không tốn thêm request nào.
 * Khi có file poster thật, trỏ mediaConfig.heroImageUrl vào là thay được.
 */

export function KeyVisualHero() {
  if (mediaConfig.heroImageUrl) {
    return (
      <img
        src={mediaConfig.heroImageUrl}
        alt=""
        className="w-full rounded-[4px] border border-outline object-cover"
      />
    );
  }

  return (
    <svg viewBox="0 0 400 210" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="kv-reach-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c63aa0" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#ff5ecb" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffd6f4" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="kv-reach-right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#2e78dc" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#4fd8ff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#d6f2ff" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="kv-spark-core">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#bfe4ff" stopOpacity="0" />
        </radialGradient>
        <filter id="kv-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Vệt vươn tới, vẽ hai lần: một lớp nhoè làm quầng, một lớp nét */}
      <g filter="url(#kv-soft)" opacity="0.85">
        <path
          d="M-8 22C70 44 130 70 178 98l8 5-8 3C128 84 66 60-8 42Z"
          fill="url(#kv-reach-left)"
        />
        <path
          d="M408 190C330 168 268 144 222 118l-8-5 8-3c48 22 112 44 186 60Z"
          fill="url(#kv-reach-right)"
        />
      </g>
      <path d="M-8 22C70 44 130 70 178 98l8 5-8 3C128 84 66 60-8 42Z" fill="url(#kv-reach-left)" />
      <path
        d="M408 190C330 168 268 144 222 118l-8-5 8-3c48 22 112 44 186 60Z"
        fill="url(#kv-reach-right)"
      />

      {/* Tia sáng ở khe giữa hai đầu vệt */}
      <circle cx="200" cy="107" r="34" fill="url(#kv-spark-core)" />
      <g transform="translate(200 107) scale(1.5) translate(-12 -12)">
        <path
          d="M12 1c.8 6.5 4.5 10.2 11 11-6.5.8-10.2 4.5-11 11-.8-6.5-4.5-10.2-11-11C7.5 11.2 11.2 7.5 12 1Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}
