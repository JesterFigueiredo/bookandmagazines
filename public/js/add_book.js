function new_session_data(new_row){
    prev_data= sessionStorage.getItem("table");
    console.log(prev_data)
    sessionStorage.setItem('table',prev_data+new_row);
}

function add_book(){
    let form=document.forms['addbook'];
    let n_row=[form['title'].value+';'+form['isbn'].value+';'+form['author'].value+';'+form['description'].value];
    let new_row="<tr>\
    \<td>"+form['title'].value+"</td>\
    <td>"+form['isbn'].value+"</td>\
    <td>"+form['author'].value+"</td>\
    <td>"+form['description'].value+"</td>\
    </tr>"
    new_session_data(new_row);
}