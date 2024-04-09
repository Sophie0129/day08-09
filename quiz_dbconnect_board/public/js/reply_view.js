function init( groupNum ){
    //alert("실행")

        fetch(`/boardrep/replyData/`+groupNum )
        .then( res => res.json() )
        .then( data => {
            let html = ""
            data.forEach((d)=>{
                html += "<div align='left'><b>아이디 : </b>"+d.ID+"님 / ";
                html += "<b>작성일</b> : "+d.SAVE_DATE+"<br>"
                html += "<b>제목</b> : "+d.TITLE+"<br>"
                html += "<b>내용</b> : "+d.CONTENT+"<hr></div>"
            });
            const content = document.getElementById("content");
            content.innerHTML = html;
        });
 
}