import { VFC } from 'react';
import classNames from 'classnames/bind';

import portal from 'assets/images/portal.png';

import styles from './spinner.module.scss';

const cx = classNames.bind(styles);

interface SpinnerProps {
  maxWidth?: string;
  position?: 'relative' | 'absolute';
  absolutelyCentered?: boolean;
  className?: string;
}

export const Spinner: VFC<SpinnerProps> = ({
  maxWidth = '150px',
  position = 'absolute',
  absolutelyCentered = true,
  className,
}) => {
  return (
    <img
      src={portal}
      width="100%"
      className={cx(styles.image, className, {
        [styles.absolutelyCentered]: absolutelyCentered,
      })}
      alt="Green portal"
      style={{
        maxWidth: maxWidth,
        position: position,
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
