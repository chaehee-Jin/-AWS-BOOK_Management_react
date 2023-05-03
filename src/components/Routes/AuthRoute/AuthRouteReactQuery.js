import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import { refreshState } from '../../../atoms/Auth/AuthAtoms';
import { useRecoilState } from 'recoil';

const AuthRouteReactQuery = ({ path, element }) => {
    const [ refresh, setRefresh ] = useRecoilState(refreshState);
    const [{data: authenticated }, {data:principal}]= useQueries([
        {
            queryKey: ["authenticated"],  // 2개의 쿼리를 하나로 합치는 것 , 배열로 묶임 
            queryFn: async () => {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
                return response;
            },
            suspense:true
        },
        {
            queryKey:["principal"],
            queryFn: async () => {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/auth/principal", {params: {accessToken}});
                return response;
        },
        suspense:true
    }
    ]);

    // const { data, isLoading } = useQuery(["authenticated"], async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
    //     return response;
    // }, {
    //     enabled: refresh
    // });


    // const principal = useQuery(["principal"],async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     const response = await axios.get("http://localhost:8080/auth/principal", 
    //     {params:{accessToken}})
    //     return response;
    // },{
    //         enabled: data.data
    //         //무조건 ture인 상태여야지 데이터를 들고올수있음, 동기적인 처리를 하려면 key값을 가져와야함 
    //                             //데이터가 갔다가 오면 null -> true로 바뀌므로 그때서야 실행되는 것이 enabled
    //     }); 
       


    useEffect(() => {
        if(!refresh) {
            setRefresh(true);
        }
    }, [refresh]);
    
    if(authenticated.isLoading ) {
        return (<div>로딩중...</div>);
    }
    if(principal !== undefined){
        const roles = principal.data.data.authorities.split(",");
        //const hasadminPath = path.substr(0, 6) === "/admin";
            if(path.startsWith("/admin")&& !roles.includes("ROLE_ADMIN")){
                alert("접근권한이 없습니다");
                return<Navigate to="/"/>
        }
    }

    if(!authenticated.isLoading) {
        const permitAll = ["/login", "/register", "/password/forgot"];

        if(!authenticated.data.data) {
            if(permitAll.includes(path)){
                return element;
            }
            return <Navigate to="/login" />;
        }
        if(permitAll.includes(path)){ //인증되었을때
            return <Navigate to="/" />;
        }
       
        return element;
    }
};

export default AuthRouteReactQuery;