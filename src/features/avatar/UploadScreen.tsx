import { useRef, useState } from 'react';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { decodeImageFile, bitmapToObjectUrl } from '../../lib/image';
import { useSession } from '../../store/session.store';

export function UploadScreen() {
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);
  const sourceImageUrl = useSession((s) => s.sourceImageUrl);
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
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.upload.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenShell
      eyebrow={copy.upload.eyebrow}
      title={copy.upload.title}
      onBack={goBack}
      footer={
        <Button disabled={!sourceImageUrl || busy} onClick={() => go('avatarCrop')}>
          {busy ? copy.upload.reading : copy.cta.composeAvatar}
        </Button>
      }
    >
      {sourceImageUrl ? (
        <img
          src={sourceImageUrl}
          alt=""
          className="plate mx-auto max-h-64 w-full object-contain"
        />
      ) : (
        <div className="flex min-h-40 w-full flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-accent/70 bg-surface px-4 text-center text-ink-muted shadow-[inset_0_1px_0_var(--color-highlight)]">
          {copy.upload.dropZone}
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="secondary" disabled={busy} onClick={() => cameraRef.current?.click()}>
          {copy.upload.camera}
        </Button>
        <Button variant="secondary" disabled={busy} onClick={() => libraryRef.current?.click()}>
          {copy.upload.library}
        </Button>
      </div>
      <p className="mt-3 text-sm text-ink-muted">{copy.upload.privacy}</p>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      <input
        ref={cameraRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void onFile(e.target.files?.[0]);
          e.currentTarget.value = '';
        }}
      />
      <input
        ref={libraryRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          void onFile(e.target.files?.[0]);
          e.currentTarget.value = '';
        }}
      />
    </ScreenShell>
  );
}
