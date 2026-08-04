function login(){

let name=document.getElementById("name").value;

let email=document.getElementById("email").value;

if(name=="" || email==""){

alert("Please Enter Details");

return;

}

document.getElementById("loginBox").style.display="none";

document.getElementById("mainPage").style.display="block";

alert("Welcome "+name);

}

function reserveTable(){

let table=document.getElementById("table").value;

document.getElementById("reserveMsg").innerHTML=

"Your "+table+" has been reserved successfully.";

}

function showDish(){

document.getElementById("dish").innerHTML=

"Our Dum Chicken Biryani is prepared with premium basmati rice, authentic spices, and slow-cooked for rich flavor.";

}

function orderMeal(){

let meal=document.getElementById("meal").value;

document.getElementById("mealMsg").innerHTML=

meal+" ordered successfully.";

}

function addReview(){

let review=document.getElementById("review").value;

if(review==""){

alert("Write Review");

return;

}

let div=document.getElementById("reviews");

div.innerHTML+="<p>⭐ "+review+"</p>";

document.getElementById("review").value="";

}