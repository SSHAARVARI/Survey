
let survey={}
const submitBtn=document.getElementById('smt');        


function selectRad(ques,opt) {
    let inputId='q'+ques+'-'+'a'+opt
    document.getElementById(inputId).checked=true;
    survey[ques]=opt;
    // console.log(survey);
    if (Object.keys(survey).length===7) {
        submitBtn.style.backgroundColor='rgb(255, 165, 0)';
        submitBtn.style.cursor='pointer'
        submitBtn.addEventListener('click',()=>{
            let sendSurvey=new XMLHttpRequest()
            sendSurvey.open('POST','/survey-report',false)
            sendSurvey.setRequestHeader('Content-Type','application/json')
            sendSurvey.onload=()=>{
                console.log(sendSurvey.status);
            }
            sendSurvey.send(JSON.stringify(survey));
        })

    }else{
        submitBtn.style.backgroundColor='rgb(255,165,0,.5';
        
    }
    
}

