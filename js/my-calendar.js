	var month_names = [
		"Janeiro",
		"Fevereiro",
		"MarÃ§o",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agotso",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro"
	];

	var dayNames = [
		"Domingo",
		"Segunda",
		"TerÃ§a",
		"Quarta",
		"Quinta",
		"Sexta",
		"SÃ¡bado"
	];

	// limite de dias em cada mes
	var limit_days_months = [
		31, // janeiro
		28, // fevereiro
		31, // marÃ§o
		30, // abril 
		31, // maio
		30, // junho
		31, // julho
		31, // agosto
		30, // setembro
		31, // outubro
		30, // novembro
		31 // dezembro
	];


	var dt = new Date();




	// escreve o mes
	var _writeMonthName = function( month_name ){
		var elems = document.querySelectorAll('.month-name');
		for (var i = 0; i < elems.length; i++) {
			elems[i].innerText = month_name;
			elems[i].dataset.val = month_names.indexOf( month_name );
		}// end loop for
	};

	// escreve o ano
	var _writeYear = function( year ){
		var elems = document.querySelectorAll('.year-value');

		for (var i = 0; i < elems.length; i++) {
			elems[i].innerText = year;
			elems[i].dataset.val = year;
		}// end loop for
	};

	// verifica se o ano Ã© bissexto
	var _isLeap = function( year ){
		return year % 4 == 0 && year % 100 != 0;
	};


	// renderiza o calendÃ¡rio de acordo com uma data especificada
	var renderCalendar = function( base_date ){
		base_date = (base_date instanceof Date) ? base_date : new Date();

		var today = new Date();
		var today_str = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear();
		delete today;

		var date = base_date.getDate(), 
		month = base_date.getMonth(),
		year = base_date.getFullYear();
		
		// escrevendo mes
		_writeMonthName( month_names[month] );
 
		// escrevendo ano
		_writeYear(year);

		// primeiro dia do mes
		base_date.setDate(1);
		var first_day = base_date;
		// base_date.setDate(date);

		console.log( "Primeiro dia : "+dayNames[first_day.getDay()] );
		console.log( "Primeiro dia : "+first_day.getDay() );

		if( _isLeap( year ) ){
			// Fevereiro recebe mais um dia
			limit_days_months[1] = 29;
		}else{
			limit_days_months[1] = 28;
		}

		
		var d = first_day.getDay();
		var total_days = limit_days_months[month];


		var tbody = document.querySelector('tbody'), tr, td;
		var count =0;
		var c = 1;

		for (var i = 0; i < 5; i++) {
			
			tr = document.createElement('tr');

			for( var j=0; j<7; j++ ){

				td = document.createElement('td');
				td.className = 'dia';


				if( count < d || c > total_days ){
					td.appendChild( document.createTextNode(" ") );	
				}else{
					td.classList.add('event');
					var _strdate= c+"/"+month+"/"+year;
					td.dataset.date = _strdate;
					td.appendChild( document.createTextNode( c ) );

					// evento de teste
					if( _strdate == "12/1/2017" ){	
						var span = document.createElement('span');
						span.className='evento';
						span.appendChild( document.createTextNode( '2' ) );

						td.appendChild(span);
					}

					// marcando dia atual
					if( _strdate == today_str ){
						td.classList.add('today');
					}

					c++;
				}


				tr.appendChild( td );
				count++;

			}// end intern for


			tbody.appendChild( tr );

		}// end extern for

	};

	var _controlBt = function(){

		document.querySelector('tbody').innerHTML = "";

		var target = this.parentNode.dataset.target;
		var action = this.dataset.value;

		if( target == 'month' ){

			var m = parseInt( document.querySelector('.month-name').dataset.val );
			
			if( action == "prev" ){
				m--;
			}else if( action == "next" ){
				m++;
			}

			dt.setMonth( m );
			

		}else if( target == 'year' ){

			var y = parseInt( document.querySelector('.year-value').dataset.val );
			
			if( action == "prev" ){
				y--;
			}else if( action == "next" ){
				y++;
			}

			dt.setFullYear(y);


		}

		renderCalendar(dt);

	};



	var btControls = document.querySelectorAll('.control-bt');
	for (var i = 0; i < btControls.length; i++) {
		btControls[i].addEventListener('click', _controlBt, false);
	}; // end for


	// renderizando calendÃ¡rio
	renderCalendar( dt );

