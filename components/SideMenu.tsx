import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  UserCircle,
  Users,
  Phone,
  Bookmark,
  Settings,
  UserPlus,
  HelpCircle,
  Moon,
  ChevronUp,
  ChevronDown,
  Plus,
  Check,
} from "lucide-react-native";

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get("window");
const MENU_WIDTH = width * 0.82;

const SideMenu = ({ visible, onClose }: SideMenuProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [accountsExpanded, setAccountsExpanded] = useState(true);

  const accounts = [
    {
      id: "1",
      name: "Gift Kapula",
      initials: "GK",
      color: "#54A9EA",
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View
          style={[styles.menuContainer, { backgroundColor: colors.background }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=gifty" }}
                style={styles.headerAvatar}
              />
              <TouchableOpacity style={styles.themeToggle}>
                <Moon size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>Gifty Kapula</Text>
              <TouchableOpacity
                style={styles.headerPhoneRow}
                onPress={() => setAccountsExpanded(!accountsExpanded)}
                activeOpacity={0.7}
              >
                <Text style={styles.headerPhone}>+260 768215967</Text>
                {accountsExpanded ? (
                  <ChevronUp size={20} color="#fff" style={styles.chevron} />
                ) : (
                  <ChevronDown size={20} color="#fff" style={styles.chevron} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Accounts List */}
            {accountsExpanded && (
              <View style={styles.accountsSection}>
                {accounts.map((account) => (
                  <TouchableOpacity key={account.id} style={styles.accountRow}>
                    <View style={styles.accountLeft}>
                      {account.avatar ? (
                        <View style={styles.avatarWithBadge}>
                          <Image
                            source={{ uri: account.avatar }}
                            style={styles.accountAvatar}
                          />
                          {account.active && (
                            <View style={styles.activeCheckBadge}>
                              <Check size={10} color="#fff" strokeWidth={3} />
                            </View>
                          )}
                        </View>
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
                        style={[styles.accountName, { color: colors.text }]}
                      >
                        {account.name}
                      </Text>
                    </View>
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{account.unread}</Text>
                    </View>
                  </TouchableOpacity>
                ))}

                {/* Add Account */}
                <TouchableOpacity style={styles.accountRow}>
                  <View style={styles.accountLeft}>
                    <View style={styles.addAccountIcon}>
                      <Plus size={22} color="#8a8a8a" />
                    </View>
                    <Text style={[styles.accountName, { color: colors.text }]}>
                      Add Account
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* Divider */}
            {accountsExpanded && <View style={styles.divider} />}

            {/* Menu Items - Section 1 */}
            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem}>
                <UserCircle size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  My Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Users size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  New Group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <UserPlus size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Contacts
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Phone size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Calls
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Bookmark size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Saved Messages
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Settings size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Settings
                </Text>
                <View style={styles.alertBadge}>
                  <Text style={styles.alertText}>!</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Menu Items - Section 2 */}
            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem}>
                <UserPlus size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Invite Friends
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <HelpCircle size={24} color="#8a8a8a" />
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  Telegram Features
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menuContainer: {
    width: MENU_WIDTH,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    elevation: 16,
  },
  header: {
    backgroundColor: "#517DA2",
    paddingTop: 36,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  themeToggle: {
    padding: 4,
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  headerPhoneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  headerPhone: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  chevron: {
    marginLeft: 8,
  },
  scrollContent: {
    flex: 1,
  },
  accountsSection: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWithBadge: {
    position: "relative",
    marginRight: 20,
  },
  accountAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activeCheckBadge: {
    position: "absolute",
    bottom: -2,
    left: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  accountInitials: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  initialsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  accountName: {
    fontSize: 15,
    fontWeight: "400",
  },
  addAccountIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  unreadBadge: {
    minWidth: 28,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  menuSection: {
    paddingVertical: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  menuLabel: {
    fontSize: 15,
    marginLeft: 28,
    fontWeight: "400",
    flex: 1,
  },
  alertBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SideMenu;
