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
						<div class="wrap-add-to-cart">
							<button>Add to Cart</button>
						</div>
						<div class="wrap-added-to-cart">
							<button class="minus-button">- </button>
							<span class="total-added-cart">1</span>
							<button class="plus-button"> +</button>
						</div>
						<h2>${menuItem.category}</h2>
						<h2>${menuItem.name}</h2>
						<p>${menuItem.price}</p>
						<h1>${index}</h1>
				</div>
			`
		})
	})
	.then(() => {
		const addToCartBtns = document.querySelectorAll('.wrap-add-to-cart')
		const wrapAddedToCart = document.querySelectorAll('.wrap-added-to-cart')
		addToCartBtns.forEach((btn, index) => {
			btn.addEventListener('click', () => {
				cart.style.display = 'block'
				addToCartBtns[index].style.display = 'none'
				wrapAddedToCart[index].style.display = 'flex'
			})
		})
	})