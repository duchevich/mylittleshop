import DB from "./db";

export default class Shop {
	cont = document.querySelector("#myApp");
	db = new DB();
	login() {
		this.cont.innerHTML = "";
		let box = `<div class="auth">
						<form action="login">
							<div class="auth__block">
								<div class="auth__err" id="authErr"></div>
								<input class="input auth__input" type="text" name="user" id="userInputVal" placeholder="Login" required/>
								<input class="input auth__input" type="password" name="" id="passInputVal" placeholder="Password" required/>
								<input class="btn submit auth__submit" type="submit" value="Send" id="authSubmit"/>
							</div>
						</form>
					</div>`;
		this.cont.innerHTML = box;
	}
	showProducts() {
		const prodArr = this.db.getProducts();
		this.cont.innerHTML = "";
		let box = `<div class="shop">`;
		for (let item in prodArr) {
			box += `<div class="card">
                        <div class="card__image"></div>
                        <div class="card__name">${prodArr[item].name}</div>
                        <div class="card__price">${prodArr[item].price}$</div>
                        <button class="card__btn btn" data-id="${prodArr[item].id}">Buy</button>
                    </div>`;
		}
		box += `</div>`;
		this.cont.innerHTML = box;
	}
	showCart(productsInCart) {
		const data = this.db.getProductsOfCart(productsInCart);
		const prodArr = data.products;
		const sum = data.sum;
		let cont = document.querySelector("#myApp");
		cont.innerHTML = "";
		let box = `<div class="cart">`;
		if (prodArr.length === 0) {
			box += `Cart is empty`;
		} else {
			box = `<div class="cart__table">`;
			for (let item in prodArr) {
				// sum += prodArr[item].price * prodArr[item].cnt;
				box += `<div class="cart__tr">
                        <div class="cart__name">${prodArr[item].name}</div>
                        <div class="cart__price">${prodArr[item].price}$</div>
                        <div class="cart__cnt">${prodArr[item].cnt}</div>
                        <div class="cart__sum">${
							prodArr[item].price * prodArr[item].cnt
						}$</div>
						<button type="button" class="btn-close cart__rem" aria-label="Close" data-id="${
							prodArr[item].id
						}"></button>
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
			<button class="cart__clean btn" id="cartClean">Clean cart</button>
			<button class="cart__close btn" id="cartClose">Close cart</button>
		</div>
		</div>`;
		cont.innerHTML = box;
	}
	showOrders(arr) {
		this.cont.innerHTML = "";
		let box = `<div class="orders">`;
		if (this.products.length === 0) {
			box += `You don't have eny orders`;
		} else {
			box = `<div class="orders__table">`;
			for (let item in arr) {
				console.log(item);
				box += `<div class="orders__tr">
                        	<div class="orders__name">${arr[item].name}</div>
                        	<div class="orders__price">${arr[item].price}$</div>
                        	<div class="orders__cnt">${
								this.products[item].cnt
							}</div>
							<div class="orders__sum">${arr[item].price * this.products[item].cnt}$</div>
                   		</div>`;
			}
			box += `</div>`;
		}

		box += `
		<div class="orders__buttons">
			<button class="orders__close btn" id="ordersClose">Close profile</button>
		</div>
		</div>`;
		cont.innerHTML = box;
	}
}
