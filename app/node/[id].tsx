import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import NodeChannelList from "@/components/NodeChannelList";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Settings, User } from "lucide-react-native";

export default function NodeScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Mock data based on ID
  const nodeName =
    id === "1" ? "Design Team" : id === "2" ? "Crypto Project" : "Family Node";
  const bannerImage = "https://picsum.photos/800/200";

  return (
    <View
      style={[styles.container, { backgroundColor: colors.nodeBackground }]}
    >
      <Header title={nodeName} />
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Image source={{ uri: bannerImage }} style={styles.banner} />
          <View
            style={[
              styles.nodeInfoOverlay,
              { backgroundColor: "rgba(0,0,0,0.3)" },
            ]}
          >
            <Text style={styles.nodeDescription}>
              Official workspace for the design team.
            </Text>
          </View>
        </View>

        <View
          style={[styles.profilePreview, { backgroundColor: colors.surface }]}
        >
          <View style={styles.profileRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=main" }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileText}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                My Node Profile
              </Text>
              <Text
                style={[styles.profileRole, { color: colors.tabIconDefault }]}
              >
                Lead Designer
              </Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Settings size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>
          </View>
        </View>

        <NodeChannelList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: 120,
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  nodeInfoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  nodeDescription: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  profilePreview: {
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileRole: {
    fontSize: 12,
  },
  editProfileButton: {
    padding: 8,
  },
});
