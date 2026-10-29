import { forwardRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import FunctionalComponent from './Functionalcomponent';
import ClassComponent from './Classcomponent';

function App() {
  return (
    <div>
      <h1>React Components Demo</h1>

      <FunctionalComponent />

      <ClassComponent />
    </div>
  );
}

export default App;
