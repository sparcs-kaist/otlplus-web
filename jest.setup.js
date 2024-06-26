import '@testing-library/jest-dom';
import axios from 'axios';

// eslint-disable-next-line no-undef
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'ko',
      },
    };
  },

  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
}));

axios.defaults.baseURL = 'http://localhost';
