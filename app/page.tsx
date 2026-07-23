import type { Metadata } from "next";
import { ForgeDashboard } from "./forge-dashboard";

export const metadata: Metadata = {
  title: "Centro de mando | AI Forge",
  description:
    "Panel de misión para coordinar proyectos, agentes, Skills, Git y el puente MCP local de Abraham OS.",
};

export default function Home() {
  return <ForgeDashboard />;
}
