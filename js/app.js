var db = firebase.firestore();

var auth = firebase.auth();

function signup() {
    document.getElementById("regform").addEventListener("click", ((event) => {
        event.preventDefault()

        var name = document.getElementById("username").value;
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Pwd").value;

if(name > 0 && email >0 && password >0){

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
            }
            else{
                alert("pkz fill all the field");
            }
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





////

/////








function AddPost() {
    document.getElementById("postform").addEventListener("click", ((event) => {
        event.preventDefault()

        var name = document.getElementById("name").value;

        var e = document.getElementById("category");
        var category = e.options[e.selectedIndex].value;
        var year=document.getElementById("Year").value;
        var title = document.getElementById("title").value;
        var desc=document.getElementById("descript").value;
        var pic=document.getElementById("img");
        // console.log(name,category,title,desc,img);

    
var file = pic.files[0];
var reader = new FileReader();
reader.onloadend = function() {
var img = reader.result;
console.log(img);
db.collection("AdPost").add({name,category,desc,title,year,img})
.then((res)=>{
    console.log(res);
      window.location="home.html";
  })
  .catch((error)=>{
      var errMessage = error.message;
      console.log(errMessage);
  })
}
reader.readAsDataURL(file);
   }))
}




function getPost(){
var image=document.getElementById("fetch");
    //  var table=document.getElementById("display");
    db.collection("AdPost").get()
    .then((query)=>{
        query.forEach(((doc)=>{

            image.innerHTML +=`
            <div class="col-md-4">
            <div class="thumbnail">
                <img src="${doc.data().img}" style="width:100%" class="img-responsive" alt="${doc.data().name}">
                <div class="caption">
                  <p>${doc.data().name}</p>
                </div>
              
            </div>
          </div>
         

            `;
           
        }))
    })
}




function search(){
    
    var image=document.getElementById("fetch");
//    var search=document.getElementById("search").value;
var e = document.getElementById("category");
var category = e.options[e.selectedIndex].value;

console.log(search);
    db.collection("AdPost").where("category", "==", category).get().then((querySnapshot) => {
        image.innerHTML=""; 
    querySnapshot.forEach((doc) => {

        image.innerHTML +=`
        <div class="col-md-4">
        <div class="thumbnail">
            <img src="${doc.data().img}" alt="${doc.data().name}">
            <div class="caption">
              <p>${doc.data().name}</p>
            </div>
          
        </div>
      </div>
     

        `;

    });
});
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
}