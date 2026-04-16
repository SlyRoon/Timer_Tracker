import { useTranslation } from 'react-i18next';

const COLOR_OPTIONS = [
  '#047857',
  '#2563eb',
  '#be123c',
  '#7c3aed',
  '#ca8a04',
  '#0f766e',
];

interface ProjectColorFieldProps {
  color: string;
  disabled?: boolean;
  id: string;
  label: string;
  onColorChange: (color: string) => void;
}

export function ProjectColorField({
  color,
  disabled = false,
  id,
  label,
  onColorChange,
}: ProjectColorFieldProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="text-sm font-medium text-zinc-700" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input
          aria-label={label}
          className="h-11 w-14 cursor-pointer rounded-md border border-zinc-300 bg-white p-1 disabled:cursor-not-allowed"
          disabled={disabled}
          id={id}
          onChange={(event) => onColorChange(event.target.value)}
          type="color"
          value={color}
        />

        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((option) => {
            const isSelected = option.toLowerCase() === color.toLowerCase();

            return (
              <button
                aria-label={t('projects.useColor', { color: option })}
                className={[
                  'h-8 w-8 rounded-md border transition disabled:cursor-not-allowed',
                  isSelected
                    ? 'border-zinc-950 ring-2 ring-zinc-200'
                    : 'border-zinc-200 hover:border-zinc-400',
                ].join(' ')}
                disabled={disabled}
                key={option}
                onClick={() => onColorChange(option)}
                style={{ backgroundColor: option }}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
