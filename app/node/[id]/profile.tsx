import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { ArrowLeft, Camera, Check } from "lucide-react-native";
import { SAMPLE_NODES } from "@/types/node";

export default function NodeProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

  const [name, setName] = useState(node.myProfile?.name || "Gifty Kapula");
  const [bio, setBio] = useState(node.myProfile?.bio || "");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?u=gifty");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: node.color }]}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Node Profile</Text>
            <TouchableOpacity style={styles.headerButton}>
              <Check size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={[styles.cameraButton, { backgroundColor: node.color }]}
            >
              <Camera size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>
            This profile is only visible within this Node
          </Text>
        </View>

        {/* Form */}
        <View
          style={[
            styles.formCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Display Name</Text>
            <TextInput
              style={[styles.formInput, { color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name for this Node"
              placeholderTextColor="#8a8a8a"
            />
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: isDark ? "#3a3a3a" : "#eee" },
            ]}
          />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Bio</Text>
            <TextInput
              style={[
                styles.formInput,
                styles.bioInput,
                { color: colors.text },
              ]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell others about yourself in this Node"
              placeholderTextColor="#8a8a8a"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Info Card */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            About Node Profiles
          </Text>
          <Text style={styles.infoText}>
            Your Node profile is separate from your main Telegram account. Other
            members in this Node will see this name and avatar instead of your
            main profile.
          </Text>
          <Text style={[styles.infoText, { marginTop: 8 }]}>
            This helps you maintain different identities for work, hobbies, or
            different communities while keeping your main account private.
          </Text>
        </View>

        {/* Current Role */}
        <View
          style={[
            styles.roleCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <Text style={[styles.roleLabel, { color: colors.text }]}>
            Your Role
          </Text>
          <View style={[styles.roleBadge, { backgroundColor: node.color }]}>
            <Text style={styles.roleText}>
              {node.myRole.charAt(0).toUpperCase() + node.myRole.slice(1)}
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarHint: {
    marginTop: 12,
    fontSize: 13,
    color: "#8a8a8a",
  },
  formCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  formGroup: {
    padding: 16,
  },
  formLabel: {
    fontSize: 13,
    color: "#8a8a8a",
    marginBottom: 8,
    fontWeight: "500",
  },
  formInput: {
    fontSize: 16,
    padding: 0,
  },
  bioInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  divider: {
    height: 1,
    marginLeft: 16,
  },
  infoCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#8a8a8a",
    lineHeight: 20,
  },
  roleCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roleLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
