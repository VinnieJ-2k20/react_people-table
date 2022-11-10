import { FC, useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { PeopleTableHooks } from './components/PeopleTableHooks';

export const App: FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      const timeoutId = setTimeout(() => {
        setLoaded(true);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [],
  );

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      {loaded ? (
        // <PeopleTable />
        <PeopleTableHooks />
      ) : (
        <Loader />
      )}
    </div>
  );
};
