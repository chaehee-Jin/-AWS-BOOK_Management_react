import React, { useState } from 'react';

//콜백: 비동기 처리후에 함수 실행을 해야하는 경우사용
const Callback = () => {

    const[cnt, setCnt] = useState(0);
    // useState을 쓰는 이유 : 
    // let number = 10; 을주고 버튼을 추가한 페이지를 만들었다고 할때 , 버튼을 누르면 onclick에 함수를 정의 
    // number에다가 10을 추가 -> number += 10;이런식으로 결과가 나옴
    // 리엑트는 랜더링(처음부터 끝까지 한번 읽는것)이라는 것을 함 ,
    // 값이 변동되어도 페이지에는 값이 변동된 것이 나타나지 않음 -> 랜더링이 되지 않은 상태
    // useStat를 사용하면 일반변수와 함수를 가지면 ex) const[number, setnubmer] = useState(10)이라는 변수를 가짐
    // set을 사용해서 setnumber (number + 10) ->을 보내면 비동기가 일어나고 그 이후에 렌더링이 일어나게된다
    //전부다 재렌더링을 하는 것이 아닌 변경된 부분만 재렌더링을 하는 것을 useState라고 한다

    //쉽게 말하자면 풍경그림을 그렸을때 구름만을 수정하였으면 리액트가 그 부분만 부분적으로 재렌더링을 해줌 (전체그림을 수정할 필요가 없으므로)

    let count1 = 0;
 

    const a =(fx,fx2) =>{ // 매개변수에는 무엇이 들어올지 모름 
        console.log("A함수 실행");
       // setCnt(cnt + 100);  -> 이렇게만 쓰면 함수에 대한 처리가 비동기 처리되었기때문에 cnt가 0이 되어버림 
       // 함수가 실행되고 나면 return되는것이 숫자, 이것이 cnt로 들어감 -> callback함수 
    //    setCnt(() => {
    //     count1 = cnt + 100;
    //     fx();
    //     return count1;
    //    });
    //     count1 = cnt;
        setCnt(() => fx(fx2));
        
        count1 = cnt;

    }
    const b  = (fx2) => {
        console.log("B함수 실행");
        count1 = cnt + 100;
        fx2();
       return count1;
        

    }
    const c = () => {
        console.log("C함수 실행");
        console.log(count1);
    

    }
    const clickHandler = () => {
        a(b,c);
      

    }
    return (
        <div>
            <button onClick = {clickHandler}>버튼</button>
        </div>
    );
};

export default Callback;

//settimeout은 시간을 지연시켜주는 것  => setTimeout( , )  앞은 콜백 함수, 뒤는 지연시간 -> 갔다가 돌아오면 몇초뒤에 실행 (차례대로 실행 x) / 동기는 갔다가 바로 실행 
// ex) a -> b -> c면 b가 콜백함수라고 가정하고 1초뒤 실행하라고 제시를 하였을 때 a-> c -> b 이런식으로 실행 
// 출력1과 출력2가 있다고 가정했을때 함수가 1개밖에 없을 경우 -> setTimeout(() => { }, 2000)       f(함수를 받을수 있는 변수명 )-> console.log를 찍은 후 함수를 받을수 있는 변수명을 호출 


// 질문1.)) 맨처음 끝이 찍히는 것은 아무것도 없는게 갔다와서 빈값이니깐 console만 찍히는건가요?  -> 답) 1: 비동기 2:비동기 3:끝(동기) 이면 끝이 맨먼저 찍힘 
// 질문2.)) f2가 아까 출력1이라고 알고 있는데 이건 왜 가나다가 찍히는 건가요?-> 답) 콜백으로 넣어놓았기 때문에 함수안에 함수라서 가나다가찍힘 

//promise는 원래 비동기

//비동기는 데이터가 갔다가 와야지만 실행가능 / 동기는 바로 실행가능 

//promise의 동작원리: 1. resolve 함수를 넣으면 함수가 리턴  2.react 에러객체를 생성해서 넣음 
// then 이랑 catch는 promise객체안에서만 들어있는 함수라 promise에만 존재
// resolve가 있으면 then이 실행, react가 있으면 catch -> 참이면 resolve, 거짓이면 react실행 
// then은 콜백함수 함수1,2,3이 차례대로 실행되길 바란다면  함수 1을 promise안에다가 넣고 함수 2의 결과가 resolve가 되도록 만들어주어야함 
// 이 promise를 리턴을 해주면 그다음 함수2가 그결과를 받아서 써야함 , 오류가 없으면 리턴 
// then().then()이렇게 찍을수 있음 / then에는 콜백함수가 들어갈수 있다


// async await -> await을 다는 이유: 콜백함수 안에다가 await을 달수 있음, await은 promise에다가만 사용가능
// async () => {} -> new promise({함수 }) 그래서 try ~ catch사용가능 , async가 달리는 순간 promise도 비동기 



// await으로 달면 비동기를 동기처럼 사용가능하다 -> promise가 갔다가 오면 실행되도록 들어있기때문에


 