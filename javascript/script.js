const main = document.querySelector('main')
const cart = document.querySelector('.cart')

cart.style.display = 'none'

function getItemData() {
	fetch('./data.json')
		.then((data) => data.json())
		.then((datajson) => addCards(datajson))
}

function addCards(datajson) {
	datajson.forEach((element, index) => {
		main.innerHTML += `
			<div class="card">
					<img src="${element.image.mobile}" alt="">
					<button class="btn-add-to-cart">Add to Cart</button>
					<h2>${element.category}</h2>
					<h2>${element.name}</h2>
					<p>${element.price}</p>
					<h1>${index}</h1>
			</div>
		`
	});
}

getItemData()