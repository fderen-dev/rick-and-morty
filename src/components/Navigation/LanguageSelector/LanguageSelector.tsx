import { useState, VFC } from 'react';
import { useTranslation } from 'react-i18next';
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
    <Button
      variant={ButtonVariants.RAW}
      onClick={() => onClick(item)}
      role="option"
      lang={item.code}
      aria-label={item.label}
    >
      <span aria-hidden="true">{item.code}</span>
    </Button>
  </li>
);

interface LanguageSelectorProps {
  vertical?: boolean;
}

export const LanguageSelector: VFC<LanguageSelectorProps> = ({ vertical }) => {
  const { t } = useTranslation();
  const [languages] = useState(
    Object.entries(SupportedLanguages).map(
      ([key, value]) =>
        ({
          code: key.toLowerCase(),
          label: value
        } as Language)
    )
  );
  const [currentLanguage, setCurrentLaguage] = useState<Language>({
    code: i18n.language,
    label: languages.find((lang) => lang.code === i18n.language)?.label!
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
    <div className={cx(styles.menu, { vertical })} id="language-selector">
      <span className="sr-only">
        {t('navbar.language-selector.label-aria')}
      </span>
      <ul className={cx(styles.menuList, { isOpen })} role="listbox">
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
      <Button
        variant={ButtonVariants.RAW}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={t('navbar.language-selector-toggle-aria')}
        aria-controls="language-selector"
      >
        <div
          className={styles.currentItem}
          lang={currentLanguage.code}
          aria-selected="true"
          aria-label={currentLanguage.label}
        >
          <span aria-hidden="true">{currentLanguage.code}</span>
        </div>
      </Button>
    </div>
  );
};
