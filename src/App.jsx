import axios from 'axios';
import qs from 'qs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';

import Header from './common/guideline/components/Header';
import AccountPage from './pages/AccountPage';
import CreditPage from './pages/CreditPage';
import DictionaryPage from './pages/DictionaryPage';
import ErrorPage from './pages/ErrorPage';
import LicensePage from './pages/LicensePage';
import MainPage from './pages/MainPage';
import PlannerPage from './pages/PlannerPage';
import PrivacyPage from './pages/PrivacyPage';
import SyllabusPage from './pages/SyllabusPage';
import TestPage from './pages/TestPage';
import TimetablePage from './pages/TimetablePage';
import WriteReviewsPage from './pages/WriteReviewsPage';

import commonReducer from './reducers/common/index';
import dictionaryReducer from './reducers/dictionary/index';
import plannerReducer from './reducers/planner/index';
import timetableReducer from './reducers/timetable/index';
import writeReviewsReducer from './reducers/write-reviews/index';

import { setIsPortrait } from './actions/common/media';
import { setSemesters } from './actions/common/semester';
import { setTracks } from './actions/common/track';
import { setUser } from './actions/common/user';

import BannerPopup from '@/common/components/popup/bannerPopup/BannerPopup';
import CampaignPopupImage from '@/features/campaign/components/popup/CampaignPopupImage';
import PopupMenu from './features/campaign/components/popup/PopupMenu';
import EventBannerPage from './pages/EventBannerPage';

import ReactGA from 'react-ga4';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const trackingId = 'G-8NSY19J0T3';
ReactGA.initialize([
  {
    trackingId,
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  },
]);

export const rootReducer = combineReducers({
  common: commonReducer,
  dictionary: dictionaryReducer,
  timetable: timetableReducer,
  writeReviews: writeReviewsReducer,
  planner: plannerReducer,
});

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : null,
);

const queryClient = new QueryClient();

class App extends Component {
  portraitMediaQuery = window.matchMedia('(max-aspect-ratio: 4/3)');

  STORAGE_KEY = 'otl-banner-key';
  CAMPAIGN_KEY = 'CMPGN-2023-08-24-v1';

  constructor(props) {
    super(props);

    let showPopup = false;

    const key = localStorage.getItem(this.STORAGE_KEY);
    if (key !== this.CAMPAIGN_KEY) {
      showPopup = true;
    }

    this.state = {
      doNotShowAgain: !showPopup,
      popupOpen: showPopup,
    };
  }

  componentDidMount() {
    this._fetchUser();

    this._fetchSemesters();

    this._updateSizeProperty();
    window.addEventListener('resize', this._updateSizeProperty);

    this._updateIsPortrait();
    this.portraitMediaQuery.addEventListener('change', this._updateIsPortrait);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateSizeProperty);

    this.portraitMediaQuery.removeEventListener('change', this._updateIsPortrait);
  }

  _fetchUser = () => {
    axios
      .get('/session/info', {
        metadata: {
          gaCategory: 'User',
          gaVariable: 'Get / Instance',
        },
      })
      .then((response) => {
        store.dispatch(setUser(response.data));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          store.dispatch(setUser(null));
        }
      });
  };

  _fetchSemesters = () => {
    axios
      .get('/api/semesters', {
        params: {
          order: ['year', 'semester'],
        },
        metadata: {
          gaCategory: 'Semester',
          gaVariable: 'GET / List',
        },
      })
      .then((response) => {
        store.dispatch(setSemesters(response.data));
      })
      .catch((error) => {});

    axios
      .get('/api/tracks', {
        params: {},
        metadata: {
          gaCategory: 'Track',
          gaVariable: 'GET / List',
        },
      })
      .then((response) => {
        store.dispatch(setTracks(response.data));
      })
      .catch((error) => {});
  };

  _updateSizeProperty = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  _updateIsPortrait = () => {
    store.dispatch(setIsPortrait(this.portraitMediaQuery.matches));
  };

  _setDoNotShow = (state) => {
    if (state === true) {
      this.setState({ doNotShowAgain: true });
      localStorage.setItem(this.STORAGE_KEY, this.CAMPAIGN_KEY);
    } else {
      this.setState({ doNotShowAgain: false });
      localStorage.removeItem(this.STORAGE_KEY);
    }
  };

  render() {
    const { popupOpen, doNotShowAgain } = this.state;

    const parseObject = (object) => {
      if (typeof object === 'object') {
        return Object.entries(object)
          .map(([k, v]) => [k, parseObject(v)])
          .reduce((acc, val) => Object.assign({}, acc, { [val[0]]: val[1] }), {});
      }

      if (/^-?[0-9]+$/.test(object)) {
        return parseInt(object, 10);
      }

      const keywords = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
      };
      if (object in keywords) {
        return keywords[object];
      }

      return object;
    };

    const parseQueryString = (search) => {
      const qsParsed = qs.parse(search, { ignoreQueryPrefix: true });

      return parseObject(qsParsed);
    };

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <>
            <Header />
            <Routes>
              <Route exact path="/dictionary" element={<DictionaryPage />} />
              <Route exact path="/planner" element={<PlannerPage />} />
              <Route exact path="/timetable" element={<TimetablePage />} />
              <Route exact path="/timetable/syllabus" element={<SyllabusPage />} />
              <Route exact path="/write-reviews" element={<WriteReviewsPage />} />
              <Route exact path="/account" element={<AccountPage />} />
              <Route exact path="/eventBanner" element={<EventBannerPage />} />
              <Route exact path="/credits" element={<CreditPage />} />
              <Route exact path="/licenses" element={<LicensePage />} />
              <Route exact path="/privacy" element={<PrivacyPage />} />
              {/* Temporary test page for axiom */}
              <Route exact path="/test" element={<TestPage />} />
              <Route exact path="/error/:message" element={<ErrorPage />} />
              <Route exact path="/" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
          <section>
            <BannerPopup
              popupOpen={popupOpen}
              setPopupOpen={(state) => this.setState({ popupOpen: state })}>
              <CampaignPopupImage closePopup={() => this.setState({ popupOpen: false })} />
              <PopupMenu
                onClose={() => {
                  ReactGA.event({
                    category: 'Campaign',
                    action: 'popup-close',
                  });
                  this.setState({ popupOpen: false });
                }}
                onDoNotShow={() => {
                  ReactGA.event({
                    category: 'Campaign',
                    action: 'popup-do-not-show',
                  });
                  this._setDoNotShow(true);
                  this.setState({ popupOpen: false });
                }}
              />
            </BannerPopup>
          </section>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }
}

const AppFC = () => {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return <App />;
};

export default AppFC;
