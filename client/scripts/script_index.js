const iconBtn=document.getElementById('iconBtn');
const mainBtn=document.getElementById('mainBtn');
const secBtn=document.getElementById('secBtn')
const instagram=document.getElementById('instagram');
const body=document.getElementsByTagName('body')[0];
const idText=document.getElementById('id-text');
const pwdText=document.getElementById('id-pwd')
const loginBtn=document.getElementById('loginBtn')



iconBtn.addEventListener('click',disp)
mainBtn.addEventListener('click',disp)
secBtn.addEventListener('click',disp)


idText.addEventListener('keyup',loginEnable)
pwdText.addEventListener('keyup',loginEnable)

function disp() {
    
    instagram.style.display='block';
    body.style.overflow='hidden';
    
    // body.style.overflow ='scroll !important'

}

function loginEnable() {
    {
        if(idText.value!=="" && pwdText.value.length>=6){
            
            loginBtn.style.backgroundColor='rgb(0, 149, 246)';
            loginBtn.setAttribute('disabaled','false')
            loginBtn.style.cursor='pointer'
            
            
        }else{
            
            loginBtn.style.backgroundColor='rgb(0, 149, 246,.4)';
            loginBtn.setAttribute('disabaled','true')
            loginBtn.style.cursor='default'
            
        }
    }
}





