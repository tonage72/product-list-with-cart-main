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
					<button class="card-add-button">
						<img src="assets/images/icon-add-to-cart.svg" alt="" />
						<p>Add to Cart</p>
					</button>
					<p class="card-title">${item.category}</p>
					<p class="card-description">${item.name}</p>
					<p class="card-price">${formatPrice(item.price)}</p>
		`
		menuListEl.appendChild(card)
	})
	
	/* Add listeners to all Add buttons */
	const addToCart = document.querySelectorAll('.card-add-button')
	addToCart.forEach((element, index) => {
		element.addEventListener('click', () => handleClick(wholeMenu[index]))})
})

function handleClick(clickedItem) {

	console.log(clickedItem.index)

	if(document.querySelector('.img-empty-card')) {
		document.querySelector('.img-empty-card').remove()
		document.querySelector('.p-added-items-note').remove()
	}

	const addedItem = document.createElement('div')
	addedItem.classList.add('added-item')
	addedItem.innerHTML = `
		<div class="added-item">
			${clickedItem.name}<br>
			<p class="added-count">Xx</p>
			${clickedItem.price}<br>
			<img src="../assets/images/icon-remove-item.svg" alt="Remove item" class="remove-item"/>
		</div>`
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
