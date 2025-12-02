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
import {
  ArrowLeft,
  Search,
  Shield,
  ShieldCheck,
  Crown,
  User,
} from "lucide-react-native";
import { SAMPLE_NODES, NodeMember } from "@/types/node";

export default function NodeMembersScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

  const [searchQuery, setSearchQuery] = useState("");

  // Group members by role
  const owners = node.members.filter((m) => m.role === "owner");
  const admins = node.members.filter((m) => m.role === "admin");
  const moderators = node.members.filter((m) => m.role === "moderator");
  const members = node.members.filter((m) => m.role === "member");

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown size={14} color="#FFD700" />;
      case "admin":
        return <ShieldCheck size={14} color="#E91E63" />;
      case "moderator":
        return <Shield size={14} color="#4CAF50" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "#FFD700";
      case "admin":
        return "#E91E63";
      case "moderator":
        return "#4CAF50";
      default:
        return colors.text;
    }
  };

  const renderMember = (member: NodeMember) => (
    <TouchableOpacity
      key={member.id}
      style={[
        styles.memberRow,
        { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
      ]}
    >
      <View style={styles.memberLeft}>
        {member.avatar ? (
          <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
        ) : (
          <View
            style={[styles.memberInitials, { backgroundColor: member.color }]}
          >
            <Text style={styles.initialsText}>{member.initials}</Text>
          </View>
        )}
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor:
                member.status === "online" ? "#4CAF50" : "#9E9E9E",
            },
          ]}
        />
      </View>
      <View style={styles.memberInfo}>
        <View style={styles.nameRow}>
          <Text
            style={[styles.memberName, { color: getRoleColor(member.role) }]}
          >
            {member.nodeProfile?.name || member.name}
          </Text>
          {getRoleIcon(member.role)}
        </View>
        <Text style={styles.memberStatus}>
          {member.status === "online"
            ? "online"
            : member.lastSeen
            ? `last seen ${member.lastSeen}`
            : "offline"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title: string, memberList: NodeMember[]) => {
    if (memberList.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {title} — {memberList.length}
        </Text>
        {memberList.map(renderMember)}
      </View>
    );
  };

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
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Members</Text>
              <Text style={styles.headerSubtitle}>
                {node.memberCount.toLocaleString()} members,{" "}
                {node.onlineCount.toLocaleString()} online
              </Text>
            </View>
            <View style={styles.headerButton} />
          </View>
        </SafeAreaView>
      </View>

      {/* Search */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
        ]}
      >
        <Search size={18} color="#8a8a8a" />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search members"
          placeholderTextColor="#8a8a8a"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSection("Owner", owners)}
        {renderSection("Admins", admins)}
        {renderSection("Moderators", moderators)}
        {renderSection("Members", members)}

        {/* Placeholder for more members */}
        <TouchableOpacity style={styles.loadMore}>
          <Text style={[styles.loadMoreText, { color: node.color }]}>
            Show all {node.memberCount.toLocaleString()} members
          </Text>
        </TouchableOpacity>

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
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerButton: {
    padding: 8,
    width: 40,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginBottom: 2,
    borderRadius: 10,
  },
  memberLeft: {
    position: "relative",
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  memberInitials: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memberName: {
    fontSize: 15,
    fontWeight: "500",
  },
  memberStatus: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 2,
  },
  loadMore: {
    alignItems: "center",
    paddingVertical: 16,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
