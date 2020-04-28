async function getData() 
        {
            //await the response of the fetch call
           let response = await fetch('https://flipkart-configuration-table.now.sh/api');
            //proceed once the first promise is resolved.
           let data = await response.json()
            //proceed only when the second promise is resolved
            return data;
        }
//call getData function
getData()
.then(data => {
    let response = data.config;
    let table = document.querySelector("table");
    let headArray = [{title:"Key",keyName:"label"},{title:"Value",keyName:"field"},{title:"Description",keyName:"description"}];
    generateTableHead(table,headArray);
    generateTable(table,response,headArray)   
});//log the data


//generate table head
function generateTableHead(table,data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let th1 = document.createElement("th");
    row.appendChild(th1);
    data.forEach((item,index) => {
    let th = document.createElement("th");
    let text = document.createTextNode(item.title);
    th.appendChild(text);
    row.appendChild(th);
    });
  }
  
//generate table body
  function generateTable(table, data,headArray) {
      let tbody = table.createTBody();
        tbody.id = "dataTbody";
      tbody.onclick = function x(e){
        rowClicked(e);
      }
    data.forEach((item,index) => {
        let row = tbody.insertRow();
        let cell1 = row.insertCell();
        var checkbox = document.createElement("input");
        checkbox.id = item.key + "C";
        checkbox.type = "checkbox";
        cell1.appendChild(checkbox);
        if(item.selected){
            checkbox.checked = true;
            checkbox.value = "on";
        }
        else{
            checkbox.value = "off";
        }
        headArray.forEach((list,i) =>{
            let cell = row.insertCell();
            if(typeof item[list.keyName] === 'object' && item[list.keyName] !== null){
                let value = item[list.keyName]
                if(value.type == "text"){ 
                    var input = document.createElement("input");
                    input.type = "text";
                    input.id = item.key + "I";
                    if(item.selected){
                        input.disabled = false;
                    }
                    else{
                        input.disabled = true;
                    }
                    if(value.defaultValue != ""){
                        input.value = value.defaultValue;
                    }
                    else{
                        input.value = "listing";
                    }
                    cell.appendChild(input)
                }
                else if(value.type == "select"){
                    var select = document.createElement("select");
                    select.name = "pets";
                    let x = value.options;
                    x.forEach((item,index) => {
                        var option = document.createElement("option");
                        option.value = x[index];
                        option.text = x[index].charAt(0).toUpperCase() + x[index].slice(1);
                        if(x[index] === value.defaultValue){
                            select.selectedIndex = index;
                        }
                        select.appendChild(option);
                        cell.appendChild(select)
                    });       
                }
                
            }
            else{
                let text = document.createTextNode(item[list.keyName]);
                cell.appendChild(text);
            }
        })
    })
  }

// Done button and show select functionality
  const showSelected = (type,ev) => {
      var newArr = [];
      table = document.getElementById("dataTbody");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
          let td = tr[i].getElementsByTagName("td");
          inputArr = tr[i].getElementsByTagName("input");
          for(j = 0; j < inputArr.length; j++){
              if(inputArr[j].value == "on" && type=="button"){
                newArr.push({key:td[1].innerText,description:td[3].innerText});
              }
              else if(inputArr[j].value == "on" && type=="checkbox" && ev.target.checked){
                  console.log(ev.target.checked,"ryuwyetuyweitu",tr[i])
                  tr[i].style.display = "table-row";
              }
              else if(inputArr[j].value == "off" && type=="checkbox"){
                tr[i].style.display = "none";
                console.log(tr[i],"offfffff");
              }
              else if(!ev.target.checked){
                tr[i].style.display = "table-row";
              }
          }
      }
      if(type=="button"){
        console.log(newArr)
      }
      else if(type=="checkbox"){}
  }

  //Search table
  function searchTable(event) {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTbody");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}

// event delegation on table
function rowClicked(e){
    if(e.target.id.search("C") > 0){
        let str =  e.target.id;
        let inputID = str.replace("C", "I");

        if(e.target.checked && document.getElementById(inputID)){
            console.log(document.getElementById(inputID))
            document.getElementById(inputID).disabled = false;
            e.target.value = "on";
        }
        else if(!e.target.checked && document.getElementById(inputID)){
            document.getElementById(inputID).disabled = true;
            e.target.value = "off";
        }
    }
    else{
        console.log("Something else clicked")
    }
}