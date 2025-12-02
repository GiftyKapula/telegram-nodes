import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Search } from "lucide-react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  onMenuPress?: () => void;
}

const Header = ({ title, children, onMenuPress }: HeaderProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView style={{ backgroundColor: colors.headerBackground }}>
      <View
        style={[styles.container, { backgroundColor: colors.headerBackground }]}
      >
        <TouchableOpacity onPress={onMenuPress} style={styles.button}>
          <Menu color={colors.headerText} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.headerText }]}>
          {title}
        </Text>
        <TouchableOpacity style={styles.button}>
          <Search color={colors.headerText} size={24} />
        </TouchableOpacity>
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  button: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 8,
  },
});

export default Header;
