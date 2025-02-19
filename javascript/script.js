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

	cartDiv = `
		<div class="div-cart">
			<p>Your Cart (X)</p>
			<img src="./assets/images/illustration-empty-cart.svg" alt="" />
			<p>Your added items will appear here
		</div>
	`

	mainElement.innerHTML += cardsHTML
	mainElement.innerHTML += cartDiv

	const addToCart = document.querySelectorAll('.card-add-button')
	
	addToCart.forEach((element, index) => {
		element.addEventListener('click', () => {handleClick(wholeMenu[index])})
	})
}

function handleClick(Clickeditem) {
	console.log(`Category: ${Clickeditem.category}, Name: ${Clickeditem.name}, Price: ${Clickeditem.price}`)
}

function formatPrice(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number)
}
