import { forwardRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

    const name = "Ravi";
    const age = 20;
    const department = "CSE";


    return (
        <div>
            <h1>Student Information</h1>


            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Department: {department}</p>


            <button onClick={() => alert("Welcome " + name)}>
                Welcome
            </button>
        </div>
    );



  
}



export default App
