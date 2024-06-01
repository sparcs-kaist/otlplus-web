import axios from 'axios';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import moment from 'moment';
import Qs from 'qs';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { compose, legacy_createStore as createStore } from 'redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from '@/App';
import { API_URL, TRACKING_ID } from '@/const';
import DictionaryPage from '@/pages/DictionaryPage';
import PlannerPage from '@/pages/PlannerPage';
import TimetablePage from '@/pages/TimetablePage';
import WriteReviewsPage from '@/pages/WriteReviewsPage';
import SyllabusPage from '@/pages/SyllabusPage';
import MainPage from '@/pages/MainPage';
import AccountPage from '@/pages/AccountPage';
import EventBannerPage from '@/pages/EventBannerPage';
import CreditPage from '@/pages/CreditPage';
import LicensePage from '@/pages/LicensePage';
import PrivacyPage from '@/pages/PrivacyPage';
import TestPage from '@/pages/TestPage';
import ErrorPage from '@/pages/ErrorPage';
import rootReducer from '@/redux';
import registerServiceWorker from '@/registerServiceWorker';
import en from '@/translations/translation.en.json';
import ko from '@/translations/translation.ko.json';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

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

ReactGA.initialize([
  {
    trackingId: TRACKING_ID,
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  },
]);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(rootReducer, composeEnhancers());

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'dictionary',
        element: <DictionaryPage />,
      },
      { path: 'timetable', element: <TimetablePage /> },
      { path: 'timetable/syllabus', element: <SyllabusPage /> },
      { path: 'write-reviews', element: <WriteReviewsPage /> },
      { path: 'planner', element: <PlannerPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'eventBanner', element: <EventBannerPage /> },
      { path: 'credits', element: <CreditPage /> },
      { path: 'licenses', element: <LicensePage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'error/:message', element: <ErrorPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ReduxProvider>,
);

try {
  registerServiceWorker();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
