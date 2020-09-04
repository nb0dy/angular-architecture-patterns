import { HttpParams } from '@angular/common/http';

const removeLeadingSlashes = (url: string): string => url.replace(/^\/+/g, '');

const removeTrailingSlashes = (url: string): string => url.replace(/\/+$/, '');

const parseUrl = (url: string): string => `/${removeLeadingSlashes(url)}`;

export const getFullUrl = (baseUrl, url: string): string => {
  baseUrl = `${removeTrailingSlashes(baseUrl)}/`;
  if (url && url.startsWith(baseUrl)) {
    return url;
  }

  return `${removeTrailingSlashes(baseUrl)}${parseUrl(url)}`;
};

export const replaceParams = (url: string, httpParams?: HttpParams): string => {
  if (!httpParams || !httpParams.keys().length) {
    return url;
  }

  httpParams.keys().forEach((key: string) => {
    if (httpParams.has(key) && httpParams.getAll(key).length) {
      url = url.replace(`{${key}}`, httpParams.get(key));
    }
  });
  return url;
};

export const getParamsFromUrl = (url: string): string[] => {
  const matches = url.match(/{([^}]+)}/g);

  if (!matches) {
    return [];
  }

  return matches.map((match: string) => match.replace('{', '').replace('}', ''));
};
