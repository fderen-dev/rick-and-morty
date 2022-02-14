import { FC } from 'react';

import { useMediaQuery } from 'react-responsive';

import { Breakpoints } from './constants';

export const Desktop: FC = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: Breakpoints.Desktop });

  return isDesktop ? <>{ children }</> : null;
}

export const Mobiles: FC = ({ children }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: Breakpoints.Desktop - 1 });

  return isMobileDevice ? <>{ children }</> : null;
}