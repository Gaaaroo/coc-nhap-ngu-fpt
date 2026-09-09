import { describe, expect, it } from 'vitest';
import { copy } from '../../config/copy.config';
import { frameTitleOf } from '../frame';

describe('frameTitleOf', () => {
  const ranks = copy.frameRanks;

  it('maps each FSD band, including edges', () => {
    expect(frameTitleOf(0, ranks)).toBe('TÂN BINH TẬP SỰ');
    expect(frameTitleOf(40, ranks)).toBe('TÂN BINH TẬP SỰ');
    expect(frameTitleOf(41, ranks)).toBe('LÍNH MỚI');
    expect(frameTitleOf(60, ranks)).toBe('LÍNH MỚI');
    expect(frameTitleOf(61, ranks)).toBe('BINH NHẤT');
    expect(frameTitleOf(70, ranks)).toBe('BINH NHẤT');
    expect(frameTitleOf(71, ranks)).toBe('ĐẶC CÔNG SIÊU PHÀM');
    expect(frameTitleOf(80, ranks)).toBe('ĐẶC CÔNG SIÊU PHÀM');
    expect(frameTitleOf(81, ranks)).toBe('CHIẾN BINH TINH NHUỆ');
    expect(frameTitleOf(90, ranks)).toBe('CHIẾN BINH TINH NHUỆ');
    expect(frameTitleOf(91, ranks)).toBe('ĐẠI TƯỚNG TỐI THƯỢNG');
    expect(frameTitleOf(100, ranks)).toBe('ĐẠI TƯỚNG TỐI THƯỢNG');
  });
});
