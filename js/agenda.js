(function(){

	var tbody = document.querySelector('tbody');
	tbody.addEventListener('dblclick', function(e){
		var td = e.target;

		if( td.dataset.date ){

			var split_date = td.dataset.date.split("/").map(function( item, i ){
				var n = parseInt( item );

				if( i == 1 ){
					n++;
				}

				if(n<10){
					n="0"+n;
				}

				

				return n;
			});

			var labelDataEvento = document.querySelector('.data-evento'),
			campoDescricao = document.querySelector('input[name=descricao-evento]'),
			btSalvar = document.querySelector('button[name=registrar-evento]');


			
			// escrevendo data do evento em que estÃ¡ sendo adicionado
			labelDataEvento.innerText = split_date[0]+"/"+split_date[1]+"/"+split_date[2];
				
			console.log(labelDataEvento.innerText);

				// abrindo modal
				$('.modal').openModal();
				var sended = false;

				// salvando data
				btSalvar.addEventListener('click', function(e){

					showLoader();

					if( campoDescricao.value !== "" ){

						if( !sended ){
							sended=true;
							// enviando
							$.post('app/http/agenda/request.php', {
								action : "registrar",
								descricao : campoDescricao.value,
								data_evento : labelDataEvento.innerText
							}, function( response ){
								
								alert( response.message );

								sended=false;

								$('.modal').closeModal();

								if(response.code == 1){
									location.reload();
								}

								hideLoader();
							}, 'json');

						}


					}else{
						alert("Informe a descriÃ§Ã£o!");
						hideLoader();
					}

					e.preventDefault();
				}, false);

			

				

			



		}

	});

})();