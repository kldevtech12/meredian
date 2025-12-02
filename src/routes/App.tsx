import type React from 'react';
import { Outlet } from 'react-router';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <>
      <div className={styles.main}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
