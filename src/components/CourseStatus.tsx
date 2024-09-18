import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface CourseInfo {
  name: string;
  controller: React.ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

interface CourseEntry {
  name: string;
  info: CourseInfo[];
}

interface CourseStatusProps {
  entries: CourseEntry[];
}

const CourseStatus: React.FC<CourseStatusProps> = ({ entries }) => {
  return (
    <div>
      {entries.map((e) => (
        <div className={classNames('course-status')} key={e.name}>
          <div className={classNames('course-status--name')}>{e.name}</div>
          <div>
            {e.info.map((k) => (
              <div
                className={classNames('course-status--info')}
                onMouseOver={k.onMouseOver}
                onMouseOut={k.onMouseOut}
                key={k.name}>
                <div className={classNames('course-status--info--name')}>{k.name}</div>
                <div />
                {k.controller}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseStatus;
