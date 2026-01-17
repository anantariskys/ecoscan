import { View, Image } from "react-native";

export default function ResultImage({ uri }: { uri: string }) {
  return (
    <View className="mt-4 w-full aspect-square rounded-2xl overflow-hidden shadow-soft">
      <Image
        source={{
          uri,
        }}
        resizeMode="cover"
        className="w-full h-full"
      />
    </View>
  );
}
