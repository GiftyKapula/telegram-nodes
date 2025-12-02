// Types for Telegram Nodes feature

export interface NodeMember {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  color?: string;
  role: "owner" | "admin" | "moderator" | "member";
  nodeProfile?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

export interface NodeChannel {
  id: string;
  name: string;
  type: "text" | "voice" | "video" | "announcement";
  unreadCount?: number;
  lastMessage?: {
    sender: string;
    content: string;
    time: string;
  };
  isPrivate?: boolean;
  allowedRoles?: string[];
}

export interface NodeCategory {
  id: string;
  name: string;
  channels: NodeChannel[];
  collapsed?: boolean;
}

export interface NodeRole {
  id: string;
  name: string;
  color: string;
  permissions: {
    manageNode: boolean;
    manageChannels: boolean;
    manageRoles: boolean;
    manageMembers: boolean;
    kickMembers: boolean;
    banMembers: boolean;
    sendMessages: boolean;
    attachFiles: boolean;
    mentionEveryone: boolean;
    createInvites: boolean;
  };
  position: number; // Higher = more authority
}

export interface TelegramNode {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  initials?: string;
  color: string;
  banner?: string;
  memberCount: number;
  onlineCount: number;
  categories: NodeCategory[];
  roles: NodeRole[];
  members: NodeMember[];
  createdAt: string;
  isPublic: boolean;
  inviteLink?: string;
  unreadCount?: number;
  myProfile?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  myRole: "owner" | "admin" | "moderator" | "member";
}

// Sample data for demo
// Using Telegram-consistent colors
export const SAMPLE_NODES: TelegramNode[] = [
  {
    id: "1",
    name: "Design Team",
    description:
      "Official design team workspace for collaboration and feedback",
    initials: "DT",
    color: "#5BA0D0",
    memberCount: 128,
    onlineCount: 42,
    unreadCount: 5,
    myRole: "admin",
    myProfile: {
      name: "Gifty Designer",
      bio: "UI/UX Lead",
    },
    isPublic: false,
    categories: [
      {
        id: "c1",
        name: "GENERAL",
        channels: [
          {
            id: "ch1",
            name: "welcome",
            type: "text",
            lastMessage: {
              sender: "Bot",
              content: "Welcome to Design Team!",
              time: "10:00",
            },
          },
          {
            id: "ch2",
            name: "announcements",
            type: "announcement",
            unreadCount: 2,
          },
          {
            id: "ch3",
            name: "general-chat",
            type: "text",
            unreadCount: 3,
            lastMessage: {
              sender: "Alex",
              content: "Check out the new mockups!",
              time: "14:32",
            },
          },
        ],
      },
      {
        id: "c2",
        name: "PROJECTS",
        channels: [
          {
            id: "ch4",
            name: "telegram-nodes",
            type: "text",
            lastMessage: {
              sender: "Maria",
              content: "The sidebar looks great",
              time: "15:45",
            },
          },
          { id: "ch5", name: "mobile-app", type: "text" },
          { id: "ch6", name: "design-reviews", type: "text" },
        ],
      },
      {
        id: "c3",
        name: "VOICE CHANNELS",
        channels: [
          { id: "ch7", name: "Design Room", type: "voice" },
          { id: "ch8", name: "Quick Sync", type: "voice" },
        ],
      },
    ],
    roles: [
      {
        id: "r1",
        name: "Owner",
        color: "#FFD700",
        position: 100,
        permissions: {
          manageNode: true,
          manageChannels: true,
          manageRoles: true,
          manageMembers: true,
          kickMembers: true,
          banMembers: true,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: true,
          createInvites: true,
        },
      },
      {
        id: "r2",
        name: "Admin",
        color: "#E91E63",
        position: 90,
        permissions: {
          manageNode: false,
          manageChannels: true,
          manageRoles: false,
          manageMembers: true,
          kickMembers: true,
          banMembers: true,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: true,
          createInvites: true,
        },
      },
      {
        id: "r3",
        name: "Designer",
        color: "#2AABEE",
        position: 50,
        permissions: {
          manageNode: false,
          manageChannels: false,
          manageRoles: false,
          manageMembers: false,
          kickMembers: false,
          banMembers: false,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: false,
          createInvites: true,
        },
      },
      {
        id: "r4",
        name: "Member",
        color: "#9E9E9E",
        position: 10,
        permissions: {
          manageNode: false,
          manageChannels: false,
          manageRoles: false,
          manageMembers: false,
          kickMembers: false,
          banMembers: false,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: false,
          createInvites: false,
        },
      },
    ],
    members: [
      {
        id: "m1",
        name: "Gifty Kapula",
        avatar: "https://i.pravatar.cc/150?u=gifty",
        role: "admin",
        status: "online",
        nodeProfile: { name: "Gifty Designer", bio: "UI/UX Lead" },
      },
      {
        id: "m2",
        name: "Alex Chen",
        avatar: "https://i.pravatar.cc/150?u=alex",
        role: "owner",
        status: "online",
      },
      {
        id: "m3",
        name: "Maria Santos",
        avatar: "https://i.pravatar.cc/150?u=maria",
        role: "moderator",
        status: "online",
      },
      {
        id: "m4",
        name: "John Doe",
        initials: "JD",
        color: "#4CAF50",
        role: "member",
        status: "offline",
        lastSeen: "2 hours ago",
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Crypto Traders",
    description: "Trading signals, market analysis, and crypto discussions",
    initials: "CT",
    color: "#E5A036",
    memberCount: 2543,
    onlineCount: 891,
    unreadCount: 23,
    myRole: "member",
    isPublic: true,
    categories: [
      {
        id: "c1",
        name: "INFO",
        channels: [
          { id: "ch1", name: "rules", type: "announcement" },
          {
            id: "ch2",
            name: "announcements",
            type: "announcement",
            unreadCount: 5,
          },
        ],
      },
      {
        id: "c2",
        name: "TRADING",
        channels: [
          {
            id: "ch3",
            name: "signals",
            type: "text",
            unreadCount: 18,
            lastMessage: {
              sender: "TraderBot",
              content: "🚀 BTC Long Signal",
              time: "16:20",
            },
          },
          { id: "ch4", name: "analysis", type: "text" },
          { id: "ch5", name: "general", type: "text" },
        ],
      },
      {
        id: "c3",
        name: "VOICE",
        channels: [{ id: "ch6", name: "Trading Floor", type: "voice" }],
      },
    ],
    roles: [
      {
        id: "r1",
        name: "Admin",
        color: "#FFD700",
        position: 100,
        permissions: {
          manageNode: true,
          manageChannels: true,
          manageRoles: true,
          manageMembers: true,
          kickMembers: true,
          banMembers: true,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: true,
          createInvites: true,
        },
      },
      {
        id: "r2",
        name: "VIP",
        color: "#FF9800",
        position: 50,
        permissions: {
          manageNode: false,
          manageChannels: false,
          manageRoles: false,
          manageMembers: false,
          kickMembers: false,
          banMembers: false,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: false,
          createInvites: true,
        },
      },
      {
        id: "r3",
        name: "Member",
        color: "#9E9E9E",
        position: 10,
        permissions: {
          manageNode: false,
          manageChannels: false,
          manageRoles: false,
          manageMembers: false,
          kickMembers: false,
          banMembers: false,
          sendMessages: true,
          attachFiles: false,
          mentionEveryone: false,
          createInvites: false,
        },
      },
    ],
    members: [],
    createdAt: "2024-03-20",
  },
  {
    id: "3",
    name: "Gaming Hub",
    description: "Find teammates, discuss games, and join gaming sessions",
    avatar: "https://i.pravatar.cc/150?u=gaming",
    color: "#5EBB6E",
    memberCount: 856,
    onlineCount: 234,
    myRole: "member",
    isPublic: true,
    categories: [
      {
        id: "c1",
        name: "LOBBY",
        channels: [
          { id: "ch1", name: "welcome", type: "text" },
          {
            id: "ch2",
            name: "looking-for-group",
            type: "text",
            lastMessage: {
              sender: "GamerX",
              content: "Anyone up for Valorant?",
              time: "17:30",
            },
          },
        ],
      },
      {
        id: "c2",
        name: "GAMES",
        channels: [
          { id: "ch3", name: "valorant", type: "text" },
          { id: "ch4", name: "cs2", type: "text" },
          { id: "ch5", name: "minecraft", type: "text" },
        ],
      },
      {
        id: "c3",
        name: "VOICE",
        channels: [
          { id: "ch6", name: "Game Night", type: "voice" },
          { id: "ch7", name: "Chill Zone", type: "voice" },
        ],
      },
    ],
    roles: [],
    members: [],
    createdAt: "2024-06-10",
  },
  {
    id: "4",
    name: "Startup Founders",
    description: "Connect with entrepreneurs, share ideas, and build together",
    initials: "SF",
    color: "#9C27B0",
    memberCount: 1250,
    onlineCount: 89,
    unreadCount: 12,
    myRole: "member",
    isPublic: true,
    categories: [
      {
        id: "c1",
        name: "GENERAL",
        channels: [
          { id: "ch1", name: "introductions", type: "text" },
          {
            id: "ch2",
            name: "general-chat",
            type: "text",
            unreadCount: 8,
            lastMessage: {
              sender: "Founder123",
              content: "Just closed our seed round! 🎉",
              time: "16:45",
            },
          },
          { id: "ch3", name: "announcements", type: "announcement" },
        ],
      },
      {
        id: "c2",
        name: "RESOURCES",
        channels: [
          { id: "ch4", name: "funding-tips", type: "text" },
          { id: "ch5", name: "hiring", type: "text" },
          { id: "ch6", name: "legal-advice", type: "text" },
        ],
      },
      {
        id: "c3",
        name: "NETWORKING",
        channels: [
          { id: "ch7", name: "Pitch Practice", type: "voice" },
          { id: "ch8", name: "Office Hours", type: "video" },
        ],
      },
    ],
    roles: [
      {
        id: "r1",
        name: "Founder",
        color: "#9C27B0",
        position: 80,
        permissions: {
          manageNode: false,
          manageChannels: false,
          manageRoles: false,
          manageMembers: false,
          kickMembers: false,
          banMembers: false,
          sendMessages: true,
          attachFiles: true,
          mentionEveryone: false,
          createInvites: true,
        },
      },
    ],
    members: [],
    createdAt: "2024-04-15",
  },
];
