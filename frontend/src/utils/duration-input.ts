export function formatDurationInput(minutes: number) {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  return `${hours}:${String(remainingMinutes).padStart(2, '0')}`;
}

export function parseDurationInput(value: string) {
  const normalizedValue = value.trim();
  const match = normalizedValue.match(/^(\d+):([0-5]\d)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
}
