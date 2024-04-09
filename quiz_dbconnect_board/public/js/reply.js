//const reply = {} 형태로 중괄호 안에 아래 내용을 넣을 수 있고,
//부를때는 reply.replt_form 형식
const reply = {
    reply_form : () => {
        $("#first").slideDown('slow'); 
        $("#modal_wrap").show();
    }
}
function reply_form(){
    $("#first").slideDown('slow'); 
    $("#modal_wrap").show();
}
function reply_hide(){
    $("#first").slideUp('fast'); 
    $("#modal_wrap").hide();
}
function rep(){
    let form={}; 
    let arr = $("#frm").serializeArray();
    arr.forEach( d => { form[d.name] = d.value; })
    fetch("/boardrep/register", {
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify( form )
    })
    .then(res => res.json() )
    .then( result => {
        if(result === 1)
            alert("답글이 달렸습니다!!")
        reply_hide();
    })
    let html = "아이디 : "+form["id"]+" / ";
        html += "작성일 : "+new Date().toLocaleString()+"<br>"
        html += "제목 : "+form["title"]+"<br>";
        html += "내용 : "+form["content"]+"<hr>"
        const content = document.getElementById("content");
        content.insertAdjacentHTML("beforeend", html); //afterbegin는 위에 붙음
}
