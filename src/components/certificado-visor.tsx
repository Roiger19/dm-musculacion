"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  titulo: string;
  imagen: { src: string; width: number; height: number };
  /** "miniatura": la imagen es el disparador. "enlace": texto "Ver certificado". */
  variante: "miniatura" | "enlace";
};

/**
 * Visor de certificado con <dialog> nativo: foco atrapado, Escape y fondo
 * inerte los resuelve el navegador. La imagen grande se monta solo al abrir.
 */
export function CertificadoVisor({ titulo, imagen, variante }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const alt = `Certificado: ${titulo} (firmas difuminadas)`;

  function abrir() {
    setAbierto(true);
    ref.current?.showModal();
  }

  return (
    <>
      {variante === "miniatura" ? (
        <button
          type="button"
          onClick={abrir}
          aria-label={`Ampliar certificado: ${titulo}`}
          className="group block w-full overflow-hidden rounded-lg border border-carbon/15 bg-blanco transition-transform duration-150 ease-out-strong active:scale-[0.98]"
        >
          <Image
            src={imagen.src}
            width={imagen.width}
            height={imagen.height}
            sizes="(min-width: 768px) 480px, 100vw"
            alt={alt}
            className="h-auto w-full transition-transform duration-300 ease-out-strong group-hover:scale-[1.02]"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={abrir}
          className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold"
        >
          <span className="link-grow">Ver certificado</span>
        </button>
      )}

      <dialog
        ref={ref}
        aria-label={`Certificado: ${titulo}`}
        onClose={() => setAbierto(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        className="certificado-dialog m-auto max-h-none max-w-none overflow-visible bg-transparent p-0"
        // Entra entero en pantalla: limita el ancho por el alto disponible (imagen + pie ≈ 7rem).
        style={{ width: `min(calc(100vw - 2rem), 1000px, calc((100dvh - 7rem) * ${(imagen.width / imagen.height).toFixed(3)}))` }}
      >
        <div className="rounded-xl bg-blanco p-2 sm:p-3">
          {abierto && (
            <Image
              src={imagen.src}
              width={imagen.width}
              height={imagen.height}
              sizes="(min-width: 1032px) 1000px, calc(100vw - 2rem)"
              alt={alt}
              className="h-auto w-full rounded-lg"
            />
          )}
          <div className="flex items-center justify-between gap-4 px-1 pt-3 pb-1">
            <p className="font-display text-sm font-semibold text-carbon sm:text-base">{titulo}</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-carbon px-5 font-display text-sm font-semibold text-blanco transition-transform duration-150 ease-out-strong active:scale-[0.97]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
