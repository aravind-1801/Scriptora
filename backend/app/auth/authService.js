import { db } from '../models/db.js';

export function getCurrentUser() {
  return db.currentUser;
}

export function login(credentials) {
  const { email, password, provider } = credentials || {};
  const user = {
    id: "user-1",
    name: email ? email.split('@')[0] : "Arun Kumar",
    displayName: email ? email.split('@')[0] : "Arun Kumar",
    headline: "Screenwriter & Narrative Director",
    email: email || "arun.kumar@scriptora.studio",
    badge: "Member Pro",
    initials: email ? email.slice(0, 2).toUpperCase() : "AK",
    stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
  };
  db.currentUser = user;
  return user;
}

export function register(data) {
  const { name, email } = data || {};
  const user = {
    id: `user-${Date.now()}`,
    name: name || "New Writer",
    displayName: name || "New Writer",
    headline: "Screenwriter",
    email: email || "writer@scriptora.studio",
    badge: "Member Pro",
    initials: (name || "NW").slice(0, 2).toUpperCase(),
    stats: { drafts: 1, coAuthors: 0, healthIndex: "100%" }
  };
  db.currentUser = user;
  return user;
}

export function verifyOtp(phone) {
  const user = {
    id: "user-phone",
    name: "Verified Writer",
    displayName: "Verified Writer",
    headline: "Screenwriter",
    phone: phone || "+1-555-0192",
    email: "phone.writer@scriptora.studio",
    badge: "Member Pro",
    initials: "VW",
    stats: { drafts: 3, coAuthors: 1, healthIndex: "95%" }
  };
  db.currentUser = user;
  return user;
}

export function signOut() {
  db.currentUser = null;
  return { success: true };
}
