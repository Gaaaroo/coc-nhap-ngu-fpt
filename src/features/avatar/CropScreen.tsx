import { useCallback, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { copy } from '../../config/copy.config';
import { Button } from '../../components/ui/Button';
import { ScreenShell } from '../../components/ui/ScreenShell';
import { useSession } from '../../store/session.store';

export function CropScreen() {
  const sourceImageUrl = useSession((s) => s.sourceImageUrl);
  const setCropPixels = useSession((s) => s.setCropPixels);
  const go = useSession((s) => s.go);
  const goBack = useSession((s) => s.goBack);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);

  const onComplete = useCallback((_: Area, pixels: Area) => {
    setArea(pixels);
  }, []);

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
      <div className="relative h-[min(70vw,360px)] w-full overflow-hidden rounded-[4px] border border-brass bg-black">
        <Cropper
          image={sourceImageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onComplete}
          objectFit="contain"
          style={{
            containerStyle: { background: '#000' },
          }}
        />
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
        {copy.crop.zoom}
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="min-h-12 flex-1 accent-brass"
        />
      </label>
    </ScreenShell>
  );
}
