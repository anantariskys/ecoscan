import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HF_TOKEN = process.env.EXPO_PUBLIC_HF_API_KEY!;

const HF_API_URL =
  "https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224";

export default function ScanPage() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requestPermission();
  }, []);

  async function handleScan() {
    if (!cameraRef.current || loading) return;

    try {
      setLoading(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      const resized = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 224, height: 224 } }],
        { base64: true }
      );

      const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: resized.base64,
        }),
      });

      const raw = await response.text();
      console.log("HF RAW:", raw);

      if (!response.ok) {
        throw new Error(raw);
      }

      const result = JSON.parse(raw);

      if (!Array.isArray(result) || result.length === 0) {
        throw new Error("Invalid HF response");
      }

      const top = result[0];

      router.push({
        pathname: "/result",
        params: {
          image: photo.uri,
          label: top.label,
          confidence: Math.round(top.score * 100).toString(),
        },
      });
    } catch (err: any) {
      console.warn("Scan failed:", err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Camera permission required</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
      />

      <View className="absolute bottom-10 w-full px-6">
        <TouchableOpacity
          disabled={!cameraReady || loading}
          onPress={handleScan}
          activeOpacity={0.9}
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-white font-bold text-lg">
            {loading ? "Analyzing..." : "Scan Waste"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
