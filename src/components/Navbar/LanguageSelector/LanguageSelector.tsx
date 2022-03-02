import { useState, VFC } from 'react';
import clasNames from 'classnames/bind';
import { useToggle } from 'hooks/useToggle';
import i18n from 'i18n';

import { Button, Variants as ButtonVariants } from 'components/Button';

import { SupportedLanguages } from 'utils/constants';

import styles from './languageSelector.module.scss';

const cx = clasNames.bind(styles);

type Language = {
  code: string;
  label: string;
};

interface ListItemProps {
  item: Language;
  className: string;
  onClick: (item: Language) => void;
}

const ListItem: VFC<ListItemProps> = ({ className, item, onClick }) => (
  <li className={className} key={item.code}>
    <Button variant={ButtonVariants.RAW} onClick={() => onClick(item)}>
      {item.label}
    </Button>
  </li>
);

export const LanguageSelector: VFC = () => {
  const [languages] = useState(
    Object.values(SupportedLanguages).map(
      (code) =>
        ({
          code,
          label: code
        } as Language)
    )
  );
  const [currentLanguage, setCurrentLaguage] = useState<Language>({
    code: i18n.language,
    label: i18n.language
  });
  const { value: isOpen, toggle } = useToggle();

  const handleChange = (selection: Language): void => {
    if (selection.code !== currentLanguage.code) {
      i18n.changeLanguage(selection.code);
      setCurrentLaguage(selection);
    }
    toggle();
  };

  return (
    <div className={styles.menu}>
      <ul className={cx(styles.menuList, { isOpen })}>
        {languages.map((language) => {
          if (language.code === currentLanguage.code) {
            return null;
          }

          return (
            <ListItem
              item={language}
              onClick={handleChange}
              key={language.code}
              className={cx(styles.menuListItem, { isOpen })}
            />
          );
        })}
      </ul>
      <Button variant={ButtonVariants.RAW} onClick={toggle}>
        <div className={styles.currentItem}>{currentLanguage.label}</div>
      </Button>
    </div>
  );
};
