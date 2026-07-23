import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-forge.local"),
  title: "AI Forge — Abraham OS",
  description:
    "Centro operativo local-first para proyectos, agentes, Skills, Git y workflows multi-IA.",
  openGraph: {
    title: "AI Forge — Abraham OS",
    description:
      "Tu fábrica de IAs: proyectos, operadores, Skills y auditoría en una sola cabina.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
