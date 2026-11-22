/** Única fuente del número y de los mensajes precargados (aprobados por el cliente). */

export type WhatsappPlacement = "hero" | "formacion" | "cierre" | "flotante";

/** Argentina, móvil: 54 + 9 + área 362 + 4885076. Solo dígitos, sin "+" ni "15". */
const WHATSAPP_NUMBER = "5493624885076";

if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  throw new Error("WHATSAPP_NUMBER inválido: usar formato internacional solo con dígitos");
}

const MESSAGES = {
  hero: "Hola Daniel, vi tu página DM Musculación y quiero información para empezar a entrenar.",
  formacion: "Hola Daniel, vi tu formación en la página y quiero consultarte por un entrenamiento.",
  cierre: "Hola Daniel, quiero consultarte por un plan de entrenamiento.",
  flotante: "Hola Daniel, vi tu página DM Musculación y quiero hacerte una consulta.",
} as const satisfies Record<WhatsappPlacement, string>;

/**
 * Recibe la ubicación del CTA, nunca texto libre: ningún componente puede
 * inyectar un mensaje no aprobado ni datos externos en la URL.
 */
export function whatsappUrl(placement: WhatsappPlacement): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGES[placement])}`;
}
