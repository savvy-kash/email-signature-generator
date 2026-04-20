import { useRef } from "react";
import FormField from "../FormField.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import StepHeader from "../StepHeader.jsx";
import SwitchRow from "../SwitchRow.jsx";

export default function ImagesStep({ data, onChange }) {
  const inputRef = useRef(null);

  const set = (key) => (value) => onChange({ ...data, [key]: value });

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => set("photo")(reader.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <StepHeader
        step="2"
        title="Signature image"
        subtitle="Upload a headshot or company logo. Square works best; we'll preserve aspect ratio."
      />

      <div className="space-y-6">
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-card px-6 py-12 text-center transition-colors hover:border-foreground"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border bg-background text-foreground">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Drag and drop your image here
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              or click to browse (PNG, JPG, GIF up to 10MB)
            </div>
          </div>
          {data.photo && (
            <img
              src={data.photo}
              alt="preview"
              className="mt-2 h-16 w-16 rounded-md border object-cover"
            />
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            or use a URL
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <FormField id="photo-url" label="Image URL">
          <Input
            id="photo-url"
            value={
              data.photo && data.photo.startsWith("data:") ? "" : data.photo || ""
            }
            onChange={(e) => set("photo")(e.target.value)}
            placeholder="https://..."
          />
        </FormField>

        {data.photo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => set("photo")("")}
            className="text-muted-foreground"
          >
            Remove image
          </Button>
        )}

        <SwitchRow
          id="tight-photo"
          label="Hide gap between image and text"
          description="Remove the padding between the photo and the signature content"
          checked={Boolean(data.tightPhoto)}
          onCheckedChange={(v) => set("tightPhoto")(v)}
        />
      </div>
    </div>
  );
}
