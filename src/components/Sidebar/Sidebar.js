/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from './ListButton/ListButton';
import { BiHome, BiLike, BiListUl, BiLogOut } from 'react-icons/bi';
import { useQuery } from 'react-query';
import axios from 'axios';

const sidebar = (isOpen) => css`
    position: absolute;
    display: flex;
    left: ${isOpen ? "10px;" : "-240px"};
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 250px;
    box-shadow: -1px 0px 5px gray;  //강사님것은 #dbdbdb
    transition: left 1s ease;
    background-color: whitesmoke; // 강사님은 white

    ${isOpen ? "" : `
        cursor:pointer;
     `}
    cursor: pointer;
    ${isOpen ? "" : 
        `&:hover{left: -230px;
    }`
}
   

`;


const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    
`;
const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;

`;

const userName =css`
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    padding-top: 0;

`;
const userEmail = css`
    font-size: 12px;

`
const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 12px;
    background-color: #dbdbdb; //내가 추가한것 
    cursor: pointer;
    &:active{
        background-color: #fafafa;
    }
`;
const main = css`
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
`;
const footer = css`
    padding: 10px;
`;

const Sidebar = () => {
    const [isOpen, setIsOpen ]= useState(false); // isopen의 상태에따라서 사이드바가 나오고 숨겨짐 
    const {data, isLoading} = useQuery(["principal"],async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal", 
        {params:{accessToken}},
        {
            enabled: accessToken //무조건 ture인 상태여야지 데이터를 들고올수있음, 동기적인 처리를 하려면 key값을 가져와야함 
                                //데이터가 갔다가 오면 null -> true로 바뀌므로 그때서야 실행되는 것이 enabled
        }); 
        return response;
    });

    const sidebarOpenClickHandle = () => {
        if(!isOpen){ //캡쳐링때문에 이벤트기능이 close버튼에 한번더 추가되어 false일때만 true로 변환할수 있게 만들어줌 
            setIsOpen(true);

        }
    }
    const sidebarCloseClickHandle = () => {
        setIsOpen(false);
    }
    const logoutClickHandle = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            localStorage.removeItem("accessToken");

        }
    }
    if(isLoading){
        return<>로딩중...</>;
    }
    if(!isLoading)
    return (
        <div  css={sidebar(isOpen)} onClick={ sidebarOpenClickHandle}>
            <header css={header}>
                <div css={userIcon}>
                    {data.data.name.substr(0,1)} {/* 사용자의 이름또는 이메일의 첫글자 하나만 들고오겠다 */} 
                </div>
                <div css={userInfo}>
                    <h1 css={userName}>{data.data.name}</h1>
                    <p css={userEmail}>{data.data.email}</p>
                </div>
                <div css={closeButton} onClick={ sidebarCloseClickHandle}><GrFormClose/></div>
            </header>
            <main css={main}>
               <ListButton title="Dashboard"><BiHome /></ListButton>
               <ListButton title="Likes"><BiLike/></ListButton>
               <ListButton title="Rental"><BiListUl/></ListButton>
            </main>
            <footer css={footer}>
                <ListButton title="Logout" onClick={logoutClickHandle}><BiLogOut/></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;
//비동기에서 실행을 키값을 들고오면 값을 들고 오기전에 뒤에 프로그램이 실행되는 문제가 발생 
// 전역의 상태로 빼놓고 사용을 하면 이러한 문제가 해결, 전역상태로 빼놓고 값을 수정하면 그와 관련된 정보들은 값들이 수정된다
// 유즈쿼리문에서는 배열로 사용해야함 -> 키값을 여러개 넣는 상황이 있어서 배열로 사용
//substr은 갯수를 말한다 글자를 자르는 갯수