import React from "react";
import {
  View,
  Text,
  StyleSheet,
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
  Plus,
  GripVertical,
  ChevronRight,
  Users,
} from "lucide-react-native";
import { SAMPLE_NODES } from "@/types/node";

export default function NodeRolesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

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
            <Text style={styles.headerTitle}>Roles</Text>
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <Text style={[styles.infoText, { color: colors.text }]}>
            Roles define what members can do in this Node. Drag to reorder -
            higher roles have more authority.
          </Text>
        </View>

        {/* Roles List */}
        <View style={styles.rolesList}>
          {node.roles.map((role, index) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
              ]}
            >
              <View style={styles.roleLeft}>
                <GripVertical size={18} color="#8a8a8a" />
                <View
                  style={[styles.roleColor, { backgroundColor: role.color }]}
                />
                <View style={styles.roleInfo}>
                  <Text style={[styles.roleName, { color: colors.text }]}>
                    {role.name}
                  </Text>
                  <Text style={styles.rolePerms}>
                    {Object.values(role.permissions).filter(Boolean).length}{" "}
                    permissions
                  </Text>
                </View>
              </View>
              <View style={styles.roleRight}>
                <View style={styles.memberCount}>
                  <Users size={14} color="#8a8a8a" />
                  <Text style={styles.memberCountText}>
                    {index === 0 ? 1 : index === 1 ? 3 : 12}
                  </Text>
                </View>
                <ChevronRight size={18} color="#8a8a8a" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Default Role Info */}
        <View
          style={[
            styles.defaultRoleCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          <Text style={[styles.defaultRoleTitle, { color: colors.text }]}>
            Default Role
          </Text>
          <Text style={styles.defaultRoleDesc}>
            New members automatically receive the lowest role (Member). You can
            change this in Node settings.
          </Text>
        </View>

        {/* Permissions Preview */}
        <Text style={styles.sectionTitle}>Permission Types</Text>
        <View
          style={[
            styles.permissionsCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
        >
          {[
            { name: "Manage Node", desc: "Edit node info, delete node" },
            { name: "Manage Channels", desc: "Create, edit, delete channels" },
            { name: "Manage Roles", desc: "Create and assign roles" },
            { name: "Manage Members", desc: "Invite, kick, ban members" },
            { name: "Send Messages", desc: "Send messages in channels" },
            { name: "Attach Files", desc: "Upload images and files" },
            { name: "Mention Everyone", desc: "Use @everyone mentions" },
          ].map((perm, index) => (
            <View
              key={perm.name}
              style={[
                styles.permRow,
                index < 6 && {
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? "#3a3a3a" : "#eee",
                },
              ]}
            >
              <Text style={[styles.permName, { color: colors.text }]}>
                {perm.name}
              </Text>
              <Text style={styles.permDesc}>{perm.desc}</Text>
            </View>
          ))}
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
    padding: 12,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  rolesList: {
    gap: 8,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
  },
  roleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roleColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  roleInfo: {},
  roleName: {
    fontSize: 15,
    fontWeight: "500",
  },
  rolePerms: {
    fontSize: 12,
    color: "#8a8a8a",
    marginTop: 2,
  },
  roleRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  memberCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  memberCountText: {
    fontSize: 13,
    color: "#8a8a8a",
  },
  defaultRoleCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  defaultRoleTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  defaultRoleDesc: {
    fontSize: 13,
    color: "#8a8a8a",
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  permissionsCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  permRow: {
    padding: 14,
  },
  permName: {
    fontSize: 14,
    fontWeight: "500",
  },
  permDesc: {
    fontSize: 12,
    color: "#8a8a8a",
    marginTop: 2,
  },
});
