import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Map", icon: "map", path: "/map" },
    { label: "Learn", icon: "school", path: "/learn" },
    { label: "Profile", icon: "person", path: "/profile" },
  ];

  return (
    <View className="absolute bottom-0 w-full bg-white border-t border-slate-200 pb-6 pt-2 px-6 flex-row justify-between">
      {tabs.map((tab) => {
        const active = pathname === tab.path;

        return (
          <TouchableOpacity
            key={tab.path}
            onPress={() => router.push(tab.path as any)}
            className="items-center gap-1"
          >
            <MaterialIcons
              name={tab.icon as any}
              size={26}
              color={active ? "#2ecc70" : "#94a3b8"}
            />
            <Text
              className={`text-[10px] ${
                active ? "text-primary" : "text-slate-400"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
