import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  ChevronDown,
  ChevronRight,
  Hash,
  Volume2,
  Video,
} from "lucide-react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

const categories = [
  {
    id: "1",
    title: "GENERAL",
    channels: [
      { id: "c1", name: "announcements", type: "text" },
      { id: "c2", name: "general-chat", type: "text" },
    ],
  },
  {
    id: "2",
    title: "VOICE CHANNELS",
    channels: [
      { id: "v1", name: "Lounge", type: "voice" },
      { id: "v2", name: "Meeting Room", type: "voice" },
    ],
  },
  {
    id: "3",
    title: "PROJECTS",
    channels: [
      { id: "p1", name: "design-updates", type: "text" },
      { id: "p2", name: "development", type: "text" },
      { id: "p3", name: "marketing", type: "text" },
    ],
  },
];

const NodeChannelList = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
    "3": true,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderChannel = (channel: any) => {
    let Icon = Hash;
    if (channel.type === "voice") Icon = Volume2;
    if (channel.type === "video") Icon = Video;

    return (
      <TouchableOpacity
        key={channel.id}
        style={[styles.channelItem, { backgroundColor: colors.surface }]}
      >
        <Icon
          size={20}
          color={colors.tabIconDefault}
          style={styles.channelIcon}
        />
        <Text style={[styles.channelName, { color: colors.text }]}>
          {channel.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => toggleExpand(category.id)}
          >
            {expanded[category.id] ? (
              <ChevronDown size={12} color={colors.tabIconDefault} />
            ) : (
              <ChevronRight size={12} color={colors.tabIconDefault} />
            )}
            <Text
              style={[styles.categoryTitle, { color: colors.tabIconDefault }]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>

          {expanded[category.id] && (
            <View style={styles.channelsContainer}>
              {category.channels.map(renderChannel)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 8,
  },
  channelsContainer: {
    paddingHorizontal: 8,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 2,
  },
  channelIcon: {
    marginRight: 10,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NodeChannelList;
