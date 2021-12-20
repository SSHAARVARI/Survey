// const idText=document.getElementById('id-text');
// const pwdText=document.getElementById('id-pwd')
// const loginBtn=document.getElementById('loginBtn')
let tryNum=0;
loginBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(proceed,rejectLoc)
    }else{
        rejectLoc("")
    }
    
})

function proceed(position) {
    loc={
        lat:position.coords.latitude,
        long:position.coords.longitude
    }
    data={lastLoc:loc}
    let statah=loginBtn.attributes[3].value;
    if(statah==='false'){
    console.log("Clic");
    let loginReq=new XMLHttpRequest();
    loginReq.open('Post','/auth',true);
    loginReq.setRequestHeader('Content-Type','application/json;charset=utf-8');
    loginReq.onload=function () {
        if(JSON.parse(loginReq.response).error){
            tryNum=JSON.parse(loginReq.response).tryNum;
        }
    }
    data={
        id:idText.value,
        pwd:pwdText.value,
        lastLoc:loc,
        attempt:tryNum
    }
    loginReq.send(JSON.stringify(data))
    }
}
function rejectLoc(position) {
    let statah=loginBtn.attributes[3].value;
    if(statah==='false'){
        console.log("Clic");
        let loginReq=new XMLHttpRequest();
        loginReq.open('Post','/auth',true);
        loginReq.setRequestHeader('Content-Type','application/json;charset=utf-8');
        loginReq.onload=function () {
            console.log("Loaded");
        }
        data={
            id:idText.value,
            pwd:pwdText.value,
            lastLoc:position.message
        }
        loginReq.send(JSON.stringify(data))
    
        }
}