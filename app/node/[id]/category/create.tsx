import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Switch,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Check,
  Hash,
  Volume2,
  Video,
  Megaphone,
  Plus,
  Trash2,
  Lock,
  Eye,
  FolderOpen,
} from "lucide-react-native";
import { SAMPLE_NODES } from "@/types/node";

interface NewChannel {
  id: string;
  name: string;
  type: "text" | "voice" | "video" | "announcement";
}

export default function CreateCategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

  const [categoryName, setCategoryName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [channels, setChannels] = useState<NewChannel[]>([]);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<
    "text" | "voice" | "video" | "announcement"
  >("text");

  const addChannel = () => {
    if (!newChannelName.trim()) return;
    const newChannel: NewChannel = {
      id: Date.now().toString(),
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, "-"),
      type: newChannelType,
    };
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelType("text");
    setShowAddChannel(false);
  };

  const removeChannel = (channelId: string) => {
    setChannels(channels.filter((ch) => ch.id !== channelId));
  };

  const getChannelIcon = (type: string, color: string) => {
    switch (type) {
      case "voice":
        return <Volume2 size={20} color={color} />;
      case "video":
        return <Video size={20} color={color} />;
      case "announcement":
        return <Megaphone size={20} color={color} />;
      default:
        return <Hash size={20} color={color} />;
    }
  };

  const handleCreate = () => {
    if (!categoryName.trim()) return;
    // In a real app, this would save to backend
    // For now, just go back to the node
    router.back();
  };

  const canCreate = categoryName.trim().length > 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={node.color} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: node.color }]}>
        <SafeAreaView edges={["top"]} style={{ backgroundColor: node.color }}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Category</Text>
            <TouchableOpacity
              style={[styles.headerButton, !canCreate && { opacity: 0.5 }]}
              onPress={handleCreate}
              disabled={!canCreate}
            >
              <Check size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Icon & Name */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <View style={styles.iconRow}>
            <View style={[styles.iconPreview, { backgroundColor: node.color }]}>
              <FolderOpen size={28} color="#fff" />
            </View>
            <TextInput
              style={[styles.nameInput, { color: colors.text }]}
              value={categoryName}
              onChangeText={setCategoryName}
              placeholder="Category Name"
              placeholderTextColor="#8a8a8a"
              autoFocus
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Lock size={20} color="#8a8a8a" />
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Private Category
                </Text>
                <Text style={styles.settingDesc}>
                  Only specific roles can see this category
                </Text>
              </View>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#767577", true: node.color }}
              thumbColor="#fff"
            />
          </View>

          {isPrivate && (
            <TouchableOpacity style={styles.roleSelectBtn}>
              <Eye size={18} color={node.color} />
              <Text style={[styles.roleSelectText, { color: node.color }]}>
                Select Visible Roles
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Channels */}
        <Text style={styles.sectionTitle}>Channels</Text>
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          {channels.length === 0 && !showAddChannel && (
            <View style={styles.emptyChannels}>
              <Hash size={32} color="#8a8a8a" />
              <Text style={styles.emptyText}>No channels yet</Text>
              <Text style={styles.emptySubtext}>
                Add channels to organize conversations
              </Text>
            </View>
          )}

          {channels.map((channel, index) => (
            <View
              key={channel.id}
              style={[
                styles.channelItem,
                index < channels.length - 1 && styles.channelItemBorder,
              ]}
            >
              {getChannelIcon(channel.type, "#8a8a8a")}
              <Text style={[styles.channelName, { color: colors.text }]}>
                {channel.name}
              </Text>
              <TouchableOpacity onPress={() => removeChannel(channel.id)}>
                <Trash2 size={18} color="#ff4444" />
              </TouchableOpacity>
            </View>
          ))}

          {showAddChannel ? (
            <View style={styles.addChannelForm}>
              <Text style={styles.formLabel}>Channel Type</Text>
              <View style={styles.typeGrid}>
                {(
                  [
                    { type: "text", label: "Text", icon: Hash },
                    { type: "voice", label: "Voice", icon: Volume2 },
                    { type: "video", label: "Video", icon: Video },
                    {
                      type: "announcement",
                      label: "Announce",
                      icon: Megaphone,
                    },
                  ] as const
                ).map(({ type, label, icon: Icon }) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeOption,
                      newChannelType === type && {
                        borderColor: node.color,
                        backgroundColor: `${node.color}15`,
                      },
                    ]}
                    onPress={() => setNewChannelType(type)}
                  >
                    <Icon
                      size={22}
                      color={newChannelType === type ? node.color : "#8a8a8a"}
                    />
                    <Text
                      style={[
                        styles.typeLabel,
                        newChannelType === type && { color: node.color },
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.formLabel}>Channel Name</Text>
              <TextInput
                style={[styles.channelInput, { color: colors.text }]}
                value={newChannelName}
                onChangeText={setNewChannelName}
                placeholder="e.g., general-chat"
                placeholderTextColor="#8a8a8a"
              />

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setShowAddChannel(false);
                    setNewChannelName("");
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.addBtn,
                    { backgroundColor: node.color },
                    !newChannelName.trim() && { opacity: 0.5 },
                  ]}
                  onPress={addChannel}
                  disabled={!newChannelName.trim()}
                >
                  <Text style={styles.addBtnText}>Add Channel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addChannelBtn}
              onPress={() => setShowAddChannel(true)}
            >
              <Plus size={20} color={node.color} />
              <Text style={[styles.addChannelText, { color: node.color }]}>
                Add Channel
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            💡 You can always add more channels and modify settings after
            creating the category.
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Create Button */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
      >
        <SafeAreaView edges={["bottom"]}>
          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: node.color },
              !canCreate && { opacity: 0.5 },
            ]}
            onPress={handleCreate}
            disabled={!canCreate}
          >
            <FolderOpen size={20} color="#fff" />
            <Text style={styles.createButtonText}>Create Category</Text>
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
    paddingBottom: 12,
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
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  iconPreview: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  nameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8a8a8a",
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDesc: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 2,
  },
  roleSelectBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    gap: 8,
  },
  roleSelectText: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyChannels: {
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#8a8a8a",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 4,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  channelItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  channelName: {
    flex: 1,
    fontSize: 15,
  },
  addChannelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    gap: 8,
  },
  addChannelText: {
    fontSize: 14,
    fontWeight: "500",
  },
  addChannelForm: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8a8a8a",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  typeGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  typeOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.1)",
    gap: 6,
  },
  typeLabel: {
    fontSize: 12,
    color: "#8a8a8a",
    fontWeight: "500",
  },
  channelInput: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0,0,0,0.05)",
    fontSize: 16,
    marginBottom: 16,
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#8a8a8a",
  },
  addBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  infoCard: {
    padding: 16,
    backgroundColor: "rgba(42, 171, 238, 0.1)",
    borderRadius: 12,
  },
  infoText: {
    fontSize: 13,
    color: "#2AABEE",
    lineHeight: 18,
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
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
    gap: 10,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
