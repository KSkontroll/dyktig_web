export function formatThousands(value: string | number | undefined): string {
  if (value === undefined || value === '') return '';
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
}

export function parseNumericInput(value: string): string {
  return value.replace(/\D/g, '');
}
