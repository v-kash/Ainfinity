import {
  BrainCircuit, Camera, ChartColumnIncreasing, Database, Layers, Mail, MessageCircleMore,
  MonitorSmartphone, PenTool, Smartphone, Zap, type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/lib/services";

const map: Record<IconName, ComponentType<LucideProps>> = {
  web: MonitorSmartphone,
  mobile: Smartphone,
  marketing: ChartColumnIncreasing,
  branding: PenTool,
  video: Camera,
  email: Mail,
  ai: BrainCircuit,
  whatsapp: MessageCircleMore,
  software: Layers,
  data: Database,
  transform: Zap,
};

export function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon strokeWidth={1.5} {...props} />;
}
