import { sx } from '@/lib/site/sx';

type LogoProps = {
  size?: number;
  fontSize?: number;
  radius?: number;
};

export function LogoMark({
  size = 38,
  fontSize = 16,
  radius = 9,
}: LogoProps) {
  return (
    <span
      style={sx(
        `width:${size}px;height:${size}px;border-radius:${radius}px;background:#fff;color:var(--c-p);display:flex;align-items:center;justify-content:center;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:${fontSize}px`,
      )}
    >
      DR
    </span>
  );
}
