import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
  Mic,
  Image as ImageIcon,
  Hash,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react-native";
import { SAMPLE_NODES } from "@/types/node";

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  content: string;
  time: string;
  isMe?: boolean;
}

export default function ChannelScreen() {
  const { id, channelId } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  const node = SAMPLE_NODES.find((n) => n.id === id) || SAMPLE_NODES[0];

  // Find the channel
  let channel = null;
  for (const cat of node.categories) {
    const found = cat.channels.find((ch) => ch.id === channelId);
    if (found) {
      channel = found;
      break;
    }
  }

  const [message, setMessage] = useState("");

  // Sample messages
  const messages: Message[] = [
    {
      id: "1",
      sender: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?u=alex",
      content: "Hey everyone! 👋 Just pushed the latest design updates.",
      time: "10:30 AM",
    },
    {
      id: "2",
      sender: "Maria Santos",
      avatar: "https://i.pravatar.cc/150?u=maria",
      content: "Looks great! I really like the new color scheme.",
      time: "10:32 AM",
    },
    {
      id: "3",
      sender: "Gifty Designer",
      content: "Thanks! I'll share the Figma link shortly.",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: "4",
      sender: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?u=alex",
      content:
        "Perfect! Also, can we discuss the node navigation flow in our next meeting?",
      time: "10:40 AM",
    },
    {
      id: "5",
      sender: "Maria Santos",
      avatar: "https://i.pravatar.cc/150?u=maria",
      content: "Sure! I have some ideas about the channel organization too.",
      time: "10:42 AM",
    },
  ];

  const isVoiceChannel = channel?.type === "voice" || channel?.type === "video";

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
            <View style={styles.headerInfo}>
              <View style={styles.channelTitleRow}>
                <Hash size={18} color="rgba(255,255,255,0.8)" />
                <Text style={styles.headerTitle}>
                  {channel?.name || "channel"}
                </Text>
              </View>
              <Text style={styles.headerSubtitle}>{node.name}</Text>
            </View>
            <View style={styles.headerActions}>
              {isVoiceChannel ? (
                <>
                  <TouchableOpacity style={styles.headerButton}>
                    <Phone size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerButton}>
                    <Video size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.headerButton}>
                  <MoreVertical size={22} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>

      {isVoiceChannel ? (
        // Voice Channel View
        <View style={styles.voiceContainer}>
          <View
            style={[
              styles.voiceCard,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
            <View style={[styles.voiceIcon, { backgroundColor: node.color }]}>
              {channel?.type === "video" ? (
                <Video size={40} color="#fff" />
              ) : (
                <Phone size={40} color="#fff" />
              )}
            </View>
            <Text style={[styles.voiceTitle, { color: colors.text }]}>
              {channel?.name}
            </Text>
            <Text style={styles.voiceSubtitle}>
              No one is currently in this channel
            </Text>
            <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: node.color }]}
            >
              <Text style={styles.joinButtonText}>
                {channel?.type === "video" ? "Start Video" : "Join Voice"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Text Channel View
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[styles.messageRow, msg.isMe && styles.messageRowMe]}
              >
                {!msg.isMe && msg.avatar && (
                  <View style={styles.avatarContainer}>
                    <View style={styles.messageAvatar}>
                      <Text style={styles.avatarText}>
                        {msg.sender.charAt(0)}
                      </Text>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    msg.isMe
                      ? [
                          styles.messageBubbleMe,
                          { backgroundColor: node.color },
                        ]
                      : { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
                  ]}
                >
                  {!msg.isMe && (
                    <Text style={[styles.senderName, { color: node.color }]}>
                      {msg.sender}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.messageText,
                      { color: msg.isMe ? "#fff" : colors.text },
                    ]}
                  >
                    {msg.content}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      { color: msg.isMe ? "rgba(255,255,255,0.7)" : "#8a8a8a" },
                    ]}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Area */}
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
            <TouchableOpacity style={styles.inputButton}>
              <Paperclip size={22} color="#8a8a8a" />
            </TouchableOpacity>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="Message..."
              placeholderTextColor="#8a8a8a"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.inputButton}>
              <Smile size={22} color="#8a8a8a" />
            </TouchableOpacity>
            {message.trim() ? (
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: node.color }]}
              >
                <Send size={18} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.inputButton}>
                <Mic size={22} color="#8a8a8a" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 4,
  },
  channelTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 12,
    gap: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  messageRowMe: {
    justifyContent: "flex-end",
  },
  avatarContainer: {
    marginRight: 8,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  messageBubbleMe: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
  },
  inputButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  voiceCard: {
    width: "100%",
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
  },
  voiceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  voiceTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  voiceSubtitle: {
    fontSize: 14,
    color: "#8a8a8a",
    marginBottom: 24,
  },
  joinButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
