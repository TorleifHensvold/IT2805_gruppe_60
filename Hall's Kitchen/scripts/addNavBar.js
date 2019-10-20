const navBar = document.getElementById('navBar')
navBar.style.width = '100%'
navBar.style.height = '50px'
navBar.style.backgroundColor = 'grey'

/*
	A JSON object that represents the pages we have on the site, with
	relative linking.
 */
const pagesJSON =
	{
		'mainpage':
			{
				'name': 'Main Page',
				'url': 'index.html',
			}
		,
		'menu':
			{
				'name': 'Menu',
				'url': 'menu.html',
			}
		,
		'cart':
			{
				'name': 'Cart',
				'url': 'cart.html',
			}
		,
		'contact_us':
			{
				'name': 'Contact us',
				'url': 'contact_us.html',
			}
		,
		'about_us':
			{
				'name': 'About us',
				'url': 'about_us.html',
			},
	}

/**
 * @return {Array} An array of links
 */
function createButtonOrder (JSONObject)
{
	let linkArray = []
	for (let key in JSONObject)
	{
		let url = ''
		let name = ''
		let subObject = JSONObject[key]
		for (let subkey in subObject)
		{
			if (subkey === 'name')
			{
				let subSubObject = subObject[subkey]
				//console.log("\t" + subkey + "\t" + subSubObject)
				name = subSubObject
			}
			if (subkey === 'url')
			{
				let subSubObject = subObject[subkey]
				//console.log("\t" + subkey + "\t" + subSubObject)
				url = subSubObject
			}
		}
		let link = createLink(url, name)
		linkArray.push(link)
	}
	//console.log(linkArray)
	return linkArray
}

/**
 *
 * @param url A relative link URL for use in "a href"
 * @param text The text that should show for the URL
 * @return {HTMLElement} A link with text.
 */
function createLink (url, text)
{
	let a = document.createElement('a')
	a.href = url;
	a.innerHTML = text;
	a.className = "navButton";
	//console.log(a);
	return a
}

function addButtons ()
{
	let request = new XMLHttpRequest()
	request.open('GET', 'JSON_files/navBar', false) // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
	request.send()
	let JSONObject = JSON.parse(request.responseText)
	console.log(JSONObject)
	for (let site in JSONObject)
	{
		console.log(site)
	}
}

const urlArray = createButtonOrder(pagesJSON)

for (let url in urlArray)
{
	navBar.innerText.concat(url);
}