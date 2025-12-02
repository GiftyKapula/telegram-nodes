import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Plus,
  Hash,
  Volume2,
  Video,
  Megaphone,
  Trash2,
  GripVertical,
  Check,
  Hexagon,
  ChevronRight,
  FolderPlus,
  Globe,
  Lock,
  Users,
  ChevronDown,
} from "lucide-react-native";

interface SetupChannel {
  id: string;
  name: string;
  type: "text" | "voice" | "video" | "announcement";
}

interface SetupCategory {
  id: string;
  name: string;
  channels: SetupChannel[];
}

export default function NodeSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  // Get passed data from create screen
  const nodeName = (params.name as string) || "New Node";
  const nodeDescription = (params.description as string) || "";
  const isPublic = params.isPublic === "true";
  const nodeColor = (params.color as string) || "#2AABEE";

  // Generate initials from node name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Default categories for a new node
  const [categories, setCategories] = useState<SetupCategory[]>([
    {
      id: "1",
      name: "General",
      channels: [
        { id: "c1", name: "welcome", type: "text" },
        { id: "c2", name: "general-chat", type: "text" },
        { id: "c3", name: "announcements", type: "announcement" },
      ],
    },
    {
      id: "2",
      name: "Voice Channels",
      channels: [
        { id: "c4", name: "General Voice", type: "voice" },
        { id: "c5", name: "Meeting Room", type: "video" },
      ],
    },
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddChannel, setShowAddChannel] = useState<string | null>(null);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<
    "text" | "voice" | "video" | "announcement"
  >("text");

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: SetupCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      channels: [],
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  const removeCategory = (categoryId: string) => {
    Alert.alert(
      "Delete Category",
      "This will delete the category and all its channels. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setCategories(categories.filter((c) => c.id !== categoryId)),
        },
      ]
    );
  };

  const addChannel = (categoryId: string) => {
    if (!newChannelName.trim()) return;
    const newChannel: SetupChannel = {
      id: Date.now().toString(),
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, "-"),
      type: newChannelType,
    };
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, channels: [...cat.channels, newChannel] }
          : cat
      )
    );
    setNewChannelName("");
    setNewChannelType("text");
    setShowAddChannel(null);
  };

  const removeChannel = (categoryId: string, channelId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              channels: cat.channels.filter((ch) => ch.id !== channelId),
            }
          : cat
      )
    );
  };

  const getChannelIcon = (type: string, color: string) => {
    switch (type) {
      case "voice":
        return <Volume2 size={18} color={color} />;
      case "video":
        return <Video size={18} color={color} />;
      case "announcement":
        return <Megaphone size={18} color={color} />;
      default:
        return <Hash size={18} color={color} />;
    }
  };

  const handleFinishSetup = () => {
    // In a real app, this would save to backend
    // For now, navigate to the new node
    router.replace(`/node/1`); // Using sample node ID
  };

  const handleSkip = () => {
    router.replace(`/node/1`);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={nodeColor} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: nodeColor }]}>
        <SafeAreaView edges={["top"]} style={{ backgroundColor: nodeColor }}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Set Up Your Node</Text>
              <Text style={styles.headerSubtitle}>{nodeName}</Text>
            </View>
            <TouchableOpacity style={styles.headerButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Node Preview Card */}
      <View
        style={[
          styles.previewCard,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
      >
        <View style={styles.previewHeader}>
          <View style={[styles.previewAvatar, { backgroundColor: nodeColor }]}>
            <Text style={styles.previewInitials}>{getInitials(nodeName)}</Text>
          </View>
          <View style={styles.previewInfo}>
            <Text style={[styles.previewName, { color: colors.text }]}>
              {nodeName}
            </Text>
            {nodeDescription ? (
              <Text style={styles.previewDescription} numberOfLines={2}>
                {nodeDescription}
              </Text>
            ) : null}
            <View style={styles.previewMeta}>
              {isPublic ? (
                <View style={styles.visibilityBadge}>
                  <Globe size={12} color="#4CAF50" />
                  <Text style={[styles.visibilityText, { color: "#4CAF50" }]}>
                    Public
                  </Text>
                </View>
              ) : (
                <View style={styles.visibilityBadge}>
                  <Lock size={12} color="#FF9800" />
                  <Text style={[styles.visibilityText, { color: "#FF9800" }]}>
                    Private
                  </Text>
                </View>
              )}
              <View style={styles.membersBadge}>
                <Users size={12} color="#8a8a8a" />
                <Text style={styles.membersText}>1 member</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories & Channels</Text>
        <Text style={styles.sectionSubtitle}>
          Organize your node with categories and channels
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        {categories.map((category) => (
          <View
            key={category.id}
            style={[
              styles.categoryCard,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
            <View style={styles.categoryHeader}>
              <GripVertical size={18} color="#8a8a8a" />
              <Text style={[styles.categoryName, { color: colors.text }]}>
                {category.name}
              </Text>
              <TouchableOpacity
                style={styles.categoryAction}
                onPress={() => removeCategory(category.id)}
              >
                <Trash2 size={16} color="#ff4444" />
              </TouchableOpacity>
            </View>

            {/* Channels */}
            {category.channels.map((channel) => (
              <View key={channel.id} style={styles.channelItem}>
                {getChannelIcon(channel.type, "#8a8a8a")}
                <Text style={[styles.channelName, { color: colors.text }]}>
                  {channel.name}
                </Text>
                <TouchableOpacity
                  onPress={() => removeChannel(category.id, channel.id)}
                >
                  <Trash2 size={14} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}

            {/* Add Channel */}
            {showAddChannel === category.id ? (
              <View style={styles.addChannelForm}>
                <View style={styles.channelTypeRow}>
                  {(["text", "voice", "video", "announcement"] as const).map(
                    (type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.typeButton,
                          newChannelType === type && {
                            backgroundColor: nodeColor,
                          },
                        ]}
                        onPress={() => setNewChannelType(type)}
                      >
                        {getChannelIcon(
                          type,
                          newChannelType === type ? "#fff" : "#8a8a8a"
                        )}
                      </TouchableOpacity>
                    )
                  )}
                </View>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.channelInput, { color: colors.text }]}
                    value={newChannelName}
                    onChangeText={setNewChannelName}
                    placeholder="Channel name"
                    placeholderTextColor="#8a8a8a"
                    autoFocus
                  />
                  <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: nodeColor }]}
                    onPress={() => addChannel(category.id)}
                  >
                    <Check size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addChannelBtn}
                onPress={() => setShowAddChannel(category.id)}
              >
                <Plus size={16} color={nodeColor} />
                <Text style={[styles.addChannelText, { color: nodeColor }]}>
                  Add Channel
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add Category */}
        {showAddCategory ? (
          <View
            style={[
              styles.addCategoryForm,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
            <TextInput
              style={[styles.categoryInput, { color: colors.text }]}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Category name"
              placeholderTextColor="#8a8a8a"
              autoFocus
            />
            <View style={styles.addCategoryActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowAddCategory(false);
                  setNewCategoryName("");
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: nodeColor }]}
                onPress={addCategory}
              >
                <Text style={styles.confirmText}>Add Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.addCategoryBtn,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
            onPress={() => setShowAddCategory(true)}
          >
            <FolderPlus size={20} color={nodeColor} />
            <Text style={[styles.addCategoryText, { color: nodeColor }]}>
              Add Category
            </Text>
          </TouchableOpacity>
        )}

        {/* Tips */}
        <View
          style={[
            styles.tipsCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <Text style={[styles.tipsTitle, { color: colors.text }]}>
            💡 Quick Tips
          </Text>
          <Text style={styles.tipText}>
            • Categories help organize channels by topic
          </Text>
          <Text style={styles.tipText}>
            • Use text channels for async discussions
          </Text>
          <Text style={styles.tipText}>
            • Voice & video channels are great for meetings
          </Text>
          <Text style={styles.tipText}>
            • You can always add more channels later
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
      >
        <SafeAreaView edges={["bottom"]}>
          <TouchableOpacity
            style={[styles.finishButton, { backgroundColor: nodeColor }]}
            onPress={handleFinishSetup}
          >
            <Check size={20} color="#fff" />
            <Text style={styles.finishButtonText}>Finish Setup</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
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
    minWidth: 50,
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  skipText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  previewCard: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  previewAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  previewInitials: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  previewDescription: {
    fontSize: 14,
    color: "#8a8a8a",
    marginBottom: 8,
    lineHeight: 20,
  },
  previewMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  visibilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  visibilityText: {
    fontSize: 12,
    fontWeight: "600",
  },
  membersBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  membersText: {
    fontSize: 12,
    color: "#8a8a8a",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8a8a8a",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#aaa",
  },
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 13,
    color: "#8a8a8a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
    textTransform: "uppercase",
  },
  categoryAction: {
    padding: 4,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingLeft: 16,
    gap: 10,
  },
  channelName: {
    flex: 1,
    fontSize: 15,
  },
  addChannelBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingLeft: 16,
    gap: 8,
  },
  addChannelText: {
    fontSize: 14,
    fontWeight: "500",
  },
  addChannelForm: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  channelTypeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  typeButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
  },
  channelInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    fontSize: 15,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addCategoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  addCategoryText: {
    fontSize: 15,
    fontWeight: "600",
  },
  addCategoryForm: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  categoryInput: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    fontSize: 16,
    marginBottom: 12,
  },
  addCategoryActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#8a8a8a",
  },
  confirmBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  tipsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: "#8a8a8a",
    marginBottom: 6,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  finishButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
    gap: 8,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
