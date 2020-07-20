let name = "Инкогнито";
function checkName(str){
	let error = $('#tabu')
	error.css('display','none')	


	let new_str = str.replace(new RegExp(' ' ,'g'),'')
	const len = new_str.length
	new_str=new_str.toLowerCase()

	let tabu=['+','-','#','№','*'];
	let isTabu = false
	for(let i=0;i<tabu.length;i++){
		let index=new_str.indexOf(tabu[i])
		if(index != -1){
			isTabu = true
			error.text('В имени не должны присутствовать такие символы/буквы:'+tabu.join()+'!')
			error.css('display','block')
		}
	}

	let skip = $('#skip:checked')
   
    if ((len>0 && !isTabu) || skip.length != 0) {
    	$('#play').prop('disabled',false)
    }
    else{
    	$('#play').prop('disabled',true)	
    }

}



function getName(){
	let inp = $('#name').val()
	let skip = $('#skip:checked')
	if(skip.length == 0){
		return inp	

	}

	return "Инкогнито"

}
// Функция,которая выбирает рандомный элемент из массива

function randWord(){
 	const words=['календарь','машина','арбуз','ребёнок','банан','стена','человек','дверь','планета','чердак','коробка','наушники'];
 	let random = words[Math.floor(Math.random()*words.length)];
 	return random
 }
let word = randWord()	
let secret = new Array(word.length).fill('_')
let guess = secret.length
// Массив из неправильных букв
let wrong = []
let errors = 1

function main(){
	// Получаем имя игрока
	name = getName()
	// Удаляем со страницы ненужные элементы и вставляем новые
	$('body').empty()

	let div = $('<div class="wrapper">').appendTo('body')
	$('<h1 id="secret">'+secret.join(' ')+'</h1>').appendTo(div)
	let inp = $('<input type="text" maxlength="1" id="letter" placeholder="Введите букву">').appendTo(div)
	$('<button id="game" onclick="game()">Проверить букву</button>').appendTo(div)
	$('<p id="wrong">').appendTo(div)
	let canv = $('<canvas id="canv">Не поддерживается канвас</canvas>').appendTo('body')
	canv.attr({
		width:'1000',
		height:'500'
	});
	inp.focus();
	
}

function game() {
	let letter =$('#letter').val()
	let isGuessed = false
	for(let i=0;i<word.length;i++){
		if(word[i] == letter.toLowerCase()){
			// Ставим эту букву вместо подчёркивания	
			secret[i]=letter.toUpperCase()
			isGuessed = true
			guess--	
		}
	}

	if(!isGuessed){
		let i = wrong.indexOf(letter.toUpperCase())
		if (i == -1) {
			wrong.push(letter.toUpperCase())
			drawV(errors)
			errors++
		}
	}
	
	if(guess == 1){
	$('body').empty();
	let gues = $('<p id = "guess">Ты победил!</p>').appendTo('body');
	}
	else if(errors == 10){
		// Поражение
	konec();
	}
	

    $('#secret').text(secret.join(' '))
    $('#letter').val('')
	$('#letter').focus()
	$('#wrong').text(wrong.join(', '))
}	

function drawV(n){
 let canv = document.querySelector('#canv');
 let ctx = canv.getContext('2d');

 ctx.lineWidth='6'
	
	if(n== 1){
	ctx.beginPath();
	ctx.moveTo(40, 432);
    ctx.lineTo(125,432);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 2){
	ctx.beginPath();
	ctx.moveTo(83,431);
    ctx.lineTo(80,100);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 3){
    ctx.beginPath();
	ctx.moveTo(79,102);
    ctx.lineTo(263,101);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 4){
	ctx.beginPath();
	ctx.moveTo(265,101);
    ctx.lineTo(266,170);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 5){
	ctx.beginPath();
    ctx.arc(265,207,37,10,Math.PI,true);
    ctx.closePath();
    ctx.stroke();
	}

	else if(n == 6){
	ctx.beginPath();
    ctx.arc(264,293,49,80,Math.PI/2,true);
    ctx.closePath();
    ctx.stroke();
	}

	else if(n == 7){
	ctx.beginPath();
	ctx.moveTo(250,245);
    ctx.lineTo(170,276);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 8){
	ctx.beginPath();
	ctx.moveTo(281,246);
    ctx.lineTo(370,290);
    ctx.closePath();
    ctx.stroke();	
	}

	else if(n == 9){
	ctx.beginPath();
	ctx.moveTo(250,340);
    ctx.lineTo(220,390);
    ctx.closePath();
    ctx.stroke();	
	}
}
	function konec(){
	let canv = document.querySelector('#canv');
    let ctx = canv.getContext('2d');

    ctx.lineWidth='6'
    ctx.beginPath();
    ctx.moveTo(290,331);
    ctx.lineTo(320,394);
    ctx.stroke();

    // Рисуем стрелку с использованием JCanvas
    $('#canv').drawLine({
    	strokeStyle:"black",	
    	strokeWidth:10,
    	// Стрелка в начале линии
    	startArrow:true,
    	// Закруглённые углы
    	rounded:false,
    	// Угол раскрытия стрелки
    	arrowAngle:70,
    	// Радиус стрелки(длина лепестков стрелки)
    	arrowRadius:45,
    	x1:335,y1:170,
    	x2:650,y2:30
    	}).drawText({
    		strokeStyle:"black",
    		strokeWidth:2,
    		fontSize:40,
    		fontFamily:'Courier, monospace',
    		x:755,y:15,
    		text:name
    	}) 

   
 }






