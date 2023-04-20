/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser, FiLock } from 'react-icons/fi';
import { BiRename } from 'react-icons/bi';
import axios from 'axios';



const container= css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px ;


`;
const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 600;


`;


const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 40px 20px;
    width: 400px;
`;

const authForm = css`
    width: 100%;
    
`;

const inputLabel = css`
    margin-left:5px;
    font-size: 12px;
    font-weight: 600;
`;


const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }
`;


const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;
const register = css`
    margin-top: 10px;
    font-weight: 600;     
`;
const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;




`;

const Register = () => {
    const navigate = useNavigate();
    
    const [registerUser, setRegisterUser] = useState({email:"", password:"", name:""})
    const [errorMessages, setErrorMessages] = useState({email:"", password:"", name:""});

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser({...registerUser, [name]: value })

    }

    const registeSubmit = async() => {
        const data = {
            ...registerUser
        }
        const option = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        try{

            const response = await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option) //메소드 호출, 무조건 이것부터 실행이 되어져야함 
            setErrorMessages({email:"", password:"", name:""});
            alert("회원가입 성공")
            navigate("/login");
            
        }catch(error ){
            setErrorMessages({email:"", password:"", name:"", ...error.response.data.errorData});
           
        }
        
        // .then(response =>{
        //     setErrorMessages({email:"", password:"", name:""});
        //     console.log(response);

        //<<await, async>>
        // 리턴한 결과 then을 저장하고 싶을 때 await을 사용, await은 async 함수 안에만 사용가능 
        // then 리턴값이 있는 경우에는 바로 변수에 값을 담을수 있음 , async를 사용하면 try ~ catch를 사용
            
       // })
        //<<promise>>
        // .then(str =>{
        //     console.log(str);
        //     return "test2";
        //     then안에는 무조건 return이 있고 이것은 무조건 promise -> .을 찍어서 결과를 계속 이어가면서 순차적으로 연결할수 있음 
        //     then 이 나오면 거의 promise
        // })

        //<<...>>
        // .catch(error => {
        //     setErrorMessages({email:"", password:"", name:"", ...error.response.data.errorData}); //매번 새로 초기화, ...을 찍으면 속성들을 옮겨줌 (깊은 복사)
        //     // 여기에서는 에러 응답이 email 또는 name만 오거나 둘다 올수 있음, 잘못된 데이터가 넘어가면 기존에 데이터는 사라지고 에러난 데이터만 남음 
        //     // 기존의 데이터는 원래 가지고 있고(기본적으로) 에러난 데이터만 덮어쓰는 형식이다
        // });

        // <<비동기, callback>>
        // 순서가 지켜져야한다면 비동기처리 안에다가 넣어야한다
        //console.log("비동기 테스트"); --> axios, 비동기: 페이지를 띄울때 순서대로가 아닌, 오래걸리는 것들은 따로 띄워줌 
        // 비동기는 settime , 하지만 이게 callback은 아님 
        // 내가원하는 순서대로 데이터가 처리되었을때 인증을 받아한다면 순서대로 처리될것 같지만 첫번째과정이 실행될때 다음 과정이 같이 실행될수 있음 
        // 그것을 막기위해 첫번째과정 함수안에 2번째 과정을 넣어서 첫번째 과정이 다끝나고 두번째 과정이 들어가는 것이 callback
        // ** 주의 ** 무조건적으로 비동기 처리를 한다고 함수를 연결연결해서 불러오면 callback지옥에 빠지기 쉬움 그것은 가독성이 떨어지니 주의
        
        // <<promise>>
        // promise: 생성을  할때 new promise(콜백함수) = new promise (f(resorve, reject)), promise는 객체, 변수와 메소드를 가질수 있음 
        // then, catch함수를 쓸수 있음 then은 그러면(결과), catch는 오류를 잡을 때 사용 ex) a.then / a.catch  or a.then.catch
        //then은 리솔브가 실행될때, catch는 리젝트가 실행될때 사용 


        //  <<target>>
        // target => e.target  -> onchange가 일어나면 각각 event 객체가 다 따로있음 const ch = (e) => {  여기서 e는 event를 의미 , event가 일어난 객체를 의미한다
        // e.target = document.querySelect 객체와 같다 즉 해당 객체의 이름이나 값을 가지고 온다는 것을 의미한다

        
    }
    return (
        <div css={container}>
           <header>
                <h1 css={logo}>SIGN UP</h1>
           </header>
           <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLabel}>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={onChangeHandle} name="email">
                        <FiUser/>
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.email}</div>

                    <label css={inputLabel}>Password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                        <FiLock/>
                    </LoginInput >
                    <div css={errorMsg}>{errorMessages.password}</div>

                    <label css={inputLabel}>Name</label>
                    <LoginInput type="text" placeholder="Type your name" onChange={onChangeHandle} name="name">
                        <BiRename/>
                    </LoginInput >
                    <div css={errorMsg}>{errorMessages.name}</div>
                    
                    <button css={loginButton} onClick={registeSubmit}>REGISTER</button>
                </div>
           </main>
            <div css={signupMessage}>Already a user?</div>
           <footer>
                <div css={register}><Link to="/login">LOGIN</Link></div>
           </footer>

        </div>
    );
};

export default Register;