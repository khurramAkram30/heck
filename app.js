var db = firebase.firestore();

var auth = firebase.auth();

function signup() {
    document.getElementById("regform").addEventListener("click", ((event) => {
        event.preventDefault()

        var name = document.getElementById("username").value;
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Pwd").value;


        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                alert("Registration Successful");
                console.log("res=>", res.user.uid);
                db.collection("users").doc(res.user.uid).set({ name, email })
                    .then(() => {
                        console.log("added in db");
                        window.location = "index.html"
                    }).catch((e) => {
                        console.error("error in db");
                    })
            }).catch((error) => {
                var errCode = error.code;
                var errMessage = error.message;
                console.log(errMessage);
            })
    }))
}


function signin() {
    document.getElementById("loginForm").addEventListener("click", ((event) => {
        event.preventDefault()
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Pwd").value;
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                window.location = "home.html";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            })
    }))
}

function AddCat() {
    document.getElementById("catForm").addEventListener("click", ((event) => {
        event.preventDefault()

        var categories = document.getElementById("cat").value;

        db.collection("categories").add({ categories })
            .then((res) => {
                console.log(res);
                window.location = "home.html";
            })
            .catch((error) => {
                var errMessage = error.message;
                console.log(errMessage);
            })
    }))
}

function getCategories() {

    var cat = document.getElementById("category");

    db.collection("categories").get()
        .then((query) => {
            query.forEach((doc) => {
                console.log(doc.data());

                var cretaeOption = document.createElement("option");
                cretaeOption.innerHTML = doc.data().categories;
                cat.appendChild(cretaeOption);

            })

        })

}



function AddPost() {
    document.getElementById("postform").addEventListener("click", ((event) => {
        event.preventDefault()

        var name = document.getElementById("name").value;

        var e = document.getElementById("category");
        var category = e.options[e.selectedIndex].value;
        
        var title = document.getElementById("title").value;
        var desc=document.getElementById("descript").value;
        var img=document.getElementById("img").value;
        console.log(name,category,title,desc,img);

        db.collection("AdPost").add({name,category,title,desc,img})
        .then((res)=>{
            console.log(res);
            window.location="home.html";
        })
        .catch((error)=>{
            var errMessage = error.message;
            console.log(errMessage);
       
        })

    }))
}



function getPost(){
    var table=document.getElementById("display");
    db.collection("AdPost").get()
    .then((query)=>{
        query.forEach(((doc)=>{
            console.log(doc.data());
            var tr=document.createElement("tr");
            var name=document.createElement("td");
            
            var category=document.createElement("td");
            
            var description=document.createElement("td");
            
            var title=document.createElement("td");
            
            var img=document.createElement("td");

            name.innerHTML=doc.data().name;
            
            category.innerHTML=doc.data().category;
            
            description.innerHTML=doc.data().desc;
            
            title.innerHTML=doc.data().title;
            
            img.innerHTML=`<img src="${doc.data().img}">`;



            tr.appendChild(name);
            
            tr.appendChild(category);
            tr.appendChild(description);
            tr.appendChild(title);
            tr.appendChild(img);

            table.appendChild(tr);
        }))
    })
}




function search(){
    
    var table=document.getElementById("display");
    var search=document.getElementById("search").value;
    console.log(search);
    db.collection("AdPost").where("name", "==", search).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        table.innerHTML="";
        console.log(doc.data());
        var tr=document.createElement("tr");
        var name=document.createElement("td");
        
        var category=document.createElement("td");
        
        var description=document.createElement("td");
        
        var title=document.createElement("td");
        
        var img=document.createElement("td");

        name.innerHTML=doc.data().name;
        
        category.innerHTML=doc.data().category;
        
        description.innerHTML=doc.data().desc;
        
        title.innerHTML=doc.data().title;
        
        img.innerHTML=`<img src="${doc.data().img}">`;



        tr.appendChild(name);
        
        tr.appendChild(category);
        tr.appendChild(description);
        tr.appendChild(title);
        tr.appendChild(img);

        table.appendChild(tr);

    });
});
}