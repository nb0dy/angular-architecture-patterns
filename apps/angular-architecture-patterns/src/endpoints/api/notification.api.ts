const notificationList = 'notifications';
const notificationItem = `${notificationList}/{notificationId}`;

export const notificationApi = {
  list: {
    url: notificationList,
  },
  item: {
    url: notificationItem,
  },
};
