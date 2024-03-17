import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';

import en from './translations/translation.en.json';
import ko from './translations/translation.ko.json';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
    },
    fallbackLng: ['ko', 'en'],
    debug: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: (value, formatting, lng) => {
        if (value instanceof Date) {
          return moment(value)
            .locale(lng ?? 'ko')
            .format(formatting);
        }
        return value.toString();
      },
    },
  });

import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata: {
      gaCategory: string;
      gaVariable: string;
      startTime?: Date;
      endTime?: Date;
      duration?: number;
    };
  }
}

import Qs from 'qs';
import { API_URL } from './const';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

axios.defaults.paramsSerializer = (params) => Qs.stringify(params, { arrayFormat: 'repeat' });

axios.interceptors.request.use(
  (config) => {
    config.metadata = {
      ...config.metadata,
      startTime: new Date(),
    };
    return config;
  },
  // eslint-disable-next-line arrow-body-style
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date();
    response.config.metadata.duration =
      response.config.metadata.endTime.getTime() - response.config.metadata.startTime!.getTime();

    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date();
    error.config.metadata.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
  },
);

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
  throw new Error('There must be root element');
}

const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

import registerServiceWorker from './registerServiceWorker';

try {
  registerServiceWorker();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
