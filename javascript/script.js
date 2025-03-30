const main = document.querySelector('main')
const cart = document.querySelector('.cart')

cart.style.display = 'none'

fetch('./data.json')
	.then((data) => data.json())
	.then((datajson) => {
		datajson.forEach((menuItem, index) => {
			main.innerHTML += `
				<div class="card">
						<img src="${menuItem.image.mobile}" alt="">
						<button class="btn-add-to-cart">Add to Cart</button>
						<h2>${menuItem.category}</h2>
						<h2>${menuItem.name}</h2>
						<p>${menuItem.price}</p>
						<h1>${index}</h1>
				</div>
			`
		})
		const addToCartBtns = document.querySelectorAll('.btn-add-to-cart')
		addToCartBtns.forEach((btn, index) => {
			btn.style.backgroundColor = 'red'
	})
})
