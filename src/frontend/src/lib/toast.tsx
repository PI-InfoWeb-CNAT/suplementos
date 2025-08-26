import { toast } from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

type Variant = "success" | "error" | "info" | "warning";

const styleMap: Record<Variant, React.CSSProperties> = {
  success: {
    backgroundColor: "#059669",
    color: "#fff",
    border: "none",
  },
  error: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
  },
  info: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
  },
  warning: {
    backgroundColor: "#FEC02B",
    color: "#000",
    border: "none",
  },
};

const iconMap: Record<Variant, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-white" />,
  error: <XCircle className="w-5 h-5 text-white" />,
  info: <Info className="w-5 h-5 text-white" />,
  warning: <AlertTriangle className="w-5 h-5 text-black" />,
};

export function notify(message: string, variant: Variant = "info") {
  toast(message, {
    icon: iconMap[variant],
    style: styleMap[variant],
    duration: variant === "success" ? 2000 : 2500,
  });
}