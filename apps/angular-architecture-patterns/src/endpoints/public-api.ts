import { api, IEndpointApi } from './api';

export interface IEndpoint {
  api: IEndpointApi;
}

export const endpoints: IEndpoint = {
  api,
};
