export const initialChats = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Tối nay đi cà phê không bạn?',
    time: '14:20',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Mình đã gửi file báo cáo rồi nhé.',
    time: '13:05',
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Lê Hoàng C',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Ok, chốt deadline ngày mai.',
    time: 'Hôm qua',
    unreadCount: 5,
    online: true,
  },
];

export const initialContacts = [
  { id: '1', name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?img=1', online: true },
  { id: '2', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=5', online: false },
  { id: '3', name: 'Lê Hoàng C', avatar: 'https://i.pravatar.cc/150?img=8', online: true },
  { id: '4', name: 'Phạm Minh D', avatar: 'https://i.pravatar.cc/150?img=11', online: false },
  { id: '5', name: 'Hoàng Lan E', avatar: 'https://i.pravatar.cc/150?img=9', online: true },
];

export const initialNotifications = [
  {
    id: '1',
    content: 'Nguyễn Văn A vừa gửi cho bạn một tin nhắn mới.',
    time: '5 phút trước',
    isRead: false,
  },
  {
    id: '2',
    content: 'Bạn có lời mời tham gia nhóm Công việc React Native.',
    time: '1 giờ trước',
    isRead: false,
  },
  {
    id: '3',
    content: 'Hệ thống đã cập nhật phiên bản mới v1.0.2.',
    time: '2 ngày trước',
    isRead: true,
  },
];