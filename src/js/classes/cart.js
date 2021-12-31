import Shop from "./shop";
import DB from "./db";

export default class Cart {
	constructor(userId) {
		this.userId = userId;
	}

	products = [];
	shop = new Shop();
	db = new DB();

	addProduct(id) {
		let hasProd = false;
		if (this.products.length === 0) {
			this.products.push({ id: id, cnt: 1 });
			document.querySelector("#cart-cnt").textContent =
				this.products.length;
			return;
		}
		this.products.forEach((el) => {
			if (el.id === id) {
				el.cnt++;
				hasProd = true;
			}
		});
		if (!hasProd) {
			this.products.push({ id: id, cnt: 1 });
		}
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
	removeProduct(id) {
		this.products.splice(id, 1);
		this.shop.showCart(this.products);
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
	withdraw() {
		this.products = [];
		this.shop.showCart(this.products);
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
	checkout(user) {
		if (this.products.length > 0) {
			console.log("checkout");
			user.addOrder({
				userId: this.userId,
				date: Date.now(),
				sum: this.db.getSumOfOrder(this.products),
				products: this.db.getProbuctsOfOrder(this.products),
			});
			this.products.length = 0;
			this.withdraw();
		}
	}
}
