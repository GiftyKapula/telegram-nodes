import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Check, CheckCheck, Archive, ChevronDown } from "lucide-react-native";

interface ChatListItemProps {
  name: string;
  message: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isRead?: boolean;
  isOnline?: boolean;
  isArchived?: boolean;
  isVerified?: boolean;
  isPinned?: boolean;
}

const ChatListItem = ({
  name,
  message,
  time,
  avatar,
  unreadCount,
  isRead,
  isOnline,
  isArchived,
  isVerified,
  isPinned,
}: ChatListItemProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.avatarContainer}>
        {isArchived ? (
          <View style={[styles.archivedAvatar, { backgroundColor: "#6EB0E2" }]}>
            <ChevronDown size={28} color="#fff" />
          </View>
        ) : (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        )}

        {isOnline && !isArchived && (
          <View
            style={[styles.onlineBadge, { borderColor: colors.background }]}
          />
        )}
      </View>
      <View
        style={[
          styles.contentContainer,
          { borderBottomColor: colors.separator },
        ]}
      >
        <View style={styles.topRow}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: "#222" }]} numberOfLines={1}>
              {name}
            </Text>
            {isVerified && (
              <View style={styles.verifiedBadge}>
                <Check size={10} color="#fff" strokeWidth={3} />
              </View>
            )}
            {isPinned && <Text style={styles.pinnedIcon}>⭐</Text>}
          </View>

          <View style={styles.metaContainer}>
            {isRead && (
              <CheckCheck size={18} color="#4CAF50" style={styles.readIcon} />
            )}
            <Text style={[styles.time, { color: "#8a8a8a" }]}>{time}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text
            style={[styles.message, { color: isArchived ? "#222" : "#8a8a8a" }]}
            numberOfLines={1}
          >
            {message}
          </Text>
          {unreadCount ? (
            <View
              style={[
                styles.unreadBadge,
                {
                  backgroundColor: isArchived ? "#8a8a8a" : "#4CAF50",
                },
              ]}
            >
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 76,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#eee",
  },
  archivedAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#54A9EA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  pinnedIcon: {
    fontSize: 12,
    marginLeft: 4,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readIcon: {
    marginRight: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: "400",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    fontSize: 15,
    fontWeight: "400",
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChatListItem;
