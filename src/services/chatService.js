import { initialChats, initialContacts, initialNotifications } from '../commons/mockData';

export const chatService = {
  getChats: () => initialChats,
  getContacts: () => initialContacts,
  getNotifications: () => initialNotifications,

  searchItems: (items, query, key = 'name') => {
    if (!query || !query.trim()) return items;
    return items.filter(item =>
      item[key]?.toLowerCase().includes(query.trim().toLowerCase())
    );
  },
};