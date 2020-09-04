import { notificationApi } from './notification.api';

export interface IEndpointApi {
  notification: {
    list: {
      url: string;
    };
    item: {
      url: string;
    };
  };
}

export const api: IEndpointApi = {
  notification: notificationApi
};
