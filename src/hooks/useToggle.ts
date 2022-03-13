import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface UseToggle {
  setter: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  value: boolean;
}

export const useToggle = (initialValue?: boolean): UseToggle => {
  const [value, setValue] = useState(Boolean(initialValue));

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { setter: setValue, toggle, value };
};
