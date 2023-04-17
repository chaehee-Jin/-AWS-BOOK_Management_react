import logo from './logo.svg';
import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';


function App() {
  return (
<>
    <Global styles={ Reset }></Global>
    <Routes>
      <Route exact path="/login" Component={Login}></Route>
    </Routes>
</>
  );
}

export default App;
