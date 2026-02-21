import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '@/common/utils/withRouter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames, guidelineBoundClassNames as classNames } from '../../boundClassNames';

import userShape from '../../../shapes/model/session/UserShape';

import logoImage from '../images/Services-OTL.svg';

export const getFullName = (user) => {
  // eslint-disable-next-line no-underscore-dangle
  const _isKorean = (string) => {
    // eslint-disable-next-line prefer-regex-literals
    const reg = new RegExp('[가-힣]+');
    return reg.test(string);
  };

  if (_isKorean(user.firstName) && _isKorean(user.lastName)) {
    return `${user.lastName}${user.firstName}`;
  }
  return `${user.firstName} ${user.lastName}`;
};

class Header extends Component {
  constructor(props) {
    super(props);

    const isBannerVisible = localStorage.getItem('isBannerVisible') !== 'false';
    if (!isBannerVisible) {
      document.documentElement.style.setProperty('--header-height', '55px');
    }

    this.state = {
      isMenuOpenOnMobile: false,
      noBackground: false,
      isBannerVisible,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setNoBackground);
    this.setNoBackground();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      this.setNoBackground();
      this.closeMenu();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setNoBackground);
  }

  closeMenu = () => {
    this.setState({
      isMenuOpenOnMobile: false,
    });
  };

  toggleMenu = () => {
    const { isMenuOpenOnMobile } = this.state;
    this.setState({
      isMenuOpenOnMobile: !isMenuOpenOnMobile,
    });
  };

  setNoBackground = () => {
    const mainImage = document.getElementsByClassName(appBoundClassNames('section--main-search'));
    if (mainImage.length === 0) {
      this.setState({
        noBackground: false,
      });
      return;
    }

    this.setState({
      noBackground: mainImage[0].getBoundingClientRect().top > 55,
    });
  };

  render() {
    const { t, i18n } = this.props;
    const { isMenuOpenOnMobile, noBackground, isBannerVisible } = this.state;
    const { user } = this.props;

    return (
      <header>
        {isBannerVisible && (
          <div
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#FFFF99',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div></div>
            <a
              href="/__switch/v4"
              style={{
                backgroundColor: '#FFFF99',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#5f5f5f',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
              }}>
              {t('ui.button.useNewOTL')}
              <div
                style={{
                  border: '1px #5f5f5f solid',
                  borderRadius: '10px',
                  marginLeft: '10px',
                  padding: '5px',
                }}>
                {t('ui.button.move')}
              </div>
            </a>
            <button
              onClick={() => {
                this.setState({ isBannerVisible: false });
                document.documentElement.style.setProperty('--header-height', '55px');
                localStorage.setItem('isBannerVisible', 'false');
              }}
              style={{
                background: 'none',
                border: 'none',
                width: '20px',
                height: '20px',
                marginRight: '10px',
                cursor: 'pointer',
                color: '#5f5f5f',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 0,
              }}
              aria-label="close">
              ✕
            </button>
          </div>
        )}
        <div className={classNames('identity-bar')} />
        <div
          className={classNames(
            'content',
            isMenuOpenOnMobile ? null : 'menu-closed',
            noBackground && !isMenuOpenOnMobile ? 'no-background' : null,
          )}>
          <button className={classNames('menu-icon-icon')} onClick={this.toggleMenu}>
            {isMenuOpenOnMobile ? (
              <i className={classNames('icon--header_menu_close')} />
            ) : (
              <i className={classNames('icon--header_menu_list')} />
            )}
          </button>
          <div className={classNames('content-left')}>
            <div className={classNames('logo')}>
              <span>
                <Link to="/">
                  <img src={logoImage} alt="OTL Logo" />
                </Link>
              </span>
            </div>
            <div className={classNames('menus')}>
              <span>
                <Link to="/dictionary">{t('ui.menu.dictionary')}</Link>
              </span>
              <span>
                <Link to="/timetable">{t('ui.menu.timetable')}</Link>
              </span>
              <span>
                <Link to="/write-reviews">{t('ui.menu.writeReviews')}</Link>
              </span>
              <span>
                <Link to="/planner">
                  {t('ui.menu.planner')}
                  <sup>BETA</sup>
                </Link>
              </span>
            </div>
          </div>
          <div className={classNames('content-right')}>
            <div className={classNames('special-menus')}>{null}</div>
            <div className={classNames('common-menus')}>
              <span>
                <button
                  onClick={() => i18n.changeLanguage(i18n.language.startsWith('ko') ? 'en' : 'ko')}>
                  <i className={classNames('icon--header_language')} />
                  <span>{t('ui.menu.toggleLang')}</span>
                </button>
              </span>
              {/*
              <span>
                <Link to=".">
                  <i className={classNames('icon--header_notification')} />
                  <span>{t('ui.menu.notifications')}</span>
                </Link>
              </span>
              */}
              <span>
                {user ? (
                  <Link to="/account">
                    <i className={classNames('icon--header_user')} />
                    <span>{getFullName(user)}</span>
                  </Link>
                ) : user === undefined ? (
                  <span>
                    <i className={classNames('icon--header_user')} />
                    <span>{t('ui.placeholder.loading')}</span>
                  </span>
                ) : process.env.VITE_DEV_MODE === 'true' ? (
                  <Link to="/developer-login">
                    <i className={classNames('icon--header_user')} />
                    <span>{t('ui.menu.signIn')} (Dev)</span>
                  </Link>
                ) : (
                  <a href={`/session/login/?next=${window.location.href}`}>
                    <i className={classNames('icon--header_user')} />
                    <span>{t('ui.menu.signIn')}</span>
                  </a>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.common.user.user,
});

const mapDispatchToProps = (dispatch) => ({});

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  user: userShape,
};

export default withTranslation()(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));
