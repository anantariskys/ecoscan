import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "@/components/header";
import ResultImage from "@/components/result/result-img";
import ImpactCard from "@/components/result/impact-card";
import InstructionStep from "@/components/result/intructions-step";

/* ================= CONFIG ================= */

const HF_TOKEN = process.env.EXPO_PUBLIC_HF_API_KEY ?? "";
const HF_CHAT_API = process.env.EXPO_PUBLIC_HF_API_CHAT_URL ?? "";
const HF_MODEL = "zai-org/GLM-4.7:novita";

/* ================= TYPES ================= */

type AIRecycleResult = {
  waste_type: "plastic" | "paper" | "metal" | "glass" | "organic";
  recyclable: boolean;
  instructions: {
    step: number;
    title: string;
    description: string;
  }[];
};

/* ================= PAGE ================= */

export default function ResultPage() {
  const { image, label, confidence } = useLocalSearchParams<{
    image?: string;
    label?: string;
    confidence?: string;
  }>();

  const router = useRouter();

  const [aiData, setAiData] = useState<AIRecycleResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  useEffect(() => {
    if (!label) return;

    async function fetchRecycleInfo() {
      try {
        setLoadingAI(true);
        setErrorAI(null);

        const res = await fetch(HF_CHAT_API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: HF_MODEL,
            messages: [
              {
                role: "system",
                content:
                  "You are a waste management expert. Respond ONLY with valid JSON.",
              },
              {
                role: "user",
                content: `Item name: "${label}"

Return ONLY JSON:
{
  "waste_type": "plastic | paper | metal | glass | organic",
  "recyclable": boolean,
  "instructions": [
    { "step": number, "title": string, "description": string }
  ]
}`,
              },
            ],
            temperature: 0.2,
          }),
        });

        const raw = await res.text();
        console.log("AI RAW:", raw);

        if (!res.ok) throw new Error(raw);

        const parsed = JSON.parse(raw);
        const content = parsed?.choices?.[0]?.message?.content;

        const match = content?.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("Invalid AI JSON");

        setAiData(JSON.parse(match[0]));
      } catch (err: any) {
        console.warn("AI failed:", err.message);
        setErrorAI("Unable to generate recycling instructions.");
      } finally {
        setLoadingAI(false);
      }
    }

    fetchRecycleInfo();
  }, [label]);

  return (
    <View className="flex-1 bg-background-light">
      <Header title="Analysis Complete" showBack />

      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 170 }}
      >
        {/* IMAGE */}
        {image && <ResultImage uri={image} />}

        {/* TITLE */}
        <View className="mt-6 items-center gap-3">
          <Text className="text-3xl font-bold text-text-main-light text-center">
            {label ?? "Unknown Item"}
          </Text>

          {/* BADGES */}
          <View className="flex-row flex-wrap gap-2 justify-center">
            {aiData?.recyclable && (
              <Badge
                icon="recycling"
                text="Recyclable"
                bg="bg-green-100"
                color="#2ecc70"
              />
            )}

            {aiData?.waste_type && (
              <Badge
                icon="category"
                text={aiData.waste_type.toUpperCase()}
                bg="bg-blue-100"
                color="#3b82f6"
              />
            )}

            {confidence && (
              <Badge
                icon="check-circle"
                text={`${confidence}% Match`}
                bg="bg-gray-100"
                color="#568f6e"
              />
            )}
          </View>
        </View>

        {/* HOW TO RECYCLE */}
        <View className="mt-10 bg-white rounded-2xl p-5 shadow-sm">
          <Text className="text-lg font-bold text-text-main-light mb-4">
            How to Recycle
          </Text>

          {loadingAI && (
            <Text className="text-gray-400 italic">
              Generating instructions...
            </Text>
          )}

          {errorAI && <Text className="text-red-500">{errorAI}</Text>}

          {aiData && (
            <View className="gap-1">
              {aiData.instructions.map((step) => (
                <InstructionStep
                  key={step.step}
                  icon="arrow-right"
                  title={step.title}
                  description={step.description}
                  color="green"
                  step={step.step}
                />
              ))}
            </View>
          )}
        </View>

        <View className="mt-8">
          <ImpactCard />
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 bg-background-light px-4 pt-6 pb-8">
        <TouchableOpacity
          onPress={() => router.replace("/")}
          activeOpacity={0.9}
          className="h-14 rounded-2xl bg-primary flex-row items-center justify-center gap-2"
        >
          <MaterialIcons name="center-focus-weak" size={24} color="white" />
          <Text className="text-white font-bold text-lg">Scan Next Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= UI HELPERS ================= */

function Badge({
  icon,
  text,
  bg,
  color,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  bg: string;
  color: string;
}) {
  return (
    <View
      className={`flex-row items-center gap-1 px-3 py-1 rounded-full ${bg}`}
    >
      <MaterialIcons name={icon} size={16} color={color} />
      <Text className="text-sm font-medium text-gray-700">{text}</Text>
    </View>
  );
}
