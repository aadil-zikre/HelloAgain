export interface User {
  id: string;
  email: string;
  displayName: string;
  timezone: string;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  inApp: boolean;
  pushNotifications: boolean;
  birthdayReminders: {
    enabled: boolean;
    daysInAdvance: number[];
  };
  checkInReminders: boolean;
}

export interface Contact {
  id: string;
  userId: string;
  fullName: string;
  nickname?: string;
  phoneNumber?: string;
  email?: string;
  birthday?: string;
  relationshipType?: string;
  profilePicture?: string;
  categories: string[];
  customFields: { [key: string]: string };
  createdAt: string;
  updatedAt: string;
}

export interface LifeEvent {
  id: string;
  contactId: string;
  eventType: string;
  date: string;
  description: string;
  media?: string[];
  createdAt: string;
}

export interface CheckInReminder {
  id: string;
  contactId: string;
  userId: string;
  frequency: string;
  lastContactDate?: string;
  nextCheckInDate: string;
  isCompleted: boolean;
}

export interface MessageTemplate {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
} 