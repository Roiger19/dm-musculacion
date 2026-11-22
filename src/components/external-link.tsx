import type { ComponentPropsWithoutRef } from "react";

const ALLOWED_HOSTS = new Set(["wa.me", "www.instagram.com", "instagram.com", "www.linkedin.com"]);

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel"> & {
  href: string;
};

/** Único punto de salida a sitios externos: https, host permitido y sin tabnabbing. */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const url = new URL(href);
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) {
    throw new Error(`Enlace externo no permitido: ${href}`);
  }
  return (
    <a {...rest} href={url.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
