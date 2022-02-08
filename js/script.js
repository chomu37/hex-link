"use strict";

// 3~63이 랜덤으로 나오는 함수
function rand64(){
    return Math.floor(Math.random() * 61) + 3;
}

// 0, 4, 8, 16, 32 가 아닌 수가 나올 때까지 반복
function getNew(){
    let result = 0
    while(result == 0 || result == 4 || result == 8 || result == 16 || result == 32){
        result = rand64();
    }
    return result;
}

const lenHexes = 19;
const idList = [...Array(lenHexes).keys()].map(i => String.fromCharCode(i + 97));
let hexes = idList.reduce((acc,curr) => (acc[curr] = getNew(), acc), {});




// 입력된 리스트에 포함된 수를 인덱스로 가지는 hexes의 요소에 getNew()를 적용하여 새로운 값을 대입
function changeHex(list, obj){
    for (let i in list){
        let id = list[i];
        obj[id] = getNew();
    }
}

// changeHex(idList, hexes)

// 
function writeHexes(obj){
    // 오브젝트에서 key를 뽑아 해당 key를 id로 가지는 요소의 center 클래스에 p 요소에 값을 대입해서 기존 내용에 추가
    for (let id in obj){
        let hexCenter = document.querySelector(`#${id} .center`)

        

        let p = document.createElement("p")
        p.textContent = obj[id];

        hexCenter.appendChild(p);
    }
}

function displayPipes(obj){
    for (let id in obj){
        let hexCenter = document.querySelector(`#${id} .center`)
        caseby(obj[id],
        function(){hexCenter.querySelector('.z').style.display = 'block';},
        function(){hexCenter.querySelector('.y').style.display = 'block';},
        function(){hexCenter.querySelector('.x').style.display = 'block';},
        function(){hexCenter.querySelector('.w').style.display = 'block';},
        function(){hexCenter.querySelector('.v').style.display = 'block';},
        function(){hexCenter.querySelector('.u').style.display = 'block';},
        null);
    }
}

function caseby(para, one, two, four, eight, sixteen, thirtytwo, notofthem){
    if(para & 63){
        if(para & 1){
            one();
        }
        if(para & 2){
            two();
        }
        if(para & 4){
            four();
        }
        if(para & 8){
            eight();
        }
        if(para & 16){
            sixteen();
        }
        if(para & 32){
            thirtytwo();
        }
    }else{
        notofthem;
    }
}

const connectingCable = {
    "a": {"b":1, "r":2, "q":4, "l":8, "d":16, "e":32},
    "b": {"c":1, "s":2, "r":4, "a":8, "e":16, "f":32},
    "c": {"m":1, "h":2, "s":4, "b":8, "f":16, "g":32},
    "d": {"e":1, "a":2, "l":4, "p":8, "h":16, "i":32},
    "e": {"f":1, "b":2, "a":4, "d":8, "i":16, "j":32},
    "f": {"g":1, "c":2, "b":4, "e":8, "j":16, "k":32},
    "g": {"q":1, "m":2, "c":4, "f":8, "k":16, "l":32},
    "h": {"i":1, "d":2, "p":4, "s":8, "c":16, "m":32},
    "i": {"j":1, "e":2, "d":4, "h":8, "m":16, "n":32},
    "j": {"k":1, "f":2, "e":4, "i":8, "n":16, "o":32},
    "k": {"l":1, "g":2, "f":4, "j":8, "o":16, "p":32},
    "l": {"a":1, "q":2, "g":4, "k":8, "p":16, "d":32},
    "m": {"n":1, "i":2, "h":4, "c":8, "g":16, "q":32},
    "n": {"o":1, "j":2, "i":4, "m":8, "q":16, "r":32},
    "o": {"p":1, "k":2, "j":4, "n":8, "r":16, "s":32},
    "p": {"d":1, "l":2, "k":4, "o":8, "s":16, "h":32},
    "q": {"r":1, "n":2, "m":4, "g":8, "l":16, "a":32},
    "r": {"s":1, "o":2, "n":4, "q":8, "a":16, "b":32},
    "s": {"h":1, "p":2, "o":4, "r":8, "b":16, "c":32},
}
function isConnectable(id1, id2){
    return connectingCable[id1][id2] ? true : false;
}

// function(){
//     let center = this.querySelector('.center');
//     let p = center.querySelector('p');
//     if(p){
//         p.remove();
//     }
//     let newHex = getNew();
//     hexes[id] = newHex;
//     writeHexes(hexes);
//     displayPipes(hexes);
// }

idList.forEach(id => {
    let hex = document.querySelector(`#${id}`);
    hex.addEventListener('mouseover', function(){
        let center = this.querySelector('.center');
        let hexagon = center.querySelector('.hexagon');
        hexagon.style.backgroundColor = '#00ff00';
        let connects = connectingCable[id];
        for(const connected in connects){
            let connectedHex = document.querySelector(`#${connected} .hexagon`);
            connectedHex.style.backgroundColor = '#ff00ff';
        }
    }, false);
    hex.addEventListener('mouseout', function(){
        let center = this.querySelector('.center');
        let hexagon = center.querySelector('.hexagon');
        hexagon.style.backgroundColor = 'var(--btn-color)';
        let connects = connectingCable[id];
        for(const connected in connects){
            let connectedHex = document.querySelector(`#${connected} .hexagon`);
            connectedHex.style.backgroundColor = 'var(--btn-color)';
        }
    }, false);
});

function isConnected(current, next){
    if(isConnectable(current, next)){
        let currToNext = connectingCable[current][next];
        let nextToCurr = connectingCable[next][current];
        return (hexes[current] & currToNext && hexes[next] & nextToCurr) > 0;
    }
    return false;
}
writeHexes(hexes)
displayPipes(hexes)