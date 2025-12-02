import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Camera,
  Pencil,
  Users,
  Shield,
  Link,
  Bell,
  Trash2,
  LogOut,
  Hash,
  Lock,
  Globe,
  ChevronRight,
} from "lucide-react-native";
import { SAMPLE_NODES } from "@/types/node";

export default function NodeSettingsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];
  const isOwnerOrAdmin = node.myRole === "owner" || node.myRole === "admin";

  const SettingItem = ({
    icon,
    label,
    value,
    onPress,
    danger,
    showArrow = true,
  }: {
    icon: React.ReactNode;
    label: string;
    value?: string;
    onPress?: () => void;
    danger?: boolean;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
      ]}
      onPress={onPress}
    >
      <View style={styles.settingLeft}>
        {icon}
        <Text
          style={[
            styles.settingLabel,
            { color: danger ? "#f44336" : colors.text },
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {showArrow && <ChevronRight size={18} color="#8a8a8a" />}
      </View>
    </TouchableOpacity>
  );

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
            <Text style={styles.headerTitle}>Node Settings</Text>
            <View style={styles.headerButton} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Node Info Card */}
        {isOwnerOrAdmin && (
          <View
            style={[
              styles.nodeInfoCard,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
            <View style={styles.nodeAvatarContainer}>
              {node.avatar ? (
                <Image
                  source={{ uri: node.avatar }}
                  style={styles.nodeAvatar}
                />
              ) : (
                <View
                  style={[styles.nodeInitials, { backgroundColor: node.color }]}
                >
                  <Text style={styles.nodeInitialsText}>{node.initials}</Text>
                </View>
              )}
              <TouchableOpacity
                style={[styles.editAvatarBtn, { backgroundColor: node.color }]}
              >
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.nodeInfoText}>
              <View style={styles.nodeNameRow}>
                <Text style={[styles.nodeName, { color: colors.text }]}>
                  {node.name}
                </Text>
                <TouchableOpacity>
                  <Pencil size={16} color={node.color} />
                </TouchableOpacity>
              </View>
              <Text style={styles.nodeDescription} numberOfLines={2}>
                {node.description || "Add a description..."}
              </Text>
            </View>
          </View>
        )}

        {/* General Section */}
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.sectionContainer}>
          <SettingItem
            icon={<Globe size={20} color="#8a8a8a" />}
            label="Node Visibility"
            value={node.isPublic ? "Public" : "Private"}
          />
          <SettingItem
            icon={<Link size={20} color="#8a8a8a" />}
            label="Invite Link"
            value="t.me/+abc123"
          />
          <SettingItem
            icon={<Bell size={20} color="#8a8a8a" />}
            label="Notifications"
            value="All messages"
          />
        </View>

        {/* Members & Roles Section */}
        {isOwnerOrAdmin && (
          <>
            <Text style={styles.sectionTitle}>Members & Roles</Text>
            <View style={styles.sectionContainer}>
              <SettingItem
                icon={<Users size={20} color="#8a8a8a" />}
                label="Members"
                value={node.memberCount.toString()}
                onPress={() => router.push(`/node/${id}/members`)}
              />
              <SettingItem
                icon={<Shield size={20} color="#8a8a8a" />}
                label="Roles"
                value={`${node.roles.length} roles`}
                onPress={() => router.push(`/node/${id}/roles`)}
              />
              <SettingItem
                icon={<Lock size={20} color="#8a8a8a" />}
                label="Permissions"
              />
            </View>
          </>
        )}

        {/* Channels Section */}
        {isOwnerOrAdmin && (
          <>
            <Text style={styles.sectionTitle}>Channels</Text>
            <View style={styles.sectionContainer}>
              <SettingItem
                icon={<Hash size={20} color="#8a8a8a" />}
                label="Manage Channels"
                value={`${node.categories.reduce(
                  (acc, cat) => acc + cat.channels.length,
                  0
                )} channels`}
              />
            </View>
          </>
        )}

        {/* Danger Zone */}
        <Text style={styles.sectionTitle}>
          {node.myRole === "owner" ? "Danger Zone" : "Leave"}
        </Text>
        <View style={styles.sectionContainer}>
          {node.myRole === "owner" ? (
            <SettingItem
              icon={<Trash2 size={20} color="#f44336" />}
              label="Delete Node"
              danger
              showArrow={false}
            />
          ) : (
            <SettingItem
              icon={<LogOut size={20} color="#f44336" />}
              label="Leave Node"
              danger
              showArrow={false}
            />
          )}
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
    width: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  nodeInfoCard: {
    flexDirection: "row",
    padding: 16,
    margin: 12,
    borderRadius: 12,
  },
  nodeAvatarContainer: {
    position: "relative",
  },
  nodeAvatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
  },
  nodeInitials: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  nodeInitialsText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  nodeInfoText: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  nodeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nodeName: {
    fontSize: 18,
    fontWeight: "600",
  },
  nodeDescription: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "400",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingValue: {
    fontSize: 14,
    color: "#8a8a8a",
  },
});
