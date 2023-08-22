import React from 'react';
import style from '../../sass/utils/_desktopOnly.module.scss';

const DesktopOnly: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={style.desktopOnly}>{props.children}</div>;
};

export default DesktopOnly;
