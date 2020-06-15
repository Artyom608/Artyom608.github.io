function main() {
	// Получаем данные из формы
	let s_name = $("#s_name").val();
	let name = $("#name").val();
	let f_name = $("#f_name").val();
	let phone = $("#phone").val();
	let email = $("#email").val();

	let date = $("#date").val()
	let age = getAge(date)
	// Проверка если возраст == -1

	if(age<0)age=0;

	let genderId = $('input[name="gender"]:checked')[0].id
	let gender = $('label[for="'+genderId+'"]').text()

	let city = $('#city>option:selected').text()
	if (city == 'Выберите Ваш город') city = 'Неизвестный';

	let about = $('#about').val()

	let lang = getLang()
	let images = ''
	if (lang.length > 0) {
		images = getLogo(lang)
	}

	let pictureLink=$('#picture').attr('src');
	let color=$('#color').val()
	// Вывод данных
	// Удаляем форму
	$('form').remove()
	// Выводим "личное дело"
	$('body').append('<main class="main">')
	let main = $('.main')
	main.append('<img id="face" src="'+pictureLink+'">')
	$('#face').css('border-color',color);
	makeDivs(main,"Фамилия:",s_name)
	makeDivs(main,"Имя:",name)
    if (f_name) makeDivs(main,"Отчество:",f_name)
    makeDivs(main,"Телефон:",phone)
	makeDivs(main,"Email:",email)
	makeDivs(main,"Возраст:",age)	
	if(gender) makeDivs(main,"Пол:",gender)
	makeDivs(main,"Город:",city)
    if(about) makeDivs(main,"О себе:",about)
    if (images.length > 0) main.append('<div class="line">'+images+'</div>')

function readURL(input){
	if(input.files&&input.files[0]){
		let reader = new FileReader();

		reader.onload=function(e){
			$('#picture').attr('src',e.target.result);
		}
		reader.readAsDataURL(input.files[0])
	}
}

	function makeDivs(main, prop, value){
		main.append('<div class="line"> <span class="prop">'+prop+'</span><span class="value">'+value+'</span></div>')
	}
	$('body').append('<div class="t">'+s_name+'</div>')

}

function tyomnaya(){

	let color=$('#color').val()
	$('body').css("background-color","black")
	$('body').css("color","white")
}


function getLogo(lang){
		let logo = [
	    {id:'Java',link:'https://i.pinimg.com/originals/f1/ea/a7/f1eaa7278f64e27128e062a3de918265.png'},
		{id:'Javascript',link:'https://pluspng.com/img-png/logo-javascript-png-html-code-allows-to-embed-javascript-logo-in-your-website-587.png'},
		{id:'Python',link:'https://pluspng.com/img-png/python-logo-png-download-python-logo-png-images-transparent-gallery-advertisement-360.png'},
		{id:'Ruby',link:'https://logo-inspiration.com/wp-content/uploads/2017/01/ruby_logo.png'},
		{id:'PHP',link:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/800px-PHP-logo.svg.png'},
		{id:'C#',link:'https://miro.medium.com/max/3954/1*w0u2TZpEp3WfKMrlL5jTSw.png'},
		{id:'Basic',link:'https://seeklogo.com/images/B/Basic-logo-DF2860EBA5-seeklogo.com.gif'},
		{id:'C++',link:'https://ih1.redbubble.net/image.416406992.0438/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg'},
		{id:'Objective-c',link:'https://i1.wp.com/mycodetips.com/wp-content/uploads/2017/07/Objective-c-logo.png?ssl=1'},
		{id:'Haskell',link:'https://cdn.worldvectorlogo.com/logos/haskell.svg'}];

	let images = ''
	for (let i = 0; i < lang.length; i++) {
		let imgLink = logo.find(item => item.id == lang[i]).link
		images += '<img class="icon" src="'+imgLink+'">'
	}

	return images
}

function getLang() {
	let langID = []
	let checkboxes = $('input[name="lang"]:checked')
	for (let i = 0; i < checkboxes.length; i++) {
		langID.push(checkboxes[i].id)
	}

	return langID
}

function getAge(date) {
	let tmp = date.split("-");
	let year = +tmp[0]
	let month = +tmp[1]
	let day = +tmp[2]

	const now = new Date()
	let nowYear = +now.getFullYear();
	let nowMonth = +now.getMonth() + 1
	let nowDay = +now.getDate()

	let age = nowYear - year;
	if (nowMonth < month) {
		age--;
	}
	else if (nowMonth == month) {
		if (nowDay < day) {
			age--;
		}
	}

	return age
}