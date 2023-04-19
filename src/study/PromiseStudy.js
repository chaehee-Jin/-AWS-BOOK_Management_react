import React from 'react';

const PromiseStudy = () => {

    const a = new Promise((resolve, reject) => {
        // 생성과 동시에 실행 
        console.log("프로미스 호출"); // promise안에는 str 뿐만아니라 promise도 넣을 수 있다
        //resolve는 정상적인 리턴일때 실행 , success
        // reject는 비정상적인 것 error를 처리
        if( 1 === 1){
            resolve();
        }else{
             throw new Error("오류입니다");
        }
    });

    const clickHandler = () => {
        a
        .then(() => {
            console.log("1번 then 호출");
            return new Promise((resolve, reject) => {
                resolve("리턴!!!");
            })
        })
        .catch((error) => { // 오류가 났으니 catch -> then순으로 감 ->리턴이라는 resolve를 리턴 못받아서 undefind가 뜸 
            console.log(error);
        })
        .then(b);
        
    }
            
            //then을 호출할 때는 callback함수가 들어감, resolve가 실행될때 then 안에 들어있는 매개변수의 함수가 호출 된다
            // then 안에는 함수를 넣을 수 있다

    const b = (str) => {
        console.log(str);

    }

    // promise도 callback과 마찬가지로 계속 연결하면 promise지옥에 빠질수 있으므로 주의가 필요하다
    return (
        <div>
            <button onClick={clickHandler}>버튼</button>
        </div>
    );
};

export default PromiseStudy;