import ReleaseChannelMenuExtra from './components/ReleaseChannelMenuExtra';

export const menuExtras = {
  ReleaseChannel: ReleaseChannelMenuExtra
};

export type ExtraKey = keyof typeof menuExtras;
