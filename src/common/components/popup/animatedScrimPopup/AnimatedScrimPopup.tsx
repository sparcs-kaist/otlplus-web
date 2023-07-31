import React from 'react';
import ReactDOM from 'react-dom';
import { asyncSleep } from '@/common/utils/asyncSleep';
import classNames from 'classnames';
import style from '@/common/sass/popup/_animatedScrimPopup.module.scss';
import globalStyle from '@/sass/global.module.scss';
import { motion } from 'framer-motion';
import { useOnEscape } from '@/common/utils/interaction/useOnKeyPress';

const PopupPortal: React.FC<React.PropsWithChildren> = (props) => {
  const [el, setEl] = React.useState<HTMLDivElement | undefined>();

  React.useEffect(() => {
    const _el = document.createElement('div');
    setEl(_el);
    let modalRoot = document.querySelector(`#popup-root`);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'popup-root');
      document.body.appendChild(modalRoot);
    }
    modalRoot.appendChild(_el);

    return () => {
      modalRoot && modalRoot.removeChild(_el);
    };
  }, []);

  return el ? ReactDOM.createPortal(props.children, el) : <></>;
};

interface IAnimatedScrimPopupProps {
  isOpen: boolean;
  onClose?: VoidFunction;
  noEscapeKeyBinding?: boolean;
}

const decideContainerClassName = (isOpen: boolean): string => {
  return classNames(
    style.container,
    isOpen ? style.containerShouldRender : style.containerShouldNotRender,
    globalStyle.scrollNoDisplay,
  );
};

const AnimatedScrimPopup: React.FC<React.PropsWithChildren<IAnimatedScrimPopupProps>> = (props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const preventRaceConditionID = React.useRef<number>(0);
  const [_isOpen, _setIsOpen] = React.useState(props.isOpen);
  const [animationState, setAnimationState] = React.useState<boolean>(props.isOpen);

  useOnEscape(
    props.noEscapeKeyBinding
      ? () => {
          return;
        }
      : props.onClose ?? (() => {}),
  );

  React.useEffect(() => {
    let mounted = true;
    const myID = ++preventRaceConditionID.current;
    const asyncFun = async () => {
      if (props.isOpen) {
        _setIsOpen(true);
        await asyncSleep(10);
        if (!mounted) return;
        if (preventRaceConditionID.current !== myID) return;
        setAnimationState(true);
        if (document && window) {
          document.body.style.position = 'fixed';
          document.body.style.overflowY = 'scroll';
          document.body.style.top = `-${window.scrollY}px`;
        }
      } else {
        setAnimationState(false);
        await asyncSleep(150);
        if (!mounted) return;
        if (preventRaceConditionID.current !== myID) return;
        _setIsOpen(false);
        if (document && window) {
          document.body.style.position = '';
          document.body.style.top = '';
        }
      }
    };
    asyncFun();

    return () => {
      mounted = false;
    };
  }, [props.isOpen]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onClose == null) {
      return;
    }
    if (e.target !== ref.current) {
      return;
    }
    props.onClose();
  };

  return (
    <div>
      <PopupPortal>
        <motion.div
          className={decideContainerClassName(_isOpen)}
          data-testid="popupContainer"
          ref={ref}
          onClick={handleClose}
          key={props.isOpen ? 'open' : 'close'}
          initial={{ opacity: props.isOpen ? 0 : 1 }}
          animate={{ opacity: props.isOpen ? 1 : 0 }}
          transition={{ duration: 0.15 }}>
          <div className={style.containerInner}>{props.children}</div>
        </motion.div>
      </PopupPortal>
    </div>
  );
};

export default AnimatedScrimPopup;
