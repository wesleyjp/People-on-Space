
var content = document.getElementById('content');
var astro = {nome: null, nave: null, foto: null}
var astroData = [];

$.getJSON('http://api.open-notify.org/astros.json?origin=*')
	.then(function(astros){
		astroData = astros.people;
		for (let i=0; i< astros.people.length; i++) {
			content.innerHTML += `<div id='${astros.people[i].name.replace(' ', '')}' class='astro_table'>NOME: ${astros.people[i].name} <br> NAVE: ${astros.people[i].craft} <br><img src='img/loading.gif'></img></div>`;
		}
		pegaAvatar();
	})
	.catch(function(error){
		console.log('Error get Astros' + error);
	});

function pegaAvatar() {
	for (let i=0; i< astroData.length; i++) {
		$.getJSON(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&origin=*&piprop=original&titles=${astroData[i].name}`)
			.then(function(avatar){
				document.querySelector(`div#${astroData[i].name.replace(' ', '')} img`).src = avatar.query.pages[0].original.source;
			})
			.catch(function(error){
				document.querySelector(`div#${astroData[i].name.replace(' ', '')} img`).src = "img/avatar.jpg"
			});
	}
}