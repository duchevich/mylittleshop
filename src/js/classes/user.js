import Cart from "./cart.js";
import Order from "./order.js";
import DB from "./db.js";
import Shop from "./shop.js";

export class User {
	constructor({ id, login, cash }) {
		this.id = id;
		this.login = login;
		this.cash = cash;
	}
	db = new DB();
	shop = new Shop();
	init() {
		document.querySelector("#user").innerHTML = this.login;
		document.querySelector("#cash").innerHTML = `$${this.cash}`;
	}
	showOrderHistory(sort = "desc", field = "date") {
		this.shop.showOrders(this.db.getOrders(this.id, sort, field));
	}
	getCart() {
		return new Cart(this.id);
	}
	addOrder(order) {
		if (this.cash >= order.sum) {
			this.cash -= order.sum;
			document.querySelector("#cash").innerHTML = `$${this.cash}`;
			this.db.setOrder(order);
			return new Order(order);
		} else {
			return false;
		}
	}
}

export class Admin extends User {
	constructor(login, cash) {
		super(login, cash);
	}
	createProduct() {}
}
