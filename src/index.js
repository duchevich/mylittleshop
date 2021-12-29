import "./scss/style.scss";
import Shop from "./js/classes/shop.js";
import Cart from "./js/classes/cart.js";
import { User } from "./js/classes/user.js";

const prodArr = {
	1: {
		name: "product 1",
		price: 100,
		qnt: 5,
	},
	2: {
		name: "product 2",
		price: 150,
		qnt: 1,
	},
	3: {
		name: "product 3",
		price: 180,
		qnt: 7,
	},
	4: {
		name: "product 4",
		price: 135,
		qnt: 15,
	},
	5: {
		name: "product 5",
		price: 120,
		qnt: 50,
	},
	6: {
		name: "product 6",
		price: 140,
		qnt: 0,
	},
};
const usersArr = {
	1: {
		login: "admin",
		pass: "12345",
		role: "admin",
	},
	2: {
		login: "user1",
		pass: "1111",
		role: "user",
	},
	3: {
		login: "user2",
		pass: "12345",
		role: "2222",
	},
};

const appCont = document.querySelector("#myApp");
const cartBtn = document.querySelector(".header__cart");
// document.cookie = "user=admin";
// document.cookie = "pass=12345";

// let userCookies = document.cookie.split("; ");
// console.log(userCookies);
// console.log(typeof userName);
// let userPass = document.getCookie("pass");

// for (let key in usersArr) {
// 	if (usersArr[key].login === userName && usersArr[key].pass === userPass) {
// 		console.log("user exists");
// 	}
// }

// console.log(openRequest);
let shop = new Shop(prodArr);
// console.log(shop);
shop.init();

let user = new User("John", 0, "user");
let cart = user.getCart();
user.init();

function handlerCardBtn(e) {
	if (e.target.classList.contains("card__btn")) {
		cart.addProduct(e.target.dataset.id);
	}
}
appCont.addEventListener("click", handlerCardBtn);
// appCont.addEventListener("click", handler1);

function handlerCartBtn(e) {
	this.disabled = true;
	let res = [];
	cart.products.forEach((el) => {
		res.push(prodArr[el.id]);
	});
	cart.showCart(res);
}
cartBtn.addEventListener("click", handlerCartBtn);

function handlerCartClose(e) {
	if (e.target.id === "cartClose") {
		cartBtn.disabled = false;
		shop.init();
	}
}
appCont.addEventListener("click", handlerCartClose);

console.log(user.name);
console.log(cart);
