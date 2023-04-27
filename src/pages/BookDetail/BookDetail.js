/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import RentalList from '../../components/UI/BookDetail/RentalList/RentalList';

const mainContainer = css`
    padding: 10px;
`;

const BookDetail = () => {
    const { bookId } = useParams();  //정보를 하나의 변수에 저장하기위해 useparams 사용
    const queryClient = useQueryClient();
   

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

    const getLikeCount = useQuery(["getLikeCount"], async()=> {
        const option = {
            headers:{
                Authorization: localStorage.getItem("accessToken") 
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option);
        return response;

    });

    const getLikeStatus = useQuery(["getLikeStatus"], async()=> {
        const option = {
            params:{
                userId: queryClient.getQueryData("principal").data.userId
            },
            headers:{
                Authorization: localStorage.getItem("accessToken") 
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like/status`, option);
        return response;

    });
    // post 요청 
    const setLike = useMutation(async()=> {
        const option = {
            headers:{
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken") 
            }
        }
        return await axios.post(`http://localhost:8080/book/${bookId}/like`, JSON.stringify({
            userId: queryClient.getQueryData("principal").data.userId
        }), option);
    },{
        onSuccess: () =>{
            queryClient.invalidateQueries("getLikeCount");
            queryClient.invalidateQueries("getLikeStatus"); //invalidateQueries: 캐싱을 지워버림 , 지워지면 초기화 되기때문에 새로 받아옴 , 새로 데이터를 받아오면 상태가 변함 
        }
    
    });

    const disLike = useMutation(async()=> {
        const option = {
            params:{
                userId: queryClient.getQueryData("principal").data.userId
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }

        }
        return await axios.delete(`http://localhost:8080/book/${bookId}/like`,option);
    },{
        onSuccess: () =>{
            queryClient.invalidateQueries("getLikeCount"); // 나만 추천을 누른것이 아닐수 있음 , 동시에 여러사람들이 추천을 누를 경우  ex) 100명의 사람들이 동시에 추천을 눌렀을경우 100개가 추가된 데이터을 들고와야함 
            queryClient.invalidateQueries("getLikeStatus"); 
        }
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
                <p>분류:{getBook.data.data.categoryName} / 저자명:{getBook.data.data.authorName} / 출판사:{getBook.data.data.publisherName} / 추천:{getLikeCount.isLoading ? "조회중...": getLikeCount.data.data}</p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName}/>
                </div>
                <div>
                    <RentalList bookId={bookId}/>
                </div>
                <div>
                    {getLikeStatus.isLoading 
                    ? ""
                    : getLikeStatus.data.data === 0
                         ? (<button onClick={() => {setLike.mutate()}}>추천하기</button>)
                         : (<button onClick={() => {disLike.mutate()}}>추천취소</button>)}
                </div>
            </main>

        </div>
    );
};

export default BookDetail;