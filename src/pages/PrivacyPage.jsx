import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import Scroller from '../components/Scroller';

// eslint-disable-next-line import/no-unresolved
import privacyMarkdown from '../../PRIVACY.md?raw'

const markdownComponents = {
  h1: (props) => <div {...props} className={classNames('title')} />,
  h2: (props) => <div {...props} className={classNames('small-title')} />,
};

class PrivacyPage extends Component {
  render() {
    return (
      <section className={classNames('content', 'content--no-scroll')}>
        <div className={classNames('page-grid', 'page-grid--full')}>
          <div className={classNames('section')}>
            <div className={classNames('subsection', 'subsection--privacy')}>
              <Scroller>
                <div className={classNames('subsection--privacy__content')}>
                  <ReactMarkdown components={markdownComponents}>{privacyMarkdown}</ReactMarkdown>
                </div>
              </Scroller>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PrivacyPage;
