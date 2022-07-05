


function add_sorted_data(new_table){
    for(let i of new_table){
        let table_ref=document.querySelector('table');
        let newrow=table_ref.insertRow(-1);
        let firstcell=newrow.insertCell(0);
        let secondcell=newrow.insertCell(1);
        let thirdcell=newrow.insertCell(2);
        let fourthcell=newrow.insertCell(3);
        firstcell.appendChild(document.createTextNode(i[0]));
        secondcell.appendChild(document.createTextNode(i[1]));
        thirdcell.appendChild(document.createTextNode(i[2]));
        fourthcell.appendChild(document.createTextNode(i[3]));
        }
}

function delete_all_rows(){
    let table=document.querySelector('table');
    let row_count=table.rows.length;
    for(let i=1;i<row_count;i++){
        table.deleteRow(1);
    }

}

function search(){
    delete_all_rows();
    let reg=new RegExp(document.getElementById('search_input').value,'i');
    let table=document.querySelector('table');
    table.innerHTML=sessionStorage.getItem('table');
    console.log(sessionStorage.getItem('table'));
    let new_table=[];
    let row_count=table.rows.length;

    for(let i=1;i<row_count;i++){
        let cell=table.rows[i].cells;
        let cell_data=cell[0].innerHTML+';'+cell[1].innerHTML+';'+cell[2].innerHTML+';'+cell[3].innerHTML;
        let prev_cell=table.rows[i-1].cells;
        let prev_cell_data=prev_cell[0].innerHTML+';'+prev_cell[1].innerHTML+';'+prev_cell[2].innerHTML+';'+prev_cell[3].innerHTML;
        if(reg.test(cell_data)  && cell_data!==prev_cell_data){
            new_table.push(cell_data.split(';'));
        }
    }

    delete_all_rows();
    new_table.sort();
    add_sorted_data(new_table);
}


function add_book(){
    let form=document.forms['addbook'];
    // let new_row=[form['title'].value+';'+form['isbn'].value+';'+form['author'].value+';'+form['description'].value];
    let new_row="<tr>\
    \<th>"+form['title'].value+"<th>\
    <th>"+form['isbn'].value+"<th>\
    <th>"+form['author'].value+"<th>\
    <th>"+form['description'].value+"<th>\
    </tr>"
    new_session_data(new_row);
}


(function(){
    if(sessionStorage.length){
      
    }
    else{
sessionStorage.setItem("table",document.querySelector('table').innerHTML);
    }
})();

