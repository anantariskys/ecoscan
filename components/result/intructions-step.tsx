import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  step: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  color: "blue" | "orange" | "green";
};

const colorMap = {
  blue: { bg: "bg-blue-100", text: "#3b82f6" },
  orange: { bg: "bg-orange-100", text: "#f97316" },
  green: { bg: "bg-green-100", text: "#2ecc70" },
};

export default function InstructionStep({
  step,
  icon,
  title,
  description,
  color,
}: Props) {
  return (
    <View className="flex-row gap-4 mb-4">
      {/* STEP NUMBER */}
      <View className="items-center">
        <View
          className={`w-8 h-8 rounded-full ${colorMap[color].bg} items-center justify-center`}
        >
          <Text className="font-bold text-sm" style={{ color: colorMap[color].text }}>
            {step}
          </Text>
        </View>

        {/* LINE CONNECTOR */}
        <View className="flex-1 w-px bg-gray-200 mt-1" />
      </View>

      {/* CONTENT CARD */}
      <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <View className="flex-row items-center gap-2 mb-1">
          <MaterialIcons
            name={icon}
            size={18}
            color={colorMap[color].text}
          />
          <Text className="font-semibold text-text-main-light">
            {title}
          </Text>
        </View>

        <Text className="text-sm text-text-secondary-light leading-relaxed">
          {description}
        </Text>
      </View>
    </View>
  );
}
