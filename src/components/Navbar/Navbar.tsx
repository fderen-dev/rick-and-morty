import { FC } from 'react';

import { useModalContext } from 'context/ModalContext';
import { Desktop, Mobiles } from 'utils/Breakpoints';

import styles from './navbar.module.scss';

interface NavbarProps {}

const MobileNavigation: FC = ({ children }) => {
  const { open, openModal, closeModal } = useModalContext();

  const toggleModal = open
    ? closeModal
    : () => openModal(<nav>{children}</nav>);

  return <button onClick={toggleModal}>{open}</button>;
};

const DesktopNavigation: FC = ({ children }) => (
  <div className={styles.content}>
    <nav>{children}</nav>
    <div>language selector</div>
  </div>
);

export const Navbar: FC<NavbarProps> = ({ children }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>logo</div>
      <Mobiles>
        <MobileNavigation>{children}</MobileNavigation>
      </Mobiles>
      <Desktop>
        <DesktopNavigation>{children}</DesktopNavigation>
      </Desktop>
    </div>
  );
};
