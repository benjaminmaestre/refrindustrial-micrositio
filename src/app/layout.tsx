import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refrindustrial | Refrigeración industrial",
  description:
    "Soluciones de ingeniería, instalación y mantenimiento para sistemas de refrigeración industrial y cadena de frío.",
  applicationName: "Refrindustrial",
  openGraph: {
    title: "Refrindustrial | Refrigeración industrial",
    description: "Ingeniería y soluciones para la cadena de frío.",
    type: "website",
    locale: "es_CO",
    images: ["/images/flyer-portada.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07131b"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
