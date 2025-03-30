const main = document.querySelector('main')
const cart = document.querySelector('.cart')
const cartItems = document.querySelector('.cart-items')

cart.style.display = 'none'

fetch('./data.json')
	.then((data) => data.json())
	.then((datajson) => {renderMenu(datajson)})
	.catch(() => {main.innerHTML = 'Error fetching data.'})

function renderMenu(datajson) {
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
	const addToCartBtns = document.querySelectorAll('.wrap-add-to-cart')
	const wrapAddedToCart = document.querySelectorAll('.wrap-added-to-cart')
	const minusButtons = document.querySelectorAll('.minus-button')
	const plusButtons = document.querySelectorAll('.plus-button')
	
	addToCartBtns.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			cart.style.display = 'block'
			addToCartBtns[index].style.display = 'none'
			wrapAddedToCart[index].style.display = 'flex'
			addItemToCart(datajson[index])
		})
	})

	minusButtons.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			console.log(`Minus button pushed. Index: ${index}`)
		})
	})

	plusButtons.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			addItemToCart(datajson[index])
		})
	})
}

function addItemToCart(newItem) {
	cartItems.innerHTML += `
	<div class='item-in-cart'>
		${newItem.name}
		${newItem.price}
	</div>
	`
}