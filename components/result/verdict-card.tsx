import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function VerdictCard() {
  return (
    <View className="mt-8 rounded-2xl bg-card-light p-5 border border-gray-100 shadow-soft">
      <View className="flex-row items-center gap-5">
        <View className="w-14 h-14 rounded-xl bg-primary items-center justify-center shadow-glow">
          <MaterialIcons name="delete-outline" size={30} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-text-secondary-light text-sm uppercase font-medium">
            Disposition
          </Text>
          <Text className="text-xl font-bold text-text-main-light">
            Yellow Recycle Bin
          </Text>
        </View>

        <MaterialIcons name="info-outline" size={24} color="#cbd5e1" />
      </View>
    </View>
  );
}
