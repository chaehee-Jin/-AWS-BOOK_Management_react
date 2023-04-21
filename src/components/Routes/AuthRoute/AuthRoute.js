import React from 'react';
import { Navigate } from 'react-router-dom';
import { authenticatedState } from '../../../atoms/Auth/AuthAtoms';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getAuthenticated } from '../../../api/auth/authApi';


const validateToken = async(accessToken) =>{
    const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
    return response.data;
}

const AuthRoute = ({ path, element }) => {
    const accessToken = localStorage.getItem("accessToken");
    const [ authenticated, setAuthenticated ] = useRecoilState(authenticatedState); // 인증이 되었는지 확인
    const {data, isLoading, error} = useQuery("authenticated",() => getAuthenticated(accessToken));
    setAuthenticated(data);

    const permitAll = ["/login", "/register", "/password/forgot"];


    if(!authenticated){ //set, get 둘다 됨 
        
        //새로고침을 했을때 false라고 해서 로그인이 안된것은 아님
        if(accessToken !== null){
            //필터역할
            validateToken(accessToken).then((flag) =>{ //비동기
                setAuthenticated(flag); 
            });
            if(authenticated){ //false인지 true인지 확인 
                return element;

            }
            console.log("페이지 이동 테스트");
            return <Navigate to={path}/>; //home으로 이동 
            
        } 
        if(permitAll.includes(path)){
            return element;

        }
        
        return <Navigate to="/login"/>;
        
    }
   

    if(permitAll.includes(path)){
        return<Navigate to="/"/>;
    }

    return element;



};

export default AuthRoute;