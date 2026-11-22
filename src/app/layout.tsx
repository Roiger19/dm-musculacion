import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Raleway } from "next/font/google";
import { perfil } from "@/data/perfil";
import { site } from "@/data/site";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.marca} — ${perfil.nombreCorto}, ${perfil.rol}`;

export const metadata: Metadata = {
  ...(site.dominio ? { metadataBase: new URL(site.dominio) } : {}),
  title,
  description: site.descripcion,
  applicationName: site.marca,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.marca,
    title,
    description: site.descripcion,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#172421",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nombre,
  jobTitle: perfil.rol,
  workLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: perfil.zona.ciudad,
      addressRegion: perfil.zona.provincia,
      addressCountry: perfil.zona.pais,
    },
  },
  brand: { "@type": "Brand", name: site.marca, slogan: site.eslogan },
  sameAs: [site.redes.instagram.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${montserrat.variable} ${raleway.variable} ${inter.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
