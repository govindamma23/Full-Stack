import { forwardRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Student from './component';
function App() {

    
    const studentName = "Ravi";
    const studentAge = 20;


    return (
        <Student
            name={studentName}
            age={studentAge}
        />
    );




  
}



export default App
