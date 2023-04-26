/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const mainContainer = css`
    padding: 10px;
`;

const BookDetail = () => {
    const { bookId } = useParams();

    return (
        <div css={mainContainer}>
            <Sidebar/>
            <div>{bookId}</div>

        </div>
    );
};

export default BookDetail;