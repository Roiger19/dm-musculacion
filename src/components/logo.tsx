import Image from "next/image";

/**
 * Variantes de public/brand/ (dm-branding §4):
 * carbon → fondos blanco o menta · blanco/menta → fondo carbón o scrim carbón.
 */
type Color = "carbon" | "blanco" | "menta";
type Kind = "logo" | "monograma";

const SIZES: Record<Kind, { width: number; height: number }> = {
  logo: { width: 880, height: 656 },
  monograma: { width: 696, height: 448 },
};

type Props = {
  kind?: Kind;
  color: Color;
  /** Ancho CSS de referencia para `sizes` (el logo es nítido hasta ~440 px). */
  sizes: string;
  className?: string;
  alt?: string;
  preload?: boolean;
};

export function Logo({ kind = "logo", color, sizes, className, alt, preload }: Props) {
  const { width, height } = SIZES[kind];
  return (
    <Image
      src={`/brand/dm-${kind}-${color}.png`}
      width={width}
      height={height}
      sizes={sizes}
      alt={alt ?? (kind === "logo" ? "DM Musculación — Fuerza y Disciplina" : "DM Musculación")}
      className={className}
      preload={preload}
    />
  );
}
