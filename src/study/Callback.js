import React, { useState } from 'react';

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