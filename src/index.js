import "./scss/style.scss";
import DB from "./js/classes/db.js";
import Shop from "./js/classes/shop.js";
import { User, Admin } from "./js/classes/user.js";

let logFlag = false;
const appCont = document.querySelector("#myApp");
const cartBtn = document.querySelector(".header__cart");
const profileBtn = document.querySelector("#profileBtn");
const adminBtn = document.querySelector("#headerRight");

let db = new DB();
db.init();

let shop = new Shop();
let user;
let cart;

let userStr = sessionStorage.getItem("user");
let passStr = sessionStorage.getItem("pass");

if (userStr && passStr) {
	let userData = db.getUser(userStr, passStr);
	if (userData) {
		logFlag = true;
		document.querySelector(".header__cart").disabled = false;
		document.querySelector("#profileBtn").disabled = false;
		shop.showProducts();
		let isAdmin = db.isAdmin(userStr, passStr);
		if (isAdmin) {
			user = new Admin(userData);
			shop.showAdminPageBtn();
		} else {
			user = new User(userData);
		}
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
			let isAdmin = db.isAdmin(userVal, passVal);
			if (isAdmin) {
				user = new Admin(userData);
				shop.showAdminPageBtn();
			} else {
				user = new User(userData);
			}
			cart = user.getCart();
			user.init();
			sessionStorage.setItem("user", userVal);
			sessionStorage.setItem("pass", passVal);
			logFlag = true;
			document.querySelector(".header__cart").disabled = false;
			document.querySelector("#profileBtn").disabled = false;
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
	if (e.target.closest(".cart__minus")) {
		cart.minusProduct(e.target.closest(".cart__minus").dataset.id);
	}
	if (e.target.closest(".cart__plus")) {
		cart.plusProduct(e.target.closest(".cart__plus").dataset.id);
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
	if (e.target.id === "ordersClose") {
		shop.showProducts();
	}
	if (e.target.closest("#ordersDateAsc")) {
		user.showOrderHistory("asc", "date");
	}
	if (e.target.closest("#ordersDateDesc")) {
		user.showOrderHistory("desc", "date");
	}

	if (e.target.closest("#ordersSumAsc")) {
		user.showOrderHistory("asc", "sum");
	}
	if (e.target.closest("#ordersSumDesc")) {
		user.showOrderHistory("desc", "sum");
	}
	if (e.target.id === "createProduct") {
		shop.showProductPage();
	}
	if (e.target.id === "closeAdminPage") {
		shop.showProducts();
	}
	if (e.target.classList.contains("admin__product-btn")) {
		shop.showProductPage(e.target.dataset.id);
	}
	if (e.target.id === "closeProductPage") {
		shop.showAdminPage();
	}
	if (e.target.id === "productSubmit") {
		e.preventDefault();
		let prodVal = document.querySelector("#productInputVal").value;
		let qntVal = Number(document.querySelector("#qntInputVal").value);
		let priceVal = Number(document.querySelector("#priceInputVal").value);
		if (e.target.dataset.id) {
			user.editProduct(prodVal, priceVal, qntVal, e.target.dataset.id);
		} else {
			user.createProduct(prodVal, priceVal, qntVal);
		}
	}

	if (e.target.closest("#adminProductAsc")) {
		user.sortProductList("asc", "name");
	}
	if (e.target.closest("#adminProductDesc")) {
		user.sortProductList("desc", "name");
	}
	if (e.target.closest("#adminQntAsc")) {
		user.sortProductList("asc", "qnt");
	}
	if (e.target.closest("#adminQntDesc")) {
		user.sortProductList("desc", "qnt");
	}
	if (e.target.closest("#adminPriceAsc")) {
		user.sortProductList("asc", "price");
	}
	if (e.target.closest("#adminPriceDesc")) {
		user.sortProductList("desc", "price");
	}
});

profileBtn.addEventListener("click", function () {
	document.querySelector(".header__cart").disabled = false;
	user.showOrderHistory();
});
adminBtn.addEventListener("click", function (e) {
	document.querySelector(".header__cart").disabled = false;
	if (e.target.id === "adminBtn") {
		shop.showAdminPage();
	}
});
