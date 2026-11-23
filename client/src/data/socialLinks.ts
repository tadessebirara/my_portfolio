
import {
  Mail,
  Linkedin,
  MessageCircle,
  Github,
  Send,
  Twitter,
  type LucideIcon,
} from "lucide-react";

export interface SocialLink {
  name: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  color: string;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    subtitle: "Formal Inquiries",
    href: "mailto:tadessebirara7@gmail.com",
    icon: Mail,
    color: "text-blue-400",
    external: false,
  },
  {
    name: "LinkedIn",
    subtitle: "B2B Network",
    href: "https://www.linkedin.com/in/your-profile",
    icon: Linkedin,
    color: "text-cyan-400",
    external: true,
  },
  {
    name: "WhatsApp",
    subtitle: "Instant Chat",
    href: "https://wa.me/251905653221",
    icon: MessageCircle,
    color: "text-emerald-400",
    external: true,
  },
  {
    name: "GitHub",
    subtitle: "Code Proof",
    href: "https://github.com/tadessebirara",
    icon: Github,
    color: "text-white",
    external: true,
  },
  {
    name: "Telegram",
    subtitle: "Direct Message",
    href: "https://t.me/@big_pecture",
    icon: Send,
    color: "text-sky-400",
    external: true,
  },
  {
    name: "X (Twitter)",
    subtitle: "Tech Community",
    href: "https://x.com/tadessebirara21",
    icon: Twitter,
    color: "text-white",
    external: true,
  },
];
