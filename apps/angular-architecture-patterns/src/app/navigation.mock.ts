import { endpoints } from '../endpoints';

import { METHOD_TYPE, IMockUrl } from '@angular-architecture-patterns/core/mock';

export const data: IMockUrl[] = [
  {
    url: endpoints.api.notification.item.url,
    method: METHOD_TYPE.GET,
    params: {
      notificationId: '123',
    },
    responses: {
      success: {
        notificationId: 123,
        title: 'Sample notification',
      },
    },
  },
];
