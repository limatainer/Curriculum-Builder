import { RemoveButton } from "./RemoveButton";

interface EntryHeaderProps {
  label: string;
  index: number;
  removeLabel: string;
  onRemove: () => void;
}

export function EntryHeader({ label, index, removeLabel, onRemove }: EntryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-eyebrow uppercase text-ink-muted">
        {label} {index + 1}
      </span>
      <RemoveButton label={removeLabel} onClick={onRemove} />
    </div>
  );
}
