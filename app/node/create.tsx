import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Plus,
  Search,
  Users,
  Globe,
  Lock,
  Camera,
  Hexagon,
  ChevronRight,
  Sparkles,
} from "lucide-react-native";

export default function CreateNodeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [nodeName, setNodeName] = useState("");
  const [nodeDescription, setNodeDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [inviteCode, setInviteCode] = useState("");

  // Sample discoverable nodes
  const discoverableNodes = [
    {
      id: "d1",
      name: "Tech Enthusiasts",
      members: 12500,
      description: "Discuss the latest in technology",
      color: "#2196F3",
    },
    {
      id: "d2",
      name: "Creative Designers",
      members: 8200,
      description: "Share and critique design work",
      color: "#E91E63",
    },
    {
      id: "d3",
      name: "Startup Founders",
      members: 5400,
      description: "Network with entrepreneurs",
      color: "#4CAF50",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#2AABEE" }]}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Telegram Nodes</Text>
            <View style={styles.headerButton} />
          </View>
        </SafeAreaView>
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === "create" && styles.tabActive]}
          onPress={() => setActiveTab("create")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "create" && styles.tabTextActive,
            ]}
          >
            Create Node
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "join" && styles.tabActive]}
          onPress={() => setActiveTab("join")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "join" && styles.tabTextActive,
            ]}
          >
            Join Node
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "create" ? (
          // Create Node Tab
          <>
            {/* Node Avatar */}
            <View style={styles.avatarSection}>
              <TouchableOpacity style={styles.avatarPicker}>
                <View
                  style={[
                    styles.avatarPlaceholder,
                    { backgroundColor: "#2AABEE" },
                  ]}
                >
                  <Hexagon size={40} color="#fff" />
                </View>
                <View style={styles.cameraButton}>
                  <Camera size={16} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text style={styles.avatarHint}>Tap to add node icon</Text>
            </View>

            {/* Form */}
            <View
              style={[
                styles.formCard,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
            >
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Node Name</Text>
                <TextInput
                  style={[styles.formInput, { color: colors.text }]}
                  value={nodeName}
                  onChangeText={setNodeName}
                  placeholder="Enter node name"
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
                <Text style={styles.formLabel}>Description (optional)</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    styles.descInput,
                    { color: colors.text },
                  ]}
                  value={nodeDescription}
                  onChangeText={setNodeDescription}
                  placeholder="What's this node about?"
                  placeholderTextColor="#8a8a8a"
                  multiline
                />
              </View>
            </View>

            {/* Visibility */}
            <Text style={styles.sectionTitle}>Visibility</Text>
            <View
              style={[
                styles.formCard,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
            >
              <TouchableOpacity
                style={styles.visibilityOption}
                onPress={() => setIsPublic(true)}
              >
                <Globe size={22} color={isPublic ? "#2AABEE" : "#8a8a8a"} />
                <View style={styles.visibilityText}>
                  <Text
                    style={[styles.visibilityTitle, { color: colors.text }]}
                  >
                    Public
                  </Text>
                  <Text style={styles.visibilityDesc}>
                    Anyone can find and join this node
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    isPublic && styles.radioButtonActive,
                  ]}
                />
              </TouchableOpacity>

              <View
                style={[
                  styles.divider,
                  { backgroundColor: isDark ? "#3a3a3a" : "#eee" },
                ]}
              />

              <TouchableOpacity
                style={styles.visibilityOption}
                onPress={() => setIsPublic(false)}
              >
                <Lock size={22} color={!isPublic ? "#2AABEE" : "#8a8a8a"} />
                <View style={styles.visibilityText}>
                  <Text
                    style={[styles.visibilityTitle, { color: colors.text }]}
                  >
                    Private
                  </Text>
                  <Text style={styles.visibilityDesc}>
                    Only people with invite link can join
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    !isPublic && styles.radioButtonActive,
                  ]}
                />
              </TouchableOpacity>
            </View>

            {/* Create Button */}
            <TouchableOpacity
              style={[
                styles.createButton,
                !nodeName.trim() && styles.createButtonDisabled,
              ]}
              disabled={!nodeName.trim()}
              onPress={() =>
                router.push({
                  pathname: "/node/setup",
                  params: {
                    name: nodeName,
                    description: nodeDescription,
                    isPublic: isPublic.toString(),
                  },
                })
              }
            >
              <Plus size={20} color="#fff" />
              <Text style={styles.createButtonText}>Create Node</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Join Node Tab
          <>
            {/* Invite Code */}
            <View
              style={[
                styles.formCard,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
            >
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Invite Link or Code</Text>
                <TextInput
                  style={[styles.formInput, { color: colors.text }]}
                  value={inviteCode}
                  onChangeText={setInviteCode}
                  placeholder="t.me/+abc123 or paste code"
                  placeholderTextColor="#8a8a8a"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.joinButton,
                !inviteCode.trim() && styles.joinButtonDisabled,
              ]}
              disabled={!inviteCode.trim()}
            >
              <Text style={styles.joinButtonText}>Join Node</Text>
            </TouchableOpacity>

            {/* Discover */}
            <View style={styles.discoverSection}>
              <View style={styles.discoverHeader}>
                <Sparkles size={18} color="#2AABEE" />
                <Text style={[styles.discoverTitle, { color: colors.text }]}>
                  Discover Popular Nodes
                </Text>
              </View>

              {discoverableNodes.map((node) => (
                <TouchableOpacity
                  key={node.id}
                  style={[
                    styles.discoverCard,
                    { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
                  ]}
                >
                  <View
                    style={[
                      styles.discoverAvatar,
                      { backgroundColor: node.color },
                    ]}
                  >
                    <Text style={styles.discoverInitials}>
                      {node.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.discoverInfo}>
                    <Text style={[styles.discoverName, { color: colors.text }]}>
                      {node.name}
                    </Text>
                    <Text style={styles.discoverDesc} numberOfLines={1}>
                      {node.description}
                    </Text>
                    <View style={styles.discoverMeta}>
                      <Users size={12} color="#8a8a8a" />
                      <Text style={styles.discoverMembers}>
                        {node.members.toLocaleString()} members
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#8a8a8a" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

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
    width: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#2AABEE",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8a8a8a",
  },
  tabTextActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 12,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarPicker: {
    position: "relative",
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2AABEE",
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
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
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
  descInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  divider: {
    height: 1,
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  visibilityOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  visibilityText: {
    flex: 1,
  },
  visibilityTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  visibilityDesc: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 2,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#8a8a8a",
  },
  radioButtonActive: {
    borderColor: "#2AABEE",
    backgroundColor: "#2AABEE",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2AABEE",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  joinButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2AABEE",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  joinButtonDisabled: {
    opacity: 0.5,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  discoverSection: {
    marginTop: 24,
  },
  discoverHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  discoverTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  discoverCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  discoverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  discoverInitials: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  discoverInfo: {
    flex: 1,
    marginLeft: 12,
  },
  discoverName: {
    fontSize: 15,
    fontWeight: "600",
  },
  discoverDesc: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 2,
  },
  discoverMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  discoverMembers: {
    fontSize: 12,
    color: "#8a8a8a",
  },
});
