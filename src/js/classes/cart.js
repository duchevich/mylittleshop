export default class Cart {
	constructor(name) {
		this.name = name;
	}
	products = [];
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
		this.products.forEach((el) => {
			if (el.id === id) {
				el.cnt++;
			} else {
				this.products.push({ id: id, cnt: 1 });
			}
		});
		console.log(this.products);
		document.querySelector("#cart-cnt").textContent = this.products.length;
	}
	showCart(arrProds) {
		let cont = document.querySelector("#myApp");
		cont.innerHTML = "";
		let sum = 0;
		let box = `<div class="cart">`;
		if (this.products.length === 0) {
			box += `Cart is empty`;
		} else {
			box = `<div class="cart__table">`;
			for (let item in arrProds) {
				console.log(item);
				sum += arrProds[item].price * this.products[item].cnt;
				box += `<div class="cart__tr">
                        <div class="cart__name">${arrProds[item].name}</div>
                        <div class="cart__price">${arrProds[item].price}$</div>
                        <div class="cart__cnt">${this.products[item].cnt}</div>
                        <div class="cart__sum">${
							arrProds[item].price * this.products[item].cnt
						}$</div>
                        <button class="cart__btn btn" data-id="${
							arrProds[item].id
						}">Buy</button>
                    </div>`;
			}
			box += `</div>
				<div class="cart__all">${sum}$</div>
				<div class="cart__buttons">
					<button class="cart__checkout btn" id="cartCheckout">Сheckout</button>
				</div>
				`;
		}

		box += `
		<div class="cart__buttons">
			<button class="cart__close btn" id="cartClose">Close cart</button>
		</div>
		</div>`;
		cont.innerHTML = box;
	}
	withdraw() {}
	checkout() {}
}
