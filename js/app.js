// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDxSowNwNJaGK0XAkmhZ0qVt-vKT0GS614",
  authDomain: "food247-10746.firebaseapp.com",
  databaseURL: "https://food247-10746.firebaseio.com",
  projectId: "food247-10746",
  storageBucket: "food247-10746.appspot.com",
  messagingSenderId: "780845371970",
  appId: "1:780845371970:web:e0f57513c268e832d093db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.addEventListener('init', function (event) {
  var page = event.target;


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#Category_1").click(function () {
      localStorage.setItem("selectedCategory", "FastFood");
      $("#content")[0].load("category.html");
    });

    $("#Category_2").click(function () {
      localStorage.setItem("selectedCategory", "Kebabs");
      $("#content")[0].load("category.html");
    });

    $("#Category_3").click(function () {
      localStorage.setItem("selectedCategory", "Chinese");
      $("#content")[0].load("category.html");
    });

    $("#Category_4").click(function () {
      localStorage.setItem("selectedCategory", "Pizza");
      $("#content")[0].load("category.html");
    });
    $("#Category_5").click(function () {
      localStorage.setItem("selectedCategory", "Vegeterian");
      $("#content")[0].load("category.html");
    });

    $("#Category_6").click(function () {
      localStorage.setItem("selectedCategory", "Thai");
      $("#content")[0].load("category.html");
    });


    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });
  }

  // if (page.id === 'menuPage') {
  //   console.log("menuPage");

    // $("#login").click(function () {
    //   $("#content")[0].load("login.html");
    //   $("#sidemenu")[0].close();
    // });

  //   $("#home").click(function () {
  //     $("#content")[0].load("home.html");
  //     $("#sidemenu")[0].close();
  //   });
  // }

  if (page.id === 'categoryPage') {
   
    var category = localStorage.getItem("selectedCategory");
    console.log("categoryPage:" + category);

    $("#header").html(category);

    $("#home").click(function () {
      $("#content")[0].load("home.html");
    });
    $("#logout").click(function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $("#content")[0].load("login.html");
    }).catch(function (error) {
      // An error happened.
    });
  });
    $("#list").empty();
    db.collection("restaurant").where("category", "==", category).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      
        var item = '<ons-list-item onclick="openPlayScreen(' + "'" + doc.data().name + "'" + ')">' +
         ' <div class="left">' +
         '<img class="list-item__thumbnail" src="' + doc.data().photoUrl + '">' +
         '</div>' +
         '<div class="center">' +
         ' <span class="list-item__title"  style="color: black;">name restaurants :' + doc.data().name + '</span><span class="list-item__subtitle"  style="color: black;">ที่อยู่ :' + doc.data().address + '</span>' +
         '</div>' +
         ' </ons-list-item>'
        $("#list").append(item);
        console.log(doc.data().name);
        
      });
    });

    
  }

  if (page.id === 'orderPage') {
   
    var nameres = localStorage.getItem("nameres");
  
    $("#nameres").html("ชื่อร้าน :"+nameres);

    $("#home").click(function () {
      $("#content")[0].load("home.html");
    });
    $("#logout").click(function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $("#content")[0].load("login.html");
    }).catch(function (error) {
      // An error happened.
    });
  });
   

  var docref = localStorage.getItem("docref");
  console.log(docref);

  db.collection('restaurant').doc(docref).collection('menu').get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc 
        console.log(doc.id, " => ", doc.data());
        $("#listres").append(
          '<ons-row>' +
          '<ons-col>' +
          '<ons-list-item modifier="tappable">' + doc.data().name + '</ons-list-item>' +
          ' </ons-col>' +
          ' <ons-col width="70px">' +
          ' <ons-list-item modifier="tappable">฿' + doc.data().price + '</ons-list-item>' +
          ' </ons-col>' +
          '<ons-col width="50px">' +
          ' <ons-button modifier="material">+</ons-button>' +
          '</ons-col>' +
          '  </ons-row>'

        )

      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  }
  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }
});






