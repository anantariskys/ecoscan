import { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

/**
 * 🔑 GANTI DENGAN TOKEN HUGGING FACE KAMU
 */
const HF_API_KEY = process.env.EXPO_PUBLIC_HF_API_KEY;
const HF_MODEL = process.env.EXPO_PUBLIC_HF_MODEL;
type ScanResult = {
  category: string;
  description: string;
  processing: string;
  confidence: number;
};

export default function Index() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  // 📸 Ambil foto sampah
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Izin kamera ditolak");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      base64: true,
    });

    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
      setImageBase64(res.assets[0].base64 || null);
      setResult(null);
    }
  };

  // 🧠 Scan pakai ML Hugging Face
const scanWaste = async () => {
  console.log("=== SCAN START ===");

  if (!imageUri) {
    console.log("❌ imageUri kosong");
    return;
  }

  setLoading(true);

  try {
    console.log("📸 Image URI:", imageUri);

    // 1. Ambil image jadi blob
    const imgRes = await fetch(imageUri);
    console.log("🖼️ Image fetch status:", imgRes.status);

    const blob = await imgRes.blob();
    console.log("📦 Blob size:", blob.size);
    console.log("📦 Blob type:", blob.type);

    // 2. Kirim ke Hugging Face
    console.log("🚀 Sending request to HF...");
    console.log("🔗 HF_MODEL:", HF_MODEL);

    if (!HF_MODEL) {
      throw new Error("HF_MODEL is undefined");
    }
    const hfRes = await fetch(HF_MODEL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/octet-stream",
      },
      body: blob,
    });

    console.log("🌐 HF status:", hfRes.status);
    console.log("🌐 HF ok:", hfRes.ok);

    // 3. Ambil response TEXT dulu
    const rawText = await hfRes.text();
    console.log("📨 HF RAW RESPONSE ↓↓↓");
    console.log(rawText);
    console.log("📨 HF RAW RESPONSE ↑↑↑");

    // 4. Coba parse JSON
    const predictions = JSON.parse(rawText);
    console.log("✅ Parsed JSON:", predictions);

    if (!Array.isArray(predictions)) {
      console.log("❌ Response bukan array");
      throw new Error("HF response bukan array");
    }

    const top = predictions[0];
    console.log("🏆 Top prediction:", top);

    const mapped = mapWaste(top.label, top.score);
    console.log("♻️ Mapped result:", mapped);

    setResult(mapped);
  } catch (error) {
    console.log("🔥 SCAN ERROR:", error);
    Alert.alert("Gagal memindai sampah");
  }

  setLoading(false);
  console.log("=== SCAN END ===");
};



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>EcoScan ♻️</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <View style={styles.button}>
        <Button title="Ambil Foto Sampah" onPress={takePhoto} />
      </View>

      {imageUri && (
        <View style={styles.button}>
          <Button title="Scan Sampah" onPress={scanWaste} />
        </View>
      )}

      {loading && <ActivityIndicator size="large" />}

      {result && (
        <View style={styles.card}>
          <Text style={styles.label}>{result.category}</Text>
          <Text style={styles.confidence}>
            Akurasi: {(result.confidence * 100).toFixed(1)}%
          </Text>

          <Text style={styles.text}>{result.description}</Text>

          <Text style={styles.subtitle}>Cara Mengolah:</Text>
          <Text style={styles.text}>{result.processing}</Text>
        </View>
      )}
    </ScrollView>
  );
}

/**
 * 🧾 Mapping hasil ML → kategori sampah
 */
function mapWaste(label: string, score: number): ScanResult {
  const l = label.toLowerCase();

  if (l.includes("plastic") || l.includes("bottle")) {
    return {
      category: "Plastik",
      confidence: score,
      description:
        "Sampah plastik sulit terurai dan dapat mencemari lingkungan.",
      processing:
        "Cuci bersih, keringkan, lalu setorkan ke bank sampah atau daur ulang.",
    };
  }

  if (l.includes("paper") || l.includes("cardboard")) {
    return {
      category: "Kertas",
      confidence: score,
      description: "Sampah kertas mudah didaur ulang.",
      processing:
        "Pisahkan dari sampah basah dan kumpulkan untuk didaur ulang.",
    };
  }

  if (l.includes("glass")) {
    return {
      category: "Kaca",
      confidence: score,
      description: "Sampah kaca dapat didaur ulang.",
      processing:
        "Kumpulkan secara terpisah dan kirim ke tempat daur ulang kaca.",
    };
  }

  if (l.includes("can") || l.includes("metal")) {
    return {
      category: "Logam",
      confidence: score,
      description: "Sampah logam bernilai tinggi untuk daur ulang.",
      processing:
        "Bersihkan dan kumpulkan untuk didaur ulang di pengepul logam.",
    };
  }

  return {
    category: "Tidak Diketahui",
    confidence: score,
    description:
      "Jenis sampah belum dapat dikenali dengan pasti oleh sistem.",
    processing:
      "Pisahkan dan konsultasikan ke pengelola sampah setempat.",
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    marginVertical: 6,
  },
  card: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#e6f5ea",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  confidence: {
    fontSize: 12,
    marginBottom: 8,
    color: "#555",
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
});
