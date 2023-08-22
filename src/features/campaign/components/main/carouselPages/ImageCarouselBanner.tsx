import React from 'react';

import style from '../../../sass/_imageCarouselBanner.module.scss';
import { DeviceType, detectDeviceType } from '@/common/utils/detectDeviceType';

type ICta = {
  link?: string;
  cta?: string;
  imageUrl?: string;
};

interface IImageCarouselBannerProps {
  ifAndroid?: ICta;
  ifIOS?: ICta;
  ifMacOS?: ICta;
  ifWindows?: ICta;
  ifDefault: Required<ICta>;
}

const ImageCarouselBanner: React.FC<IImageCarouselBannerProps> = (props) => {
  const [url, setUrl] = React.useState<string>(props.ifDefault.link);
  const [cta, setCta] = React.useState<string>(props.ifDefault.cta);
  const [imageUrl, setImageUrl] = React.useState<string>(props.ifDefault.imageUrl);

  React.useEffect(() => {
    // Call this inside useEffect so that future migrations
    // to ssr are painless
    const deviceType = detectDeviceType();
    switch (deviceType) {
      case DeviceType.android:
        if (props.ifAndroid === undefined) break;
        setUrl(props.ifAndroid.link ?? props.ifDefault.link);
        setCta(props.ifAndroid.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifAndroid.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.ios:
        if (props.ifIOS === undefined) break;
        setUrl(props.ifIOS.link ?? props.ifDefault.link);
        setCta(props.ifIOS.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifIOS.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.macos:
        if (props.ifMacOS === undefined) break;
        setUrl(props.ifMacOS.link ?? props.ifDefault.link);
        setCta(props.ifMacOS.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifMacOS.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.windows:
        if (props.ifWindows === undefined) break;
        setUrl(props.ifWindows.link ?? props.ifDefault.link);
        setCta(props.ifWindows.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifWindows.imageUrl ?? props.ifDefault.imageUrl);
        break;
    }
  }, []);

  return (
    <div
      className={style.containerExternal}
      onClick={() => {
        window.location.href = url;
      }}>
      <div className={style.container} id="test">
        <img src={imageUrl} alt="banner" />
      </div>
      {/* <div className={style.containerLinkCover}>
        <div className={style.containerCta}>
          <p>{cta}</p>
        </div>
      </div> */}
    </div>
  );
};

export default ImageCarouselBanner;
