import "./scss/style.scss";
import DB from "./js/classes/db.js";
import Shop from "./js/classes/shop.js";
import { User } from "./js/classes/user.js";

let logFlag = false;
const appCont = document.querySelector("#myApp");
const cartBtn = document.querySelector(".header__cart");

let db = new DB();
db.init();
db.getOrders(2);

let shop = new Shop();
let user;
let cart;

let userStr = sessionStorage.getItem("user");
let passStr = sessionStorage.getItem("pass");

if (userStr && passStr) {
	let userData = db.getUser(userStr, passStr);
	if (userData) {
		logFlag = true;
		shop.showProducts();
		user = new User(userData);
		cart = user.getCart();
		user.init();
	} else {
		shop.login();
	}
} else {
	shop.login();
}

cartBtn.addEventListener("click", function () {
	this.disabled = true;
	shop.showCart(cart.products);
});

appCont.addEventListener("click", function (e) {
	if (e.target.id === "authSubmit") {
		e.preventDefault();
		let userVal = document.querySelector("#userInputVal").value;
		let passVal = document.querySelector("#passInputVal").value;
		let userData = db.getUser(userVal, passVal);
		if (userData) {
			shop.showProducts();
			user = new User(userData);
			cart = user.getCart();
			user.init();
			sessionStorage.setItem("user", userVal);
			sessionStorage.setItem("pass", passVal);
			logFlag = true;
		}
		if (!logFlag) {
			document.querySelector("#userInputVal").value = "";
			document.querySelector("#passInputVal").value = "";
			document.querySelector("#authErr").textContent = "Incorrect data";
		}
	}
	if (e.target.classList.contains("card__btn")) {
		cart.addProduct(e.target.dataset.id);
	}
	if (e.target.classList.contains("cart__rem")) {
		cart.removeProduct(e.target.dataset.id);
	}
	if (e.target.id === "cartClean") {
		cart.withdraw();
	}
	if (e.target.id === "cartCheckout") {
		cart.checkout(user);
	}
	if (e.target.id === "cartClose") {
		document.querySelector(".header__cart").disabled = false;
		shop.showProducts();
	}
});

console.log(user);
console.log(cart);
