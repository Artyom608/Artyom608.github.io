let primer = '';


function equal() {
	let res = eval(primer)
	$('#test').text(res)
	primer = '';
}

function paste(symbol) {
	let id = '#' + symbol;
	primer += $(id).text();
	$('#test').text(primer)
}