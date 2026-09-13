import { useCallback, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { avatarConfig } from '../../config/avatar.config';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 2;

export function CropScreen() {
  const sourceImageUrl = useSession((s) => s.sourceImageUrl);
  const setCropPixels = useSession((s) => s.setCropPixels);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [area, setArea] = useState<Area | null>(null);

  const onComplete = useCallback((_: Area, pixels: Area) => {
    setArea(pixels);
  }, []);

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(DEFAULT_ZOOM);
  };

  if (!sourceImageUrl) {
    return (
      <ScreenShell
        title={copy.crop.missing}
        footer={<Button onClick={goBack}>{copy.cta.back}</Button>}
      >
        <p>{copy.crop.missingBody}</p>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      eyebrow={copy.crop.eyebrow}
      title={copy.crop.title}
      onBack={goBack}
      footer={
        <Button
          onClick={() => {
            if (!area) return;
            setCropPixels(area);
            go('avatarPreview');
          }}
        >
          {copy.cta.usePhoto}
        </Button>
      }
    >
      <div className="relative h-[min(70vw,360px)] w-full overflow-hidden rounded-[4px] border border-accent bg-black">
        <Cropper
          image={sourceImageUrl}
          crop={crop}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onComplete}
          objectFit="cover"
          restrictPosition
          showGrid={!avatarConfig.frameOverlayUrl}
          style={{
            containerStyle: { background: '#000' },
            cropAreaStyle: avatarConfig.frameOverlayUrl
              ? {
                  border: 'none',
                  backgroundImage: `url(${avatarConfig.frameOverlayUrl})`,
                  backgroundSize: '100% 100%',
                  color: 'rgba(10, 7, 24, 0.72)',
                }
              : undefined,
          }}
        />
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
        {copy.crop.zoom}
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="min-h-12 flex-1 accent-accent"
        />
        <span className="w-12 shrink-0 text-right font-oswald tabular-nums text-accent">
          {Math.round(zoom * 100)}%
        </span>
      </label>
      <Button variant="secondary" className="mt-3" onClick={reset}>
        {copy.crop.reset}
      </Button>
    </ScreenShell>
  );
}
