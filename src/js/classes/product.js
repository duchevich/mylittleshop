import DB from "./db.js";

export default class Product {
	constructor(name, price, qnt) {
		this.name = name;
		this.price = price;
		this.qnt = qnt;
	}
	db = new DB();
	create() {
		this.db.setProduct({
			name: this.name,
			price: this.price,
			qnt: this.qnt,
		});
	}
	edit(id) {
		this.db.editProduct(
			{
				name: this.name,
				price: this.price,
				qnt: this.qnt,
			},
			id,
		);
	}
	substractAmount(amount, id) {
		this.qnt -= amount;
	}
}
