const mainElement = document.querySelector('main')

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
  let cardsHTML = ''
	wholeMenu.forEach(item => {
		item.amount = 0
		cardsHTML += `
			<div class="card">
					<img
						src="${item.image.mobile}"
						alt="${item.image.mobile}"
						class="card-image"
					/>
					<button class="card-add-button">
						<img src="assets/images/icon-add-to-cart.svg" alt="" />
						<p>Add to Cart</p>
					</button>
					<p class="card-title">${item.category}</p>
					<p class="card-description">${item.name}</p>
					<p class="card-price">${formatPrice(item.price)}</p>
			</div>
		`
	})
	
	mainElement.innerHTML += cardsHTML
	
	/* Render cart */
	let cartDiv = `
			<div class="div-cart">
				<p>Your Cart (X)</p>
				<img src="./assets/images/illustration-empty-cart.svg" alt="" class="img-empty-card"/>
				<div class="div-selected-items"></div>
				<p class="p-added-items-note">Your added items will appear here</p>
			</div>
		`
		mainElement.innerHTML += cartDiv

	/* Add listeners to all Add buttons */
	const addToCart = document.querySelectorAll('.card-add-button')

	addToCart.forEach((element, index) => {
		element.addEventListener('click', () => handleClick(wholeMenu[index]))})
})

function handleClick(clickedItem) {
	if(document.querySelector('.img-empty-card')) {
		document.querySelector('.img-empty-card').remove()
		document.querySelector('.p-added-items-note').remove()
	}

	selectedItems.push(clickedItem)
	clickedItem.amount += 1
	let selectedItemsHTML = `
		<div class="selected-item">
			${clickedItem.name}<br>
			<p class="selected-amount">${clickedItem.amount}x</p>
			${clickedItem.price}<br>
			<img src="../assets/images/icon-remove-item.svg" alt="Remove item"/>
		</div>`
	DivSelectedAmount = document.querySelector('.selected-amount')
	document.querySelector('.div-selected-items').innerHTML += selectedItemsHTML
}

function formatPrice(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number)
}
