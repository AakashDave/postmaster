let jsonBox=document.getElementById("jsonBox");
let parameterBox=document.getElementById("parameterBox");
let jsonRadio=document.getElementById("jsonRadio");
let parameterRadio=document.getElementById("parameterRadio");
parameterBox.style.display="none";
// change content
jsonRadio.addEventListener('click',()=>{
    jsonBox.style.display="block";
    parameterBox.style.display="none";
})
parameterRadio.addEventListener('click',()=>{
    jsonBox.style.display="none";
    parameterBox.style.display="block";
})

function appendList(string) {
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
//adding parameter
let addParameter=document.getElementById("addParameter");
let count=2;
addParameter.addEventListener('click',()=>{
    let params=document.getElementById("params");
    let str=` <div class="row mb-2" id="paramList">
    <div class="col-sm-5">
      <input type="text" class="form-control keyBox" id="parameterKey${count}" placeholder="key" aria-label="key">
    </div>
    <div class="col-sm-5">
      <input type="text" class="form-control valueBox" id="parameterValue${count}" placeholder="value" aria-label="value">
    </div>
    <div class="col-sm-2 btnbox">
    <button class="btn btn-outline-primary deleteParams"> - </button>
    </div>
  </div>`;
  let paramElement=appendList(str);
  params.appendChild(paramElement);
  count++;

  let deleteParams=document.getElementsByClassName('deleteParams');
    for (item of deleteParams) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.parentElement.remove();
        })
    }
})

// submit request
let submitbtn=document.getElementById("submit");
submitbtn.addEventListener("click",(e)=>{
    
    // document.getElementById('responseText').innerHTML = "wait..fetching data..."
    let url=document.getElementById("url").value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;
    if (contentType==='param') {
        let data={};
        for (let i = 0; i < count; i++) {
            if (document.getElementById("parameterKey"+(i+1))!=undefined) {
                let key=document.getElementById("parameterKey"+(i+1)).value;
                let value=document.getElementById("parameterValue"+(i+1)).value;
                data[key]=value;
            }
        }
        data=JSON.stringify(data);
        
    }
    else{
        data=document.getElementById('jsonRe').value;
    }
    
    if (requestType==="GET") {
        fetch(url,{
            method:'GET'
        }).then((response)=>{ return response.text()})
        .then((text)=>{
            let responseText=document.getElementById("responseText");
            responseText.innerHTML=text;
            Prism.highlightAll();
        })
    }
    else{
        // fetch(url, {
        //     method: 'POST', 
        //     body: data,
        //     headers: {
        //         "Content-type": "application/text; charset=UTF-8"
        //       }  
        // })
        // .then(response=> response.text())
        // .then((text) =>{
        //     // document.getElementById('responseJsonText').value = text;
        //     document.getElementById('responseText').innerHTML =text;
        //     Prism.highlightAll();
        // });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://reqres.in/api/products/3", true);
        xhr.onload = function(){
            document.getElementById('responseText').innerHTML =xhr.responseText;
            Prism.highlightAll();
        };
        xhr.send();
    }
})