import React from 'react';
import style from '../../sass/utils/_mobileOnly.module.scss';

const MobileOnly: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={style.mobileOnly}>{props.children}</div>;
};

export default MobileOnly;
