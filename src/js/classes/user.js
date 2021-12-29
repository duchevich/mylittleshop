import Cart from "./cart.js";
export class User {
	constructor(name, cash, role) {
		this.name = name;
		this.cash = cash;
		this.role = role;
	}
	init() {
		document.querySelector("#user").innerHTML = this.name;
	}
	showOrderHistory(sort, field) {}
	getCart() {
		return new Cart(this.name);
	}
	addOrder() {}
}

export class Admin extends User {
	constructor(name, cash) {
		super(name, cash);
	}
	createProduct() {}
}
