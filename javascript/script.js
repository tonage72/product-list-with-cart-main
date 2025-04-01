const main = document.querySelector('main')
const cart = document.querySelector('.cart')
const cartItems = document.querySelector('.cart-items')
const totalCharge = document.querySelector('.total-charge')
let totalChargePrice = 0
let cartItemsArray = []

cart.style.display = 'none'

fetch('./data.json')
	.then((data) => data.json())
	.then((datajson) => {
		renderMenu(datajson)
	})
	.catch(() => {main.innerHTML = 'Error fetching data.'})

function renderMenu(datajson) {
	datajson.forEach((menuItem, index) => {
		datajson[index].quantity = 0 // Initialize quantity for each item to 0, this will help in tracking the number of items in the cart
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
	// Add item price to total charge and update the display
	totalChargePrice += newItem.price
	totalCharge.innerHTML = totalChargePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

	// Add new item if not in array. Else increment the quantity by 1
	if (!cartItemsArray.some(item => item.name === newItem.name)) {
		newItem.quantity += 1
		cartItemsArray.push(newItem) // Add the new item to the cart items array
	} else {
		newItem.quantity += 1
	}

	cartItems.innerHTML = '' // Clear the cart items display before re-rendering

	cartItemsArray.forEach((item) => {
		console.log(item)
		cartItems.innerHTML += `
	<div class='item-in-cart'>
		${item.name}
		${item.price}
		${item.quantity}
	</div>
	`
	})
}