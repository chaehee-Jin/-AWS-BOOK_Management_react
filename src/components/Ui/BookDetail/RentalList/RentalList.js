/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const table = css`
    border: 1px solid #dbdbdb;
    

`;
const thAndtd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;


`;

const RentalList = ({ bookId }) => {
    const getRentalList = useQuery(["getRentalList"], async() => {
        const option ={
            headers:{
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.get(`http://localhost:8080/book/${bookId}/rental/list`, option)
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
                                ? (<td css={thAndtd}>대여가능</td>) 
                                : (<td css={thAndtd}>대여중</td>)}
                        </tr>)
                    })}
                 </tbody>
               
            </table>
        </>
    );
};

export default RentalList;

///재런더링을 하려면 키값이 필요