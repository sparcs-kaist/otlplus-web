import React, { useState } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface ScrollerProps {
  onScroll?: () => void;
  noScrollX?: boolean;
  noScrollY?: boolean;
  expandTop?: number;
  expandBottom?: number;
  children: React.ReactNode;
}

const Scroller = ({
  onScroll,
  children,
  noScrollX = true,
  noScrollY = false,
  expandTop = 0,
  expandBottom = 12,
}: ScrollerProps) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(true);
    if (onScroll) {
      onScroll();
    }
  };

  const handleScrollStop = async () => {
    // Adding delay before resetting scrolling state
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsScrolling(false);
  };

  return (
    <Scrollbar
      className={classNames(noScrollX ? 'noX' : '', noScrollY ? 'noY' : '')}
      style={{
        flex: '1 1 0px',
        marginTop: `-${expandTop}px`,
        marginBottom: `-${expandBottom}px`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: 'calc(100% + 12px)',
        height: 'initial',
        marginRight: '-12px',
        paddingRight: '12px',
      }}
      wrapperProps={{
        style: {
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      scrollerProps={{
        style: {
          flex: '1 1 auto',
        },
      }}
      contentProps={{
        style: {
          padding: '0',
          minWidth: '100%',
          minHeight: `calc(100% - ${expandTop + expandBottom}px)`,
          marginTop: `${expandTop}px`,
          marginBottom: `${expandBottom}px`,
          width: noScrollX ? undefined : 'fit-content',
          height: noScrollY ? undefined : 'fit-content',
        },
      }}
      trackXProps={{
        style: {
          left: '0',
          bottom: '0',
          height: '12px',
          width: 'calc(100% - 12px)',
          backgroundColor: 'transparent',
          transition: 'opacity 0.3s',
          opacity: isScrolling ? '1' : isMouseIn ? '0.25' : '0',
        },
      }}
      trackYProps={{
        style: {
          top: `${expandTop}px`,
          right: '0',
          width: '12px',
          height: `calc(100% - ${expandTop + expandBottom}px)`,
          backgroundColor: 'transparent',
          transition: 'opacity 0.3s',
          opacity: isScrolling ? '1' : isMouseIn ? '0.25' : '0',
        },
      }}
      thumbXProps={{
        style: {
          height: '4px',
          borderRadius: '2px',
          margin: '4px 0',
          backgroundColor: 'rgba(128, 128, 128, 0.4)',
        },
      }}
      thumbYProps={{
        style: {
          width: '4px',
          borderRadius: '2px',
          margin: '0 4px',
          backgroundColor: 'rgba(128, 128, 128, 0.4)',
        },
      }}
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
      onScroll={handleScroll}
      onScrollStop={handleScrollStop}
      minimalThumbSize={24}
      noScrollX={noScrollX}
      noScrollY={noScrollY}>
      {children}
    </Scrollbar>
  );
};

export default Scroller;
