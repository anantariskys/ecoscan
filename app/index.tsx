import { View, Text, Image, ScrollView } from "react-native";
import Header from "@/components/header";
import Button from "@/components/button";
import DailyTip from "@/components/daily-tip";
import BottomNav from "@/components/bottom-nav"
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 bg-background-light">
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-6"
      >
        {/* Hero */}
        <View className="items-center pt-4 pb-8">
          <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-primary/10">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaEsHqBZDUcPkg0ZFBBQgJtu0mU5EJw-hTRI1evnU9JhvEtdkP_SEIWt0ebj9COHrnqCVMZfnYmI3DDZuHFTNXhvQziE03z-OWZiAkaYCx9YkrsrKuxA9X5TQgos-h9RwPFqeig7Zy18U9tL72zC7Bl_t0qGxvPq2YTgw8XasRjGBHtmLXfKCdML-3Ehp4aHwUXdbT4RW-10kkRim9p3oZmGsUb1LwVYIts3IfOhhMwkXreYfMcDk3hdXpA5xlM6IZKy467AT7h_4",
              }}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>

          <Text className="text-3xl font-bold text-center text-slate-900">
            Scan waste.{"\n"}
            <Text className="text-primary">Recycle smarter.</Text>
          </Text>

          <Text className="text-slate-500 text-sm text-center mt-3 max-w-[280px]">
            Point your camera at any item to instantly identify if it's recyclable,
            compostable, or trash.
          </Text>
        </View>

        {/* Actions */}
        <View className="gap-4 mb-10">
          <Link href="/scan"  asChild>
            <Button  title="Scan Waste" icon="photo-camera" />
          </Link>
        

          <Button
            title="Scan History"
            icon="history"
            variant="secondary"
          />
        </View>

        <DailyTip />
      </ScrollView>

      <BottomNav />
    </View>
  );
}
