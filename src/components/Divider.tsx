import { appBoundClassNames as classNames } from '../common/boundClassNames';
import { Orientation } from '@/shapes/enum';

interface OrientationConfig {
  desktop: Orientation;
  mobile: Orientation;
}

interface VisibilityConfig {
  desktop: boolean;
  mobile: boolean;
}

interface DividerProps {
  orientation: Orientation | OrientationConfig;
  isVisible: boolean | VisibilityConfig;
  gridArea?: string;
}

const Divider = ({ orientation, isVisible, gridArea }: DividerProps) => {
  const orientationOnDesktop = typeof orientation === 'string' ? orientation : orientation.desktop;
  const orientationOnMobile = typeof orientation === 'string' ? orientation : orientation.mobile;
  const isVisibleOnDesktop = typeof isVisible === 'boolean' ? isVisible : isVisible.desktop;
  const isVisibleOnMobile = typeof isVisible === 'boolean' ? isVisible : isVisible.mobile;

  return (
    <div
      className={classNames(
        'divider',
        orientationOnDesktop === 'HORIZONTAL'
          ? 'divider--desktop-horizontal'
          : 'divider--desktop-vertical',
        orientationOnMobile === 'HORIZONTAL'
          ? 'divider--mobile-horizontal'
          : 'divider--mobile-vertical',
        isVisibleOnDesktop ? '' : 'desktop-hidden',
        isVisibleOnMobile ? '' : 'mobile-hidden',
      )}
      style={gridArea ? { gridArea: gridArea } : undefined}
    />
  );
};

export default Divider;
