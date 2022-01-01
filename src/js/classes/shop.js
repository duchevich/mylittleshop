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
			box += `<div class="cart__mes" id="cartMes"></div>
					<div class="cart__empty">Cart is empty</div>
					<div class="cart__buttons">
						<button class="cart__close btn" id="cartClose">Close cart</button>
					</div>`;
		} else {
			box += `<div class="cart__mes" id="cartMes"></div><div class="cart__table">`;
			for (let item in prodArr) {
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
				<div class="cart__buttons">
					<button class="cart__clean btn" id="cartClean">Clean cart</button>
					<button class="cart__close btn" id="cartClose">Close cart</button>
				</div>
				`;
		}

		box += `</div>`;
		cont.innerHTML = box;
	}
	showOrders(arr) {
		this.cont.innerHTML = "";
		let box = `<div class="orders"> <div class="orders__title">Your orders</div>`;
		if (arr.length === 0) {
			box += `<div class="orders__mes" id="ordersMes"></div>
					<div class="orders__empty">You don't have any orders</div>
					<div class="orders__buttons">
						<button class="orders__close btn" id="ordersClose">Close profile</button>
					</div>`;
		} else {
			box += `<div class="orders__table">
						<div class="orders__tr orders__th">
                        	<div class="orders__date">
								<div class="orders__label">Date</div>
								<div class="orders__nav">
									<button class="btn" id="ordersDateAsc">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
											<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
										</svg>
									</button>
									<button class="btn" id="ordersDateDesc">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
  											<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
										</svg>
									</button>
								</div>
							</div>
                        	<div class="orders__list">
								<div class="orders__products">
									<div class="orders__name">Product</div>
									<div class="orders__cnt">Quantity</div>
									<div class="orders__price">Price</div>
								</div>
							</div>
							<div class="orders__sum">
								<div class="orders__label">Sum</div>
								<div class="orders__nav">
									<button class="btn" id="ordersSumAsc">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
											<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
										</svg>
									</button>
									<button class="btn" id="ordersSumDesc">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
											<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
										</svg>
									</button>
								</div>
							</div>
						</div>`;
			for (let item in arr) {
				box += `<div class="orders__tr">
                        	<div class="orders__date">${new Date(
								arr[item].date,
							).toGMTString()}</div>
                        	<div class="orders__list">`;
				for (let prod in arr[item].products) {
					box += `<div class="orders__products">
							<div class="orders__name">${arr[item].products[prod].name}</div>
							<div class="orders__cnt">${arr[item].products[prod].amt}</div>
							<div class="orders__price">${arr[item].products[prod].price}</div>
						</div>`;
				}
				box += `</div>
					<div class="orders__sum">$${arr[item].sum}</div>
				</div>`;
			}
			box += `</div>`;
		}

		box += `
		<div class="orders__buttons">
			<button class="orders__close btn" id="ordersClose">Close profile</button>
		</div>
		</div>`;
		this.cont.innerHTML = box;
	}
}
