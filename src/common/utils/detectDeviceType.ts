import { isIOS, isAndroid, isWindows, isMacOs } from 'react-device-detect';

export enum DeviceType {
  android,
  ios,
  macos,
  windows,
  other,
}

export const detectDeviceType = (): DeviceType => {
  if (isIOS) return DeviceType.ios;
  if (isAndroid) return DeviceType.android;
  if (isWindows) return DeviceType.windows;
  if (isMacOs) return DeviceType.macos;
  return DeviceType.other;
};
