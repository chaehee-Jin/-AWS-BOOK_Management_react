import logo from './logo.svg';
import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import AuthRoute from './components/Routes/AuthRoute/AuthRoute';
import AuthRouteReactQuery from './components/Routes/AuthRoute/AuthRouteReactQuery';




function App() {
  console.log("test");

  return (
<>
    <Global styles={ Reset }></Global>
    <Routes>
      <Route exact path="/login" element={<AuthRouteReactQuery path="/login" element={<Login/>}/>}></Route>
      <Route path="/register" element={<AuthRouteReactQuery  path="/register" element={<Register/>}/>}></Route>
      <Route path="/" element={<AuthRouteReactQuery  path="/" element={<Main/>}/> }/>
      <Route path="/admin/search" element={<AuthRouteReactQuery  path="/" element={<Main/>}/> }/>
     

      {/* <Route path="/callback" Component={Callback}></Route>
      <Route path="/promise" Component={PromiseStudy}></Route> */}
      
    </Routes >
</>
  );
}

export default App;
// 리덕스는 react 전용은 아님, recoil은 react전용임 (동기처리)
//react query를 사용하는 이유: 리덕스를 대체하기 위해서, 전역 상태를 바꾸기위해서(비동기처리)
//함수가 실행이되고나서 그안에서  await을 사용했을때 마지막 return에서 비동기 처리를 하는 도중에 return이 되어버림 -> 바뀌지 않은 상태에서 return이 되는 문제발생 
// promise를 사용하는 이유: 비동기처리를 순차적으로 하기 위해서
// async를 달아주면 비동기 promise가 된다 -> promise에는 then을 사용하는데 이거 대신 await을 사용
// 결국 return은 promise , authroute = component인데 이것의 return은 jsx를 return해주어야하는데(그래야 화면을 보여줌 ) promise를 return하는 문제발생  


//usequery는 get요청만 쓴다 get요청을 하면 내가 이전에 get요청을 한적이 있으면 상태에 그 값을 가지고 있음, 값이 같으면 중복요청을 없애버림 (자동처리)
// react-query는 각종 상태를 저장하고 부가가능을 제공한다, 전처리  
//QueryClientProvider는 그것들을 저장하는 저장소  = 스토어 같은 개념 
// 랜더가 다시되는 시점  = 마운트, 마운트가 되면 자동으로 유즈 이펙트가 실행 

