import { useId } from "react";
import { Label } from "@/components/ui/label";
import { FIELD_BASE } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}

export function Field({ label, value, onChange, multiline = false }: FieldProps) {
  const id = useId();
  const cls = cn(FIELD_BASE, "w-full resize-none py-1.5 text-sm");

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <textarea
          id={id}
          className={cls}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input id={id} className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
