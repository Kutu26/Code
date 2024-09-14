var num = Number(0);
function count(x){
    if(x === '+'){
        num++;   
    }
    if(x === '-'){
        num--;
    }
    if(x === '0'){
        num = 0;
    }  
    document.getElementById('output').innerText = num;
}
