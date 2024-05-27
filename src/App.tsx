import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';

import { CAMPAIGN_KEY, STORAGE_KEY } from '@/const';
import Header from '@/common/guideline/components/Header';
import BannerPopup from '@/common/components/popup/bannerPopup/BannerPopup';
import CampaignPopupImage from '@/features/campaign/components/popup/CampaignPopupImage';
import PopupMenu from '@/features/campaign/components/popup/PopupMenu';
import { setIsPortrait, setSemesters, setTracks, setUser } from '@/redux/actions/common';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(localStorage.getItem(STORAGE_KEY) !== CAMPAIGN_KEY);
  const portraitMediaQuery = window.matchMedia('(max-aspect-ratio: 4/3)');

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  useEffect(() => {
    fetchUser();
    fetchSemesters();
    updateSizeProperty();
    window.addEventListener('resize', updateSizeProperty);
    updateIsPortrait();
    portraitMediaQuery.addEventListener('change', updateIsPortrait);
    return () => {
      window.removeEventListener('resize', updateSizeProperty);
      portraitMediaQuery.removeEventListener('change', updateIsPortrait);
    };
  }, []);

  const fetchUser = () => {
    axios
      .get('/session/info', {
        metadata: {
          gaCategory: 'User',
          gaVariable: 'Get / Instance',
        },
      })
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setUser(null));
        }
      });
  };

  const fetchSemesters = () => {
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
        dispatch(setSemesters(response.data));
      })
      .catch(() => {});

    axios
      .get('/api/tracks', {
        params: {},
        metadata: {
          gaCategory: 'Track',
          gaVariable: 'GET / List',
        },
      })
      .then((response) => {
        dispatch(setTracks(response.data));
      })
      .catch(() => {});
  };

  const updateSizeProperty = () => {
    document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  };

  const updateIsPortrait = () => {
    dispatch(setIsPortrait(portraitMediaQuery.matches));
  };

  const setDoNotShow = (state: boolean) => {
    if (state) {
      // setDoNotShowAgain(true);
      localStorage.setItem(STORAGE_KEY, CAMPAIGN_KEY);
    } else {
      // setDoNotShowAgain(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <>
      <Header />
      <Outlet />
      <section>
        <BannerPopup popupOpen={popupOpen} setPopupOpen={setPopupOpen}>
          <CampaignPopupImage closePopup={() => setPopupOpen(false)} />
          <PopupMenu
            onClose={() => {
              ReactGA.event({
                category: 'Campaign',
                action: 'popup-close',
              });
              setPopupOpen(false);
            }}
            onDoNotShow={() => {
              ReactGA.event({
                category: 'Campaign',
                action: 'popup-do-not-show',
              });
              setDoNotShow(true);
              setPopupOpen(false);
            }}
          />
        </BannerPopup>
      </section>
    </>
  );
};

export default App;
