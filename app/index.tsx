import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "@/components/Header";
import ChatListItem from "@/components/ChatListItem";
import SideMenu from "@/components/SideMenu";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Pencil, Camera, Plus, Check } from "lucide-react-native";

const chats = [
  {
    id: "0",
    name: "Archived Chats",
    message: "Moses Mpundu 2",
    time: "",
    avatar: "",
    isArchived: true,
    unreadCount: 1,
  },
  {
    id: "1",
    name: "DERRIQUE",
    message: "🏆 Design Contest 2025 Prize f...",
    time: "Mon",
    avatar: "https://i.pravatar.cc/150?u=derrique",
    isRead: true,
    isOnline: false,
  },
  {
    id: "2",
    name: "Bornie Floppy",
    message: "Voice message",
    time: "Mon",
    avatar: "https://i.pravatar.cc/150?u=bornie",
    isRead: true,
    isOnline: true,
    isPinned: true,
  },
  {
    id: "3",
    name: "Telegram Contests",
    message: "🏆 Design Contest 2025 Prize fun...",
    time: "Mon",
    avatar: "https://i.pravatar.cc/150?u=telegram",
    isVerified: true,
    isOnline: false,
  },
  {
    id: "4",
    name: "Kelvin mwambu",
    message: "Kelvin mwambu joined Telegram",
    time: "Oct 23",
    avatar: "https://i.pravatar.cc/150?u=kelvin",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "5",
    name: "Gospel Evoy's Music",
    message: "Gospel Evoy's Music joined Tel...",
    time: "Oct 14",
    avatar: "https://i.pravatar.cc/150?u=gospel",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "6",
    name: "Gift barber man",
    message: "Gift barber man joined Telegram",
    time: "Sep 23",
    avatar: "https://i.pravatar.cc/150?u=gift",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "7",
    name: "Tendai Parent",
    message: "Tendai Parent joined Telegram",
    time: "Sep 09",
    avatar: "https://i.pravatar.cc/150?u=tendai",
    isOnline: false,
  },
];

export default function MainChatList() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const renderHeader = () => (
    <View>
      {/* Birthday Banner */}
      <View style={[styles.banner, { backgroundColor: colors.background }]}>
        <Text style={[styles.bannerTitle, { color: colors.text }]}>
          Add your birthday! 🎂
        </Text>
        <Text style={[styles.bannerSubtitle, { color: colors.tabIconDefault }]}>
          Let your contacts know when you're celebrating
        </Text>
        <TouchableOpacity style={styles.closeBanner}>
          <Text style={{ color: colors.tabIconDefault, fontSize: 18 }}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SideMenu visible={menuVisible} onClose={closeMenu} />

      <Header title="Telegram" onMenuPress={openMenu}>
        {/* Stories Header */}
        <View style={styles.storiesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScroll}
          >
            {/* My Story */}
            <View style={styles.storyItem}>
              <View style={styles.storyAvatarContainer}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?u=gifty" }}
                  style={styles.storyAvatar}
                />
                <View style={styles.addStoryBadge}>
                  <Plus size={12} color="#517DA2" />
                </View>
              </View>
              <Text style={[styles.storyName, { color: colors.headerText }]}>
                My Story
              </Text>
            </View>

            {/* Telegram Story */}
            <View style={styles.storyItem}>
              <View style={[styles.storyAvatarContainer, styles.storyRing]}>
                <View style={styles.telegramStoryAvatar}>
                  <Text style={styles.telegramIcon}>✈️</Text>
                </View>
              </View>
              <View style={styles.storyNameRow}>
                <Text style={[styles.storyName, { color: colors.headerText }]}>
                  Telegram
                </Text>
                <View style={styles.storyVerifiedBadge}>
                  <Check size={8} color="#fff" strokeWidth={3} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Header>

      <FlatList
        data={chats}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            name={item.name}
            message={item.message}
            time={item.time}
            avatar={item.avatar}
            unreadCount={item.unreadCount}
            isRead={item.isRead}
            isOnline={item.isOnline}
            isArchived={item.isArchived}
            isVerified={item.isVerified}
            isPinned={item.isPinned}
          />
        )}
      />

      {/* FABs */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fabSmall, { backgroundColor: colors.background }]}
        >
          <Pencil color={colors.tabIconDefault} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.tint }]}
        >
          <Camera color="#fff" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storiesContainer: {
    paddingVertical: 8,
    paddingBottom: 12,
  },
  storiesScroll: {
    paddingHorizontal: 12,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
    width: 60,
  },
  storyAvatarContainer: {
    position: "relative",
    marginBottom: 4,
  },
  storyRing: {
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff", // White for blue background
    borderStyle: "dashed",
  },
  storyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  telegramStoryAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#54A9EA",
    justifyContent: "center",
    alignItems: "center",
  },
  telegramIcon: {
    fontSize: 24,
  },
  addStoryBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#517DA2",
  },
  storyNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  storyVerifiedBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#54A9EA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
  },
  storyName: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
  banner: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    position: "relative",
  },
  bannerTitle: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 13,
  },
  closeBanner: {
    position: "absolute",
    top: 8,
    right: 12,
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "center",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 16,
  },
  fabSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