function openPlayScreen(nameres) {
  var res = nameres;
  console.log("res ::" + res);
  localStorage.setItem('nameres', res);

  db.collection("restaurant").where("name", "==", res)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc 


        console.log(doc.id, " => ", doc.data());
        localStorage.setItem('docref', doc.id);
        $("#content")[0].load("order.html");

      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


}

function listmenu() {
 
  var docref = localStorage.getItem("docref");
  console.log(docref);

  db.collection('restaurant').doc(docref).collection('menu').get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc 
        console.log(doc.id, " => ", doc.data());
        $("#listres").append(
          '<ons-row>' +
          '<ons-col>' +
          '<ons-list-item modifier="tappable">' + doc.data().name + '</ons-list-item>' +
          ' </ons-col>' +
          ' <ons-col width="70px">' +
          ' <ons-list-item modifier="tappable">฿' + doc.data().price + '</ons-list-item>' +
          ' </ons-col>' +
          '<ons-col width="50px">' +
          ' <ons-button modifier="material">+</ons-button>' +
          '</ons-col>' +
          '  </ons-row>'

        )

      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

var dataCart = [];
function add(add) {
  localStorage.clear('pid');
  localStorage.setItem('pid', add);
  var retrievedData = localStorage.getItem("pid");
  console.log(retrievedData);
  dataCart.push(retrievedData);

  ons.notification.toast("เพิ่มสินค้าใส่ตะกร้า", {
    timeout: 2000
  });
  $("#Fillbadge").attr('badge', dataCart.length);
}


function showAdd() {
  $("#Fillbadge").attr('badge', '');

  document.getElementById('pic').innerHTML = ""
  console.log(dataCart);

  var num = 0;
  dataCart.forEach(function (dataCart) {
    var apr = db.collection("PRODUCTS").where("pid", "==", dataCart);
    apr.get().then(function (querySnapshot) {
      console.log(querySnapshot.docs)
      var pic_template = $('#pic_template').html();
      var html = ejs.render(pic_template, { cart: querySnapshot.docs, num: num });
      console.log(html);



      $('#pic').append(html);
      num = num + 1;
    })
  })

}

function remove(i) {
  console.log(i);

  console.log(dataCart);

  var remove = dataCart.splice(i, 1)

  ons.notification.toast("สินค้าถูกลบเรียบร้อยเเล้ว", {
    timeout: 2000
  });
  $("#Fillbadge").attr('badge', dataCart.length);

  showAdd()

}
var price = 0;

function totalprice(priceadd) {
  var priceadd = parseInt(priceadd, 10)
  console.log(priceadd);

  price = price + priceadd;
  $('#showprice').html("<p><b>&nbsp; Total Price is : </b>" + price + " ฿</p>");

}
function removeprice(pricedel) {
  var pricedel = parseInt(pricedel, 10)
  console.log(pricedel);

  price = price - pricedel;
  if (price == 0) {
    document.getElementById('showprice').innerHTML = ''
  }
  else { $('#showprice').html("<p><b>&nbsp; Total Price is : </b>" + price + " ฿</p>"); }

}

function fastfood() {
  document.querySelector('#navigator').pushPage('payment.html', { animation: "lift" });
}

// Used to togle the play/paused icon on the play screen and the toast on the playlist page

function play_toggle(id) {
  document.getElementById(id).classList.toggle("fa-pause-circle-o");
  document.getElementById(id).classList.toggle("fa-play-circle-o");
}





var login = function () {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.code + ':' + error.message);
    ons.notification.alert('Login faild');
    // ...
  });

};

function gogoogle() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("signed out");

  }).then(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("user email"+user.email+"signed in");
    }).then(function () {
      window.location.href = 'home.html';
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }).catch(function (error) {
    // An error happened.
  });

}
firebase.auth().onAuthStateChanged(function (user) {
if (user) {
  window.location.href = 'index2.html';

}
});



function regiter() {
  window.location.href = 'register.html';

}