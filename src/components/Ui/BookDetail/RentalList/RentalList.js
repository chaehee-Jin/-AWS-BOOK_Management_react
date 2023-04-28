/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const table = css`
    border: 1px solid #dbdbdb;
    

`;
const thAndtd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;


`;

const RentalList = ({ bookId }) => {
    const queryClient = useQueryClient();

    const getRentalList = useQuery(["getRentalList"], async() => {
        const option ={
            headers:{
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.get(`http://localhost:8080/book/${bookId}/rental/list`, option)
    });

const  rentalBook = useMutation(async(bookListId) => {
    
    const option = {
       
        headers:{
            "Content-Type": "application/json",
            Authorization:localStorage.getItem("accessToken")
        }
    }
    return await axios.post(`http://localhost:8080/book/rental/${bookListId}`, JSON.stringify({
        userId: queryClient.getQueryData("principal").data.userId
    }), option);
},{
    onSuccess: () => {
        queryClient.invalidateQueries("getRentalList")
    }


});
const returnBook = useMutation(async(bookListId) => {
    const option = {
        params:{
            userId:queryClient.getQueryData("principal").data.userId
        }, 
    headers:{
        Authorization:localStorage.getItem("accessToken")
    }
}
    return await axios.delete(`http://localhost:8080/book/rental/${bookListId}`, option);
},{
    onSuccess: () => {
        queryClient.invalidateQueries("getRentalList")
    }

});


    if(getRentalList.isLoading){
        return <div>불러오는 중...</div>
    }
    return (
        <>
            <table css={table}>
                 <thead>
                 <tr>
                    <th css={thAndtd}>도서번호</th>
                    <th css={thAndtd}>도서명</th>
                    <th css={thAndtd}>상태</th>
                </tr>
                </thead>
                <tbody>
                    {getRentalList.data.data.map(rentalData => {
                        return (<tr key={rentalData.bookListId}> 
                        
                            <td css={thAndtd}>{rentalData.bookListId}</td>
                            <td css={thAndtd}>{rentalData.bookName}</td>
                            {rentalData.rentalStatus
                                ? (<td css={thAndtd}>대여가능 <button onClick={() => {rentalBook.mutate(rentalData.bookListId)}}>대여</button></td>) 
                                : (<td css={thAndtd}>대여중 {rentalData.userId === queryClient.getQueryData("principal").data.userId
                                ? (<button onClick={()=> {returnBook.mutate(rentalData.bookListId)}}>반납</button>) : ""}</td>)}
                        </tr>)
                    })}
                 </tbody>
               
            </table>
        </>
    );
};

export default RentalList;

//재런더링을 하려면 키값이 필요
// 매번 버튼의 상태를 체크해서 상태를 바꿔주는 것보다 무조건 추천하기를 누르면 바뀌도록 확신을 하게 하는것 
// 요청전에 바꾸고 에러가 나면 이전 상태로 롤백을 하도록 리액트 쿼리가 실행해줌 
// 도서인데 추천이 걸릴수도 렌탈이 될수도 있음, 렌탈을 할때는 북아이디는 필요가 없음 