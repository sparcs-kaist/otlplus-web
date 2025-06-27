import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface Entry {
  name: string;
  score: string | React.ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

interface ScoresProps {
  entries: Entry[];
  big?: boolean;
}

const Scores = ({ entries, big }: ScoresProps) => {
  return (
    <div className={classNames('scores', big ? 'scores--big' : undefined)}>
      {entries.map((e) => (
        <div onMouseOver={e.onMouseOver} onMouseOut={e.onMouseOut} key={e.name}>
          <div>{e.score}</div>
          <div>{e.name}</div>
        </div>
      ))}
    </div>
  );
};
export default Scores;
