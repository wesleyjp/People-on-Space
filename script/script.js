var dataRend = [];
		var conttent = document.getElementById('conttent');
		var astro = {nome: null, nave: null, foto: null}
		var astroData = [];
		
		
		$.getJSON('http://api.open-notify.org/astros.json', function(data){
			conttent.innerHTML = "Existem "+ data.number + " pessoas no espaço seus nomes são: <br><br>";
			for (let i=0; i< data.people.length; i++) {
				$.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&origin=*&piprop=original&titles='+data.people[i].name, function(astroFoto){
				
				astro.nome = data.people[i].name;
				astro.nave = data.people[i].craft;

				try {astro.foto = astroFoto.query.pages[0].original.source} 
				catch(e){console.log("Foto: " +data.people[i].name+ ", não encontrada."); astro.foto="img/avatar.jpg"}
				

				astroData.push(astro);
				escreve(astro);

				});
			}
			
		});

		function escreve(astroData) {
				conttent.innerHTML += "<div class='astro_table'>NOME: " + astro.nome + "<br> NAVE: " + astro.nave + "<br><img src='" + astro.foto + "' id='astro_foto'></img></div>";
		}
	
		
		//ISS radar
		var dataRend = [];
		var canvas = document.querySelector("canvas");
		var ctx = canvas.getContext('2d');
		canvas.width = 600;
		canvas.height = 370;
		var sprites = new Image();
		sprites.src = "img/sprites.png";
		sprites.addEventListener('load', loop, false);

		/*
		imageMap = []
		iX = -180;
		iY = -90;
		while(iX < 180) {iX++}
		while(iY < 90) {iY++}
		imap = {x:iX, y:} */

		map = {name:"map", sx:0, sy:0, sw:956, sh:612, dx:0, dy:0, dw:600, dh:370};
		iss = {name:"iss", sx:985, sy:0, sw:213, sh:180, dx:10, dy:10, dw:80, dh:60};

		dataRend.push(map,iss);
		

		function loop() {
			render();
			window.requestAnimationFrame(loop);
		}
		
		function render() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (i in dataRend) {
				ctx.drawImage(sprites, dataRend[i].sx, dataRend[i].sy, dataRend[i].sw, dataRend[i].sh, dataRend[i].dx, dataRend[i].dy, dataRend[i].dw, dataRend[i].dh);
			}
		}