const mainElement = document.querySelector('main')

let wholeMenu = []

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
  renderMenu()
})

function renderMenu() {
	let cardsHTML = ''
	wholeMenu.forEach(item => {
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
}

function formatPrice(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number)
}
