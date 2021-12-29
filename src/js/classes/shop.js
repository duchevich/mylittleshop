export default class Shop {
	constructor(prodArr) {
		this.prodArr = prodArr;
	}
	init() {
		let cont = document.querySelector("#myApp");
		cont.innerHTML = "";
		let box = `<div class="shop">`;
		// box.classList.add('shop')
		for (let item in this.prodArr) {
			// console.log(item);
			// let card = document.createElement('div');
			// card.classList.add('card')
			box += `<div class="card">
                        <div class="card__image"></div>
                        <div class="card__name">${this.prodArr[item].name}</div>
                        <div class="card__price">${this.prodArr[item].price}$</div>
                        <button class="card__btn btn" data-id="${item}">Buy</button>
                    </div>`;
		}
		box += `</div>`;
		cont.innerHTML = box;
	}
}
