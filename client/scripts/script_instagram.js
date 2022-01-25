// const idText=document.getElementById('id-text');
// const pwdText=document.getElementById('id-pwd')
// const loginBtn=document.getElementById('loginBtn')
const errorMsg=document.getElementById('errorMsg');
const loginForm=document.getElementById('loginForm');
let authStatus=0;
let pwd1=""

loginForm.addEventListener('submit',(event)=>{
  
    event.preventDefault();
    console.log('submitted'); 
    let loginReq=new XMLHttpRequest(); 
    let loginData=""

    if(authStatus===0){
        pwd1=pwdText.value;
        loginData=`username=${idText.value}&password=${pwdText.value}&authented=0` // &lat=${jagah.lat}&lng=${jagah.lng}`
    }else{
        loginData=`username=${idText.value}&password=${pwd1}&password2=${pwdText.value}&authented=1`
    }
    loginReq.open('POST','/auth',true); 
    loginReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    loginReq.onprogress=function(){
        loginBtn.style.backgroundColor='rgb(0, 149, 246,.4)';
        loginBtn.style.cursor='default';
        loginBtn.innerHTML='<img src="resources/gifs/loading.gif" alt="" srcset="">'
        
    }
    loginReq.onload=()=>{
        loginBtn.style.backgroundColor='rgb(0, 149, 246)';
        loginBtn.setAttribute('disabaled','false') 
        loginBtn.style.cursor='pointer'   
        loginBtn.innerHTML='Log In'
        authStatus=JSON.parse(loginReq.response).authen;
        console.log(loginReq.response);
        if(authStatus===true){
            window.location='/survey'
        }
    }
    loginReq.send(loginData)
})
