import React, { Component } from 'react';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

class EventBannerPage extends Component {
  render() {
    return (
      <section className={classNames('content', 'content--no-scroll')}>
        <div className={classNames('page-grid', 'page-grid--full')}>
          <div className={classNames('section')}>
            <div className={classNames('subsection', 'subsection--license')}>
              <image />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EventBannerPage;
