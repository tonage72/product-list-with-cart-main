const menuListEl = document.querySelector('.menu-list')
const cartEl = document.querySelector('.cart')

let wholeMenu = []
let selectedItems = []

async function loadJSON() {
  try {
    const response = await fetch('../data.json')
    const data = await response.json()
    wholeMenu = data
  } catch (error) {
    console.error('Error Loading JSON', error)
  }
}

loadJSON().then(() => {
	/* Render menu */
	wholeMenu.forEach(item => {
		const card = document.createElement('div')
		card.classList.add('card')
		card.innerHTML =`
					<img
						src="${item.image.mobile}"
						alt="${item.image.mobile}"
						class="card-image"
					/>
					<button class="button-add-cart">
						<img src="assets/images/icon-add-to-cart.svg" alt="" />
						<p>Add to Cart</p>
					</button>
					<p class="card-title">${item.category}</p>
					<p class="card-name">${item.name}</p>
					<p class="card-price">${formatPrice(item.price)}</p>
		`
		menuListEl.appendChild(card)
	})
	
	/* Add listeners to all Add buttons */
	const addCartButton = document.querySelectorAll('.button-add-cart')
	addCartButton.forEach(button => {button.addEventListener('click', event => {
		const addedCard = event.target.closest('.card')
		button.classList.remove('button-add-cart')
		button.classList.add('button-added-cart')
		const addedPlusMinusHTML = `
			<figure>
				<img src="assets/images/icon-decrement-quantity.svg" alt="" class="decrement-button" />
			</figure>
				<p class="total-added-card">X</p>
			<figure>	
				<img src="assets/images/icon-increment-quantity.svg" alt="" class="increment-button" />
			</figure>
		`
		button.style.backgroundColor = "red"
		button.innerHTML = addedPlusMinusHTML
		addToCart(addedCard)
		})
	})


})

function addToCart(addedCard) {

	const addedCardName = addedCard.querySelector('.card-name').textContent
	const addedCardPrice = addedCard.querySelector('.card-price').textContent

	if(document.querySelector('.img-empty-card')) {
		document.querySelector('.img-empty-card').remove()
		document.querySelector('.p-added-items-note').remove()
	}
	
	const addedItem = document.createElement('div')
	addedItem.classList.add('added-item')
	addedItem.innerHTML = `
		${addedCardName}<br>
		<p class="added-count">Xx</p>
		${addedCardPrice}<br>
		<img src="../assets/images/icon-remove-item.svg" alt="Remove item" class="remove-item"/>
	`
	cartEl.appendChild(addedItem)
}
function formatPrice(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number)
}
