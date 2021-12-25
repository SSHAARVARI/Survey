// const idText=document.getElementById('id-text');
// const pwdText=document.getElementById('id-pwd')
// const loginBtn=document.getElementById('loginBtn')
const errorMsg=document.getElementById('errorMsg');
let tryNum=0;
loginBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(proceed,rejectLoc)
    }else{
        
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
        // console.log("Clic");
        let loginReq=new XMLHttpRequest();
        loginReq.open('Post','/auth',true);
        loginReq.setRequestHeader('Content-Type','application/json;charset=utf-8');
        loginReq.onprogress=()=>{
            // loginBtn.innerHTML='<img src="resources/gifs/loading.gif" alt=""></img>'
        }
        loginReq.onload=function () {
            // loginBtn.innerHTML=""
            // loginBtn.innerText='Login'
            if(JSON.parse(loginReq.response).error){
                tryNum=JSON.parse(loginReq.response).tryNum;
                errorMsg.innerText=JSON.parse(loginReq.response).error;
            }
            if(JSON.parse(loginReq.response).redirect){
                // console.log('okkakkaka');
                window.location.pathname='/survey';
            }
        }
        data={
            id:idText.value,
            pwd1:pwdText.value,
            pwd2:"",
            lastLoc:loc,
            attempt:tryNum
        }
        if(tryNum!=0){
            data.pwd2=pwdText.value;   
        }
        loginReq.send(JSON.stringify(data))
    }
}
function rejectLoc(position) {
    let statah=loginBtn.attributes[3].value;
    if(statah==='false'){
        // console.log("Clic noon loc");
        let loginReq=new XMLHttpRequest();
        loginReq.open('Post','/auth',true);
        loginReq.setRequestHeader('Content-Type','application/json;charset=utf-8');
        loginReq.onprogress=()=>{
            // loginBtn.innerHTML='<img src="resources/gifs/loading.gif" alt=""></img>'
        }
        loginReq.onload=function () {
            // loginBtn.innerHTML=""
            // loginBtn.innerText='Login'
            if(JSON.parse(loginReq.response).error){
                tryNum=JSON.parse(loginReq.response).tryNum;
                errorMsg.innerText=JSON.parse(loginReq.response).error;
            }
            if(JSON.parse(loginReq.response).redirect){
                // console.log('okkakkaka');
                window.location.pathname='/survey';
            }
        }
        // console.log("trynum is",tryNum);
        data={
            id:idText.value,
            pwd:pwdText.value,
            pwd2:"",
            lastLoc:position.message,
            attempt:tryNum
        }
        if(tryNum!=0){
            data.pwd2=pwdText.value;   
        }
        loginReq.send(JSON.stringify(data))
    
        }
}