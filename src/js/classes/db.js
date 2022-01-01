export default class DB {
	constructor() {}
	usersArr = {
		wse: {
			login: "admin",
			pass: "12345",
			role: "admin",
			cash: 150,
		},
		rfd: {
			login: "user1",
			pass: "1111",
			role: "user",
			cash: 250,
		},
		lok: {
			login: "user2",
			pass: "12345",
			role: "2222",
			cash: 200,
		},
	};

	prodArr = {
		wseder: {
			name: "product 1",
			price: 100,
			qnt: 5,
		},
		rsdeee: {
			name: "product 2",
			price: 150,
			qnt: 1,
		},
		rfgbvc: {
			name: "product 3",
			price: 180,
			qnt: 7,
		},
		kiujhg: {
			name: "product 4",
			price: 135,
			qnt: 15,
		},
		loikhj: {
			name: "product 5",
			price: 120,
			qnt: 50,
		},
		uyhgft: {
			name: "product 6",
			price: 140,
			qnt: 0,
		},
	};

	orderArr = {
		sdsd: {
			userId: "rfd",
			date: 1640792742817,
			sum: 100,
			products: [
				{
					name: "product 1",
					price: 100,
					amt: 1,
				},
			],
		},
		ertx: {
			userId: "rfd",
			date: 1640991732824,
			sum: 300,
			products: [
				{
					name: "product 2",
					price: 150,
					amt: 2,
				},
			],
		},
		sdex: {
			userId: "lok",
			date: 1640991732836,
			sum: 220,
			products: [
				{
					name: "product 1",
					price: 100,
					amt: 1,
				},
				{
					name: "product 5",
					price: 120,
					amt: 1,
				},
			],
		},
		asde: {
			userId: "rfd",
			date: 1641054804985,
			products: [
				{ name: "product 1", price: 100, amt: 1 },
				{ name: "product 2", price: 150, amt: 1 },
			],
			sum: 250,
		},
	};
	init() {
		localStorage.setItem("usersArr", JSON.stringify(this.usersArr));
		localStorage.setItem("prodArr", JSON.stringify(this.prodArr));
		localStorage.setItem("orderArr", JSON.stringify(this.orderArr));
	}
	/**
	 * Products
	 */
	getSumOfOrder(cartArr) {
		let data = JSON.parse(localStorage.getItem("prodArr"));

		let res = [];
		cartArr.forEach((el) => {
			res.push(data[el.id]);
		});
		let sum = 0;

		for (let item in res) {
			sum += res[item].price * cartArr[item].cnt;
		}
		return sum;
	}
	getProbuctsOfOrder(cartArr) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		let res = [];
		cartArr.forEach((el) => {
			res.push({
				name: data[el.id].name,
				price: data[el.id].price,
				amt: el.cnt,
			});
		});

		return res;
	}
	setProbuctsOfOrder(cartArr) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		cartArr.forEach((el) => {
			data[el.id].qnt = data[el.id].qnt - el.cnt;
		});

		localStorage.setItem("prodArr", JSON.stringify(data));
	}
	getProducts() {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		let res = [];
		for (let key in data) {
			if (data[key].qnt > 0) {
				let tmp = {
					id: key,
					name: data[key].name,
					price: data[key].price,
				};
				res.push(tmp);
			}
		}
		return res;
	}
	getProductsOfCart(cartArr) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		let res = [];
		for (let key in cartArr) {
			let tmp = {
				id: cartArr[key].id,
				name: data[cartArr[key].id].name,
				price: data[cartArr[key].id].price,
				cnt: cartArr[key].cnt,
			};
			res.push(tmp);
		}
		let sum = 0;

		for (let item in res) {
			sum += res[item].price * res[item].cnt;
		}
		return { products: res, sum: sum };
	}
	getAllProducts() {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		let res = [];
		for (let key in data) {
			let tmp = {
				id: key,
				name: data[key].name,
				price: data[key].price,
				qnt: data[key].qnt,
			};
			res.push(tmp);
		}
		return res;
	}
	getSingleProduct(id) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		for (let key in data) {
			if (key === id) {
				return {
					name: data[key].name,
					price: data[key].price,
					qnt: data[key].qnt,
				};
			}
		}
		return false;
	}
	setProduct(product) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		data[Date.now()] = product;
		localStorage.setItem("prodArr", JSON.stringify(data));
	}
	editProduct(product, id) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		for (let key in data) {
			if (key === id) {
				data[key].name = product.name;
				data[key].price = product.price;
				data[key].qnt = product.qnt;
			}
		}
		localStorage.setItem("prodArr", JSON.stringify(data));
	}
	getSortedProducts(sort, field) {
		let data = JSON.parse(localStorage.getItem("prodArr"));
		const res = [];
		for (let key in data) {
			let tmp = {
				id: key,
				name: data[key].name,
				price: data[key].price,
				qnt: data[key].qnt,
			};
			res.push(tmp);
		}
		res.sort((prev, next) => {
			if (sort === "asc") {
				if (field === "name") {
					if (prev[field] < next[field]) return -1;
					if (prev[field] > next[field]) return 1;
					return 0;
				}
				return prev[field] - next[field];
			} else {
				if (field === "name") {
					if (prev[field] > next[field]) return -1;
					if (prev[field] < next[field]) return 1;
					return 0;
				}
				return next[field] - prev[field];
			}
		});
		return res;
	}
	/**
	 * Users
	 */
	getUser(login, pass) {
		let data = JSON.parse(localStorage.getItem("usersArr"));
		for (let key in data) {
			if (data[key].login === login && data[key].pass === pass) {
				return {
					id: key,
					login: data[key].login,
					cash: data[key].cash,
				};
			}
		}
		return false;
	}
	isAdmin(login, pass) {
		let data = JSON.parse(localStorage.getItem("usersArr"));
		for (let key in data) {
			if (data[key].login === login && data[key].pass === pass) {
				if (data[key].role === "admin") return true;
			}
		}
		return false;
	}
	/**
	 * Orders
	 */
	setOrder(order) {
		let data = JSON.parse(localStorage.getItem("orderArr"));
		data[Date.now()] = order;
		localStorage.setItem("orderArr", JSON.stringify(data));
	}
	getOrders(userId, sort, field) {
		let data = JSON.parse(localStorage.getItem("orderArr"));
		const res = [];
		for (let item in data) {
			if (data[item].userId === userId) {
				res.push(data[item]);
			}
		}
		res.sort((prev, next) => {
			if (sort === "asc") {
				return prev[field] - next[field];
			} else {
				return next[field] - prev[field];
			}
		});
		return res;
	}
}
