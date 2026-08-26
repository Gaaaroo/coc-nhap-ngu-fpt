export function isInAppBrowser(): boolean {
  const ua = navigator.userAgent;
  return /Zalo|FBAN|FBAV|Instagram|Line\//i.test(ua);
}

export function canShareFiles(file: File): boolean {
  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
  };
  if (!nav.share || !nav.canShare) return false;
  try {
    return nav.canShare({ files: [file] });
  } catch {
    return false;
  }
}

export async function shareFile(
  file: File,
  title: string,
  text: string,
): Promise<'shared' | 'aborted' | 'unsupported'> {
  if (!canShareFiles(file)) return 'unsupported';
  try {
    await navigator.share({ files: [file], title, text });
    return 'shared';
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return 'aborted';
    return 'unsupported';
  }
}

export function downloadFile(file: File): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
