import { useRef, useState } from 'react';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { decodeImageFile, bitmapToObjectUrl } from '../../lib/image';
import { useSession } from '../../store/session.store';

export function UploadScreen() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setSourceImage = useSession((s) => s.setSourceImage);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const bitmap = await decodeImageFile(file);
      const url = await bitmapToObjectUrl(bitmap);
      setSourceImage(url);
      go('avatarCrop');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chọn ảnh JPG hoặc PNG khác.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenShell
      eyebrow="Avatar"
      title="Ghép mặt vào khung"
      onBack={goBack}
      footer={
        <Button onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? 'Đang đọc ảnh…' : copy.cta.pickPhoto}
        </Button>
      }
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex min-h-48 w-full items-center justify-center rounded-[4px] border-2 border-dashed border-outline bg-surface px-4 text-center text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        Chạm để chọn ảnh có sẵn trên máy
      </button>
      <p className="mt-3 text-sm text-ink-muted">{copy.privacyPhoto}</p>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
    </ScreenShell>
  );
}
