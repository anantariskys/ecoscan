import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
};

export default function Header({
  title = "EcoScan",
  showBack = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-6 pt-12 pb-4 bg-background-light">
      {/* Left */}
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={22}
            color="#0f1a14"
          />
        </TouchableOpacity>
      ) : (
        <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
          <MaterialIcons name="eco" size={24} color="#2ecc70" />
        </View>
      )}

      {/* Title */}
      <Text className="text-xl font-bold text-slate-900 flex-1 text-center">
        {title}
      </Text>

      {/* Right */}
      {!showBack ? (
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
          <MaterialIcons name="settings" size={24} color="#64748b" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" /> // spacer biar title tetap center
      )}
    </View>
  );
}
