/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useQuery } from 'react-query';
import axios from 'axios';

const mainContainer = css`
    padding: 10px;
`;

const BookDetail = () => {
    const { bookId } = useParams();  //정보를 하나의 변수에 저장하기위해 useparams 사용
    const getBook = useQuery(["getBook"], async () => { //중복 값을 처리하기위해 useQuery사용 
        const option = {
            headers:{
                Authorization: localStorage.getItem("accessToken") // Authorization 헤더에 로컬 스토리지에서 가져온 accessToken 값을 넣기 위해 사용됨, Authorization 헤더는 사용자의 정보를 인증하기 위해 사용
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}`, option); // 비동기처리, 비동기로 처리를 하면 aixos가 get을 하고 return 실행
        return response; //jsx을 띄워줌 , aixos의 결과를 뿌려주도록 만들었음 
        //하지만 이렇게만 사용하면 값이 없는 상태에서 실행되는 오류가 발생 그래서 useQuery 또는 useState사용
        // useQuery 를 사용하지 않으려면 기다릴수 있는 isLoading을 따로 구현해야함 -> 데이터를 들고오면 state에 넣으면 상태가 변하면서 jsx가 뜨도록 만들면 됨 
        //캐시는 데이터를 저장하는 대신 서버까지는 안감, 캐싱을 처리를 안하면 페이지를 렌더링 할때마다 재렌더링 요청을 날려야함 -> 페이지 과부하 
    });
    if(getBook.isLoading){
        return <div>불러오는 중...</div>
    }
    if(!getBook.isLoading)
    return (
        <div css={mainContainer}>
            <Sidebar/>
            <header>
                <h1>{getBook.data.data.bookName}</h1>
                <p>분류:{getBook.data.data.categoryName} / 저자명:{getBook.data.data.authorName} / 출판사:{getBook.data.data.publisherName} / 추천:10</p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName}/>
                </div>
                <div>

                </div>
                <div>

                </div>
            </main>

        </div>
    );
};

export default BookDetail;