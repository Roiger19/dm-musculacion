import type { ReactNode } from "react";
import { whatsappUrl, type WhatsappPlacement } from "@/data/whatsapp";
import { ExternalLink } from "./external-link";
import { WhatsappIcon } from "./icons";

/**
 * Combinaciones válidas según la tabla de contraste (dm-branding §1):
 * - esmeralda: texto carbón (6.50:1), para fondos carbón o blanco.
 * - carbon:    texto menta (10.90:1), para fondos blanco.
 * - carbon-blanco: texto blanco (16.02:1), para fondos menta.
 */
const VARIANTS = {
  esmeralda: "bg-esmeralda text-carbon hover:bg-menta",
  carbon: "bg-carbon text-menta hover:text-blanco",
  "carbon-blanco": "bg-carbon text-blanco hover:text-menta",
} as const;

type Props = {
  placement: WhatsappPlacement;
  variant?: keyof typeof VARIANTS;
  children?: ReactNode;
  className?: string;
  id?: string;
};

export function WhatsappButton({
  placement,
  variant = "esmeralda",
  children = "Escribime por WhatsApp",
  className = "",
  id,
}: Props) {
  return (
    <ExternalLink
      id={id}
      href={whatsappUrl(placement)}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 font-display text-[0.95rem] font-semibold tracking-[0.01em] transition-[color,background-color,transform] duration-150 ease-out-strong active:scale-[0.97] active:duration-100 ${VARIANTS[variant]} ${className}`}
    >
      <WhatsappIcon className="size-5 shrink-0" />
      <span className="whitespace-nowrap">{children}</span>
      <span className="sr-only">(se abre WhatsApp en una pestaña nueva)</span>
    </ExternalLink>
  );
}
