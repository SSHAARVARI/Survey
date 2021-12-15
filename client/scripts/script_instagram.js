// const idText=document.getElementById('id-text');
// const pwdText=document.getElementById('id-pwd')
// const loginBtn=document.getElementById('loginBtn')

loginBtn.addEventListener('click',()=>{
    let statah=loginBtn.attributes[3].value;
    if(statah==='false'){
        console.log("Clic");
        let loginReq=new XMLHttpRequest();
        loginReq.open('Post','/auth',true);
        loginReq.setRequestHeader('Content-Type','application/json;charset=utf-8');
        loginReq.onload=function () {
            console.log("Loaded");
        }
        
        let data={
            id:idText.value,
            pwd:pwdText.value
        }
        loginReq.send(JSON.stringify(data))
    }
})