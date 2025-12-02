import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Settings,
  Users,
  Hash,
  Volume2,
  Video,
  Megaphone,
  ChevronDown,
  ChevronRight,
  Plus,
  Bell,
  Search,
  MoreVertical,
  Lock,
  UserCircle,
} from "lucide-react-native";
import { SAMPLE_NODES, TelegramNode, NodeCategory } from "@/types/node";

export default function NodeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  // Find the node from sample data
  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "voice":
        return <Volume2 size={18} color="#8a8a8a" />;
      case "video":
        return <Video size={18} color="#8a8a8a" />;
      case "announcement":
        return <Megaphone size={18} color="#8a8a8a" />;
      default:
        return <Hash size={18} color="#8a8a8a" />;
    }
  };

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
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Search size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Bell size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => router.push(`/node/${id}/settings`)}
              >
                <MoreVertical size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Node Info */}
          <View style={styles.nodeInfo}>
            {node.avatar ? (
              <Image source={{ uri: node.avatar }} style={styles.nodeAvatar} />
            ) : (
              <View
                style={[
                  styles.nodeInitials,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <Text style={styles.nodeInitialsText}>{node.initials}</Text>
              </View>
            )}
            <View style={styles.nodeDetails}>
              <Text style={styles.nodeName}>{node.name}</Text>
              <Text style={styles.nodeMeta}>
                {node.memberCount.toLocaleString()} members •{" "}
                {node.onlineCount.toLocaleString()} online
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* My Node Profile Preview */}
      <TouchableOpacity
        style={[
          styles.profileCard,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
        onPress={() => router.push(`/node/${id}/profile`)}
      >
        <View style={styles.profileLeft}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=gifty" }}
            style={styles.profileAvatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {node.myProfile?.name || "Your Node Profile"}
            </Text>
            <Text style={styles.profileBio}>
              {node.myProfile?.bio || "Tap to set up your profile"}
            </Text>
          </View>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: node.color }]}>
          <Text style={styles.roleText}>
            {node.myRole.charAt(0).toUpperCase() + node.myRole.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.quickAction,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
            onPress={() => router.push(`/node/${id}/members`)}
          >
            <Users size={20} color={node.color} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              Members
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickAction,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
            onPress={() => router.push(`/node/${id}/profile`)}
          >
            <UserCircle size={20} color={node.color} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              My Profile
            </Text>
          </TouchableOpacity>
          {(node.myRole === "owner" || node.myRole === "admin") && (
            <TouchableOpacity
              style={[
                styles.quickAction,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
              onPress={() => router.push(`/node/${id}/settings`)}
            >
              <Settings size={20} color={node.color} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Settings
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Channels */}
        {node.categories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category.id)}
            >
              {collapsedCategories.has(category.id) ? (
                <ChevronRight size={16} color="#8a8a8a" />
              ) : (
                <ChevronDown size={16} color="#8a8a8a" />
              )}
              <Text style={styles.categoryName}>{category.name}</Text>
              {(node.myRole === "owner" || node.myRole === "admin") && (
                <TouchableOpacity style={styles.addChannelBtn}>
                  <Plus size={16} color="#8a8a8a" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {!collapsedCategories.has(category.id) &&
              category.channels.map((channel) => (
                <TouchableOpacity
                  key={channel.id}
                  style={[
                    styles.channelRow,
                    { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
                  ]}
                  onPress={() =>
                    router.push(`/node/${id}/channel/${channel.id}`)
                  }
                >
                  <View style={styles.channelLeft}>
                    {getChannelIcon(channel.type)}
                    <Text style={[styles.channelName, { color: colors.text }]}>
                      {channel.name}
                    </Text>
                    {channel.isPrivate && (
                      <Lock
                        size={12}
                        color="#8a8a8a"
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </View>
                  {channel.unreadCount && channel.unreadCount > 0 && (
                    <View
                      style={[
                        styles.unreadBadge,
                        { backgroundColor: node.color },
                      ]}
                    >
                      <Text style={styles.unreadText}>
                        {channel.unreadCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </View>
        ))}

        {/* Add Category button for admins */}
        {(node.myRole === "owner" || node.myRole === "admin") && (
          <TouchableOpacity
            style={styles.addCategoryBtn}
            onPress={() => router.push(`/node/${id}/category/create`)}
          >
            <Plus size={18} color={node.color} />
            <Text style={[styles.addCategoryText, { color: node.color }]}>
              Add Category
            </Text>
          </TouchableOpacity>
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
  safeHeader: {},
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: "row",
  },
  nodeInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  nodeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  nodeInitials: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  nodeInitialsText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  nodeDetails: {
    marginLeft: 14,
    flex: 1,
  },
  nodeName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  nodeMeta: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 2,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: "500",
  },
  profileBio: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: "500",
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8a8a8a",
    marginLeft: 4,
    flex: 1,
    letterSpacing: 0.5,
  },
  addChannelBtn: {
    padding: 4,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginBottom: 2,
    borderRadius: 8,
  },
  channelLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelName: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "400",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  addCategoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#2AABEE",
    borderRadius: 8,
    gap: 8,
  },
  addCategoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
