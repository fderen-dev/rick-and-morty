import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Breakpoints } from './constants';

export const LargerThanMobile: FC = ({ children }) => {
  const isLargerThanMobile = useMediaQuery({
    minWidth: Breakpoints.MobileLandscape,
  });

  return isLargerThanMobile ? <>{children}</> : null;
};

export const Mobile: FC = ({ children }) => {
  const isMobileDevice = useMediaQuery({
    maxWidth: Breakpoints.MobileLandscape - 1,
  });

  return isMobileDevice ? <>{children}</> : null;
};
