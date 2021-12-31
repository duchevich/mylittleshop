import Cart from "./cart.js";
import Order from "./order.js";
import DB from "./db.js";

export class User {
	constructor({ id, login, cash }) {
		this.id = id;
		this.login = login;
		this.cash = cash;
	}
	db = new DB();
	init() {
		document.querySelector("#user").innerHTML = this.login;
		document.querySelector("#cash").innerHTML = `$${this.cash}`;
	}
	showOrderHistory(sort, field) {}
	getCart() {
		return new Cart(this.id);
	}
	addOrder(order) {
		console.log(order);
		this.cash -= order.sum;
		document.querySelector("#cash").innerHTML = `$${this.cash}`;
		this.db.setOrder(order);
		return new Order(order);
	}
}

export class Admin extends User {
	constructor(login, cash) {
		super(login, cash);
	}
	createProduct() {}
}
