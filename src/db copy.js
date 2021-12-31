// // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
// var indexedDB =
// 	window.indexedDB ||
// 	window.mozIndexedDB ||
// 	window.webkitIndexedDB ||
// 	window.msIndexedDB ||
// 	window.shimIndexedDB;

// // Open (or create) the database
// var openDB = indexedDB.open("store", 1);

// // Create the schema
// openDB.onupgradeneeded = function () {
// 	var db = openDB.result;
// 	var store = db.createObjectStore("products", { keyPath: "id" });
// 	var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
// };

// openDB.onsuccess = function () {
// 	// Start a new transaction
// 	var db = openDB.result;
// 	var tx = db.transaction("products", "readwrite");
// 	var store = tx.objectStore("products");
// 	var index = store.index("NameIndex");

// 	// Add some data
// 	store.put({ id: 12345, name: { first: "John", last: "Doe" }, age: 42 });
// 	store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });

// 	// Query the data
// 	var getJohn = store.get(12345);
// 	var getBob = index.get(["Smith", "Bob"]);

// 	getJohn.onsuccess = function () {
// 		console.log(getJohn.result.name.first); // => "John"
// 	};

// 	getBob.onsuccess = function () {
// 		console.log(getBob.result.name.first); // => "Bob"
// 	};

// 	// Close the db when the transaction is done
// 	tx.oncomplete = function () {
// 		db.close();
// 	};
// };
