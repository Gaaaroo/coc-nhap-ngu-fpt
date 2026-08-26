import { useEffect, useState } from 'react';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { composeAvatar, blobToFile } from '../../lib/canvas';
import { track } from '../../lib/analytics';
import { canShareFiles, downloadFile, isInAppBrowser, shareFile } from '../../lib/share';
import { useSession } from '../../store/session.store';

export function PreviewScreen() {
  const sourceImageUrl = useSession((s) => s.sourceImageUrl);
  const cropPixels = useSession((s) => s.cropPixels);
  const avatarBlobUrl = useSession((s) => s.avatarBlobUrl);
  const setAvatarBlobUrl = useSession((s) => s.setAvatarBlobUrl);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareState, setShareState] = useState<'idle' | 'shared'>('idle');

  useEffect(() => {
    if (!sourceImageUrl || !cropPixels) return;
    let cancelled = false;
    void (async () => {
      try {
        const blob = await composeAvatar(sourceImageUrl, cropPixels);
        if (cancelled) return;
        const nextFile = blobToFile(blob);
        setFile(nextFile);
        setAvatarBlobUrl(URL.createObjectURL(blob));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : copy.preview.error);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sourceImageUrl, cropPixels, setAvatarBlobUrl]);

  const inApp = isInAppBrowser();
  const shareOk = file ? canShareFiles(file) : false;

  const onShare = async () => {
    if (!file) return;
    const result = await shareFile(file, copy.codeName, copy.tagline);
    if (result === 'shared') {
      setShareState('shared');
      track('step_avatar_exported');
    }
  };

  const onDownload = () => {
    if (!file) return;
    downloadFile(file);
    track('step_avatar_exported');
  };

  return (
    <ScreenShell
      eyebrow={copy.preview.eyebrow}
      title={copy.preview.title}
      onBack={goBack}
      footer={
        <div className="space-y-2">
          {inApp ? <p className="text-sm text-ink-muted">{copy.preview.inAppBrowser}</p> : null}
          {shareOk && !inApp ? (
            <Button onClick={() => void onShare()}>
              {shareState === 'shared' ? copy.preview.shared : copy.cta.share}
            </Button>
          ) : null}
          <Button
            variant={shareOk && !inApp ? 'secondary' : 'primary'}
            disabled={!file}
            onClick={onDownload}
          >
            {copy.cta.download}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => go('done')}>
            {copy.cta.finish}
          </Button>
        </div>
      }
    >
      {avatarBlobUrl ? (
        <img
          src={avatarBlobUrl}
          alt={copy.preview.alt}
          className="plate-brass mx-auto w-full max-w-[360px]"
        />
      ) : error ? (
        <p className="text-sm text-danger">{error}</p>
      ) : (
        <p className="text-ink-muted">{copy.preview.composing}</p>
      )}
    </ScreenShell>
  );
}
