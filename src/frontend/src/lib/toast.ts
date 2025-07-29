import { toast } from "sonner";

type Variant = "success" | "error" | "info" | "warning";

const styleMap: Record<Variant, React.CSSProperties> = {
  success: {
    backgroundColor: "#059669", // bg-emerald-600
    color: "#fff",
  },
  error: {
    backgroundColor: "#dc2626", // bg-red-600
    color: "#fff",
  },
  info: {
    backgroundColor: "#2563eb", // bg-blue-600
    color: "#fff",
  },
  warning: {
    backgroundColor: "#FEC02B", // bg-blue-600
    color: "#000",
  },
};

export function notify(message: string, variant: Variant = "info") {
  toast(message, {
    style: styleMap[variant],
    duration: variant === "success" ? 2000 : 2500,
  });
}
