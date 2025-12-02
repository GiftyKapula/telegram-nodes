import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  User,
  Users,
  Phone,
  Bookmark,
  Settings,
  UserPlus,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react-native";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [isAccountsExpanded, setIsAccountsExpanded] = useState(false);

  const accounts = [
    {
      id: "1",
      name: "Gift Kapula",
      initials: "GK",
      color: "#517DA2",
      unread: 89,
      active: false,
    },
    {
      id: "2",
      name: "Gifty Kapula",
      avatar: "https://i.pravatar.cc/150?u=gifty",
      unread: 157,
      active: true,
    },
  ];

  const menuItems = [
    { icon: User, label: "My Profile" },
    { icon: Users, label: "New Group" },
    { icon: User, label: "Contacts" }, // Using User as placeholder for Contacts icon
    { icon: Phone, label: "Calls" },
    { icon: Bookmark, label: "Saved Messages" },
    { icon: Settings, label: "Settings", badge: "!" },
    { icon: UserPlus, label: "Invite Friends" },
    { icon: HelpCircle, label: "Telegram Features" },
  ];

  const toggleAccounts = () => {
    setIsAccountsExpanded(!isAccountsExpanded);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: colors.headerBackground }]}
      >
        <View style={styles.headerTop}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=gifty" }}
            style={styles.headerAvatar}
          />
          <TouchableOpacity style={styles.themeToggle}>
            {colorScheme === "dark" ? (
              <Sun size={24} color="#fff" />
            ) : (
              <Moon size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Gifty Kapula</Text>
            <Text style={styles.headerPhone}>+260 768215967</Text>
          </View>
          <TouchableOpacity
            onPress={toggleAccounts}
            style={styles.expandButton}
          >
            {isAccountsExpanded ? (
              <ChevronUp size={24} color="#fff" />
            ) : (
              <ChevronDown size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Accounts List (Collapsible) */}
        {isAccountsExpanded && (
          <View style={styles.accountsContainer}>
            {accounts.map((account) => (
              <TouchableOpacity key={account.id} style={styles.accountRow}>
                <View style={styles.accountLeft}>
                  {account.avatar ? (
                    <Image
                      source={{ uri: account.avatar }}
                      style={styles.accountAvatarSmall}
                    />
                  ) : (
                    <View
                      style={[
                        styles.accountInitials,
                        { backgroundColor: account.color },
                      ]}
                    >
                      <Text style={styles.initialsText}>
                        {account.initials}
                      </Text>
                    </View>
                  )}
                  <Text
                    style={[styles.accountNameList, { color: colors.text }]}
                  >
                    {account.name}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: "#4CD964" }]}>
                  <Text style={styles.badgeText}>{account.unread}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.accountRow}>
              <View style={styles.addAccountIcon}>
                <Plus size={24} color={colors.tabIconDefault} />
              </View>
              <Text style={[styles.accountNameList, { color: colors.text }]}>
                Add Account
              </Text>
            </TouchableOpacity>
            <View
              style={[styles.separator, { backgroundColor: colors.separator }]}
            />
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <item.icon
                size={24}
                color={colors.tabIconDefault}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, { color: colors.text }]}>
                {item.label}
              </Text>
              {item.badge && (
                <View
                  style={[styles.menuBadge, { backgroundColor: "#517DA2" }]}
                >
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0, // Remove default padding
  },
  header: {
    padding: 16,
    paddingTop: 40, // Status bar space
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  themeToggle: {
    padding: 4,
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  headerPhone: {
    color: "#b3cce6", // Lighter blue for phone
    fontSize: 14,
    marginTop: 4,
  },
  expandButton: {
    padding: 4,
  },
  accountsContainer: {
    paddingVertical: 8,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 16,
  },
  accountInitials: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  initialsText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  accountNameList: {
    fontSize: 15,
    fontWeight: "500",
  },
  addAccountIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  menuContainer: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  menuBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
