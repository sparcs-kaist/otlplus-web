import classNames from 'classnames/bind';

import appStyles from '@/sass/App.module.scss';
import guidelineStyles from './guideline/guideline.module.scss';

export const appBoundClassNames = classNames.bind(appStyles);
export const guidelineBoundClassNames = classNames.bind(guidelineStyles);
export const unboundClassNames = classNames;
