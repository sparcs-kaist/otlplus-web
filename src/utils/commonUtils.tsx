import React from 'react';

type ComapreFunc = <T>(v1: T, v2: T) => number;

export const unique = <T,>(array: T[], compareFunction: ComapreFunc) => {
  if (!compareFunction) {
    return Array.from(new Set(array));
  }
  return array.filter((v, i) => array.findIndex((v2) => compareFunction(v, v2)) === i);
};

export const formatNewlineToBr = (content: string) => {
  const contentLines = content.split('\n');
  return contentLines
    .map((l, i) => ({
      key: i,
      content: l,
    })) // Workaround key error
    .map((l, i) =>
      i === contentLines.length - 1 ? (
        <React.Fragment key={l.key}>{l.content}</React.Fragment>
      ) : (
        <React.Fragment key={l.key}>
          {l.content}
          <br />
        </React.Fragment>
      ),
    );
};
