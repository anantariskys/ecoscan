import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImpactCard() {
  return (
    <View className="mt-8 mb-6 rounded-xl bg-[#131f18] p-4 shadow-lg">
      <View className="flex-row items-center gap-3">
        <MaterialIcons name="eco" size={20} color="#2ecc70" />
        <View>
          <Text className="text-xs text-gray-400 uppercase font-medium">
            Impact
          </Text>
          <Text className="text-sm text-white font-medium">
            Recycling this saves approx{" "}
            <Text className="text-primary font-bold">0.12kg CO₂</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
