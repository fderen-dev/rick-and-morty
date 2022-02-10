import { CSSProperties } from 'react';

import { useTranslation } from 'react-i18next';

const style: CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  width: "100%",
};

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
      <div style={ style }>
          <h1 style={ { color: 'white' } }>{ t("home.header") }</h1>
      </div>
  )
}

export default App;
