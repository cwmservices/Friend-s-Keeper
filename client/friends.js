const add = document.querySelector('#addUser');
const updateBtn = document.querySelector('#updateBtn');
const addFriendBtn = document.querySelector('#addFriendBtn');
const crfname = document.querySelector('#name');
const crfage = document.querySelector('#age');
const crfclass = document.querySelector('#class');

const upname = document.querySelector('#upname');
const upage = document.querySelector('#upage');
const upclass = document.querySelector('#upclass');

addFriendBtn.addEventListener('click',()=>{
    crfname.value="";
    crfage.value="";
    crfclass.value="";
})

add.addEventListener('click',()=>{ 
    fetch('http://localhost:3000/post',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({crfname:crfname.value,crfage:crfage.value,crfclass:crfclass.value})
    }).then((response)=>{
        response.json().then((result)=>{
            console.log("result",result);
        })
    })
    
    setInterval(() => {
        location.reload();
    }, 500);
});

fetch('http://localhost:3000/get',{
        method: 'GET',
    }).then((response)=>{
        response.json().then((result)=>{
            addUser(result);
        })
})

let keyAsName;

function addUser(result){
    for(column of result){
        tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        const td1=document.createElement('td');
        td1.innerText=column.name;
        const td2=document.createElement('td');
        td2.innerText=column.age;
        const td3=document.createElement('td');
        td3.innerText=column.class;
        const td4=document.createElement('td');
        const td4Btn = document.createElement('button');
        
        td4Btn.setAttribute("type","button");
        td4Btn.setAttribute("class","btn btn-success");
        td4Btn.setAttribute("data-bs-toggle","modal");
        td4Btn.setAttribute("data-bs-target","#editModal"); 
        td4Btn.setAttribute("data-bs-whatever","@mdo");
        
        td4Btn.innerText="Edit";
        td4.appendChild(td4Btn);

        td4Btn.addEventListener('click',(e)=>{
           keyAsName = e.target.parentNode.parentNode.firstChild.innerText;
           upname.value="";
           upage.value="";
           upclass.value="";
        })

        updateBtn.addEventListener('click',()=>{ 
            
            
            fetch('http://localhost:3000/update',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({upname:upname.value,upage:upage.value,upclass:upclass.value,keyAsName:keyAsName})
                }).then((response)=>{
                response.json().then((result)=>{
                console.log("result",result);
            })
        })
    
        setInterval(() => {
            location.reload();
        }, 500);
});

        const td5=document.createElement('td');
        
        const td5Btn = document.createElement('button');
        td5.appendChild(td5Btn);
        td5Btn.setAttribute('class','btn btn-danger');
        td5Btn.innerText="Delete";
        td5Btn.addEventListener('click',(e)=>{
            const name = e.target.parentNode.parentNode.firstChild.innerText;
            fetch(`http://localhost:3000/delete/${name}`,{
                method:'DELETE'
            }).then((response)=>{
                response.json().then((data)=>{
                    console.log(data);
                })
            })
            setInterval(() => {
                location.reload();
            }, 500);
        })

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    }
    
}

