class Product {
	constructor(name, price, qnt) {
		this.name = name;
		this.price = price;
		this.qnt = qnt;
	}
	substractAmount(amount, id) {
		this.qnt -= amount;
	}
}
