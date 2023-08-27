import React from 'react';

export const useOnKeypress = (key: KeyboardEvent['key'], fun: VoidFunction) => {
  React.useEffect(() => {
    const listenerFn = (ev: KeyboardEvent) => {
      if (ev.key === key) {
        fun();
      }
    };
    document.addEventListener('keydown', listenerFn, false);
    return () => document.removeEventListener('keydown', listenerFn, false);
  }, [fun, key]);
};

export const useOnEscape = (fn: VoidFunction) => {
  useOnKeypress('Escape', fn);
};
