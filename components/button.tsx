import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: "primary" | "secondary";
};

export default function Button({
  title,
  icon,
  variant = "primary",
  ...props
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className={`h-16 rounded-2xl flex-row items-center justify-center gap-2 ${
        isPrimary
          ? "bg-primary"
          : "bg-white border border-slate-200"
      }`}
      {...props}   // ← 🔥 INI KUNCI
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isPrimary ? "white" : "#2ecc70"}
      />
      <Text
        className={`font-bold ${
          isPrimary ? "text-white text-lg" : "text-slate-700 text-sm"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
