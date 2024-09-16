import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface CountControllerProps {
  count: number;
  updateCount: (newCount: number) => void;
}

const CountController: React.FC<CountControllerProps> = ({ count, updateCount }) => {
  return (
    <div className={classNames('course-status--info--controller')}>
      <i
        className={classNames('icon', 'icon--planner-minus')}
        onClick={() => {
          if (count > 0) {
            updateCount(count - 1);
          }
        }}
      />
      <div>{count}</div>
      <i
        className={classNames('icon', 'icon--planner-plus')}
        onClick={() => {
          updateCount(count + 1);
        }}
      />
    </div>
  );
};

export default CountController;
