const body = document.querySelector('body')

function getItemData() {
	fetch('./data.json')
		.then((data) => data.json())
		.then((datajson) => addCards(datajson))
}

function addCards(datajson) {
	datajson.forEach((element, index) => {
		console.log(element)
		body.innerHTML += `
			<div class="card">
					<img src="${element.image.mobile}" alt="">
					<h2>${element.category}
					<h2>${element.name}</h2>
					<p>${element.price}</p>
					<h1>${index}</h1>
			</div>
		`
	});
}

getItemData()