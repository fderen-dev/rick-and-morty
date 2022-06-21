import { VFC } from 'react';
import classNames from 'classnames/bind';

import portal from 'assets/images/portal.png';

import styles from './spinner.module.scss';

const cx = classNames.bind(styles);

interface SpinnerProps {
  maxWidth?: string;
  position?: 'relative' | 'absolute';
  absolutelyCentered?: boolean;
}

export const Spinner: VFC<SpinnerProps> = ({
  maxWidth = '150px',
  position = 'absolute',
  absolutelyCentered = true
}) => {
  return (
    <img
      src={portal}
      width="100%"
      className={cx(styles.image, {
        [styles.absolutelyCentered]: absolutelyCentered
      })}
      alt="Green portal"
      style={{
        maxWidth: maxWidth,
        position: position
      }}
    />
  );
};

export const FullScreenSpinner: VFC<SpinnerProps> = (props) => {
  return (
    <div className={cx(styles.overlay)}>
      <Spinner {...props} />
    </div>
  );
};
