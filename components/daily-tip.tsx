import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function DailyTip() {
  return (
    <View className="bg-white rounded-2xl p-5 flex-row gap-4 border border-slate-100">
      <View className="w-10 h-10 rounded-full bg-yellow-100 items-center justify-center">
        <MaterialIcons name="lightbulb" size={20} color="#ca8a04" />
      </View>

      <View className="flex-1">
        <Text className="text-xs font-bold uppercase text-slate-400">
          Daily Fact
        </Text>
        <Text className="text-sm text-slate-700 mt-1">
          Pizza boxes are often not recyclable due to grease. Compost the greasy
          parts instead!
        </Text>
      </View>
    </View>
  );
}
