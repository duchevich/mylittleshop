import Shop from "./shop";
import Product from "./product";
import DB from "./db";

export default class Cart {
	constructor(userId) {
		this.userId = userId;
	}

	products = [];
	shop = new Shop();
	db = new DB();
	product = new Product();

	addProduct(id) {
		let hasProd = false;
		if (this.products.length === 0) {
			this.products.push({ id: id, cnt: 1 });
			document.querySelector("#cart-cnt").textContent =
				this.products.length;
			alert("Product added to cart");
			return;
		}
		this.products.forEach((el) => {
			if (el.id === id) {
				let newCnt = el.cnt + 1;
				if (this.product.substractAmount(newCnt, el.id)) {
					el.cnt++;
					alert("Product added to cart");
				} else {
					alert("No more this product");
				}
				hasProd = true;
			}
		});
		if (!hasProd) {
			this.products.push({ id: id, cnt: 1 });
			alert("Product added to cart");
		}
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
	removeProduct(id) {
		let tmp = this.products.filter((item) => {
			if (item.id !== id) {
				return item;
			}
		});
		this.products = tmp;
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
			let success = user.addOrder({
				userId: this.userId,
				date: Date.now(),
				sum: this.db.getSumOfOrder(this.products),
				products: this.db.getProbuctsOfOrder(this.products),
			});
			if (success) {
				this.db.setProbuctsOfOrder(this.products);
				this.withdraw();
				document.querySelector(
					"#cartMes",
				).innerHTML = `Your order created`;
			} else {
				document.querySelector(
					"#cartMes",
				).innerHTML = `Not enough money in the account`;
				document.querySelector("#cartMes").style.color = "red";
			}
		}
	}
	plusProduct(id) {
		this.products.forEach((el) => {
			if (el.id === id) {
				let newCnt = el.cnt + 1;
				if (this.product.substractAmount(newCnt, el.id)) {
					el.cnt++;
				} else {
					alert("No more this product");
				}
			}
		});
		this.shop.showCart(this.products);
	}
	minusProduct(id) {
		let tmp = this.products.filter((item) => {
			if (item.id !== id) {
				return item;
			} else {
				if (item.cnt > 1) {
					item.cnt--;
					return item;
				}
			}
		});
		this.products = tmp;
		this.shop.showCart(this.products);
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
}
