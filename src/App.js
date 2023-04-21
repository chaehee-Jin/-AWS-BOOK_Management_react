import logo from './logo.svg';
import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Callback from './study/Callback';
import PromiseStudy from './study/PromiseStudy';
import Main from './pages/Main/Main';
import AuthRoute from './components/Routes/AuthRoute/AuthRoute';




function App() {

  return (
<>
    <Global styles={ Reset }></Global>
    <Routes>
      <Route exact path="/login" element={<AuthRoute path="/login" element={<Login/>}/>}></Route>
      <Route path="/register" element={<AuthRoute path="/register" element={<Register/>}/>}></Route>
      <Route path="/" element={<AuthRoute path="/" element={<Main/>}/> }/>
      {/* <Route path="/callback" Component={Callback}></Route>
      <Route path="/promise" Component={PromiseStudy}></Route> */}
      
    </Routes >
</>
  );
}

export default App;
// 리덕스는 react 전용은 아님, recoil은 react전용임 
//react query를 사용하는 이유: 리덕스를 대체하기 위해서, 전역 상태를 바꾸기위해서
//함수가 실행이되고나서 그안에서  await을 사용했을때 마지막 return에서 비동기 처리를 하는 도중에 return이 되어버림 -> 바뀌지 않은 상태에서 return이 되는 문제발생 
