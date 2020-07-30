// Функция рисующая лабиринт
function mapGen(w, h, steps, mazes, time) {
    // Функция отрисовки игрока
    function player(dx, dy) {
        // Берём пиксель между тем местом, где мы находимся
        // И той стороной, в которую двигаемся
        let pixel = ctx.getImageData(13*x+7+6*dx, 13*y+7+6*dy, 1, 1);
        let r = pixel.data[0]
        let g = pixel.data[1]
        let b = pixel.data[2]
        let a = pixel.data[3]
        // Проверка стенки
        if (r == 0 && g == 0 && b == 0 && a == 255) {
            dx = 0
            dy = 0
        }
        else {
            steps++
            $('#steps').text('Шагов пройдено: ' + steps)
        }
        // Стираем персонажа
        ctx.clearRect(13*x + 3, 13*y + 3, 10, 10);
        // Меняем координаты персонажа
        x = x + dx
        y = y + dy
        // Отрисовка персонажа
        ctx.fillStyle = "red";
        ctx.fillRect(13*x + 3, 13*y + 3, 10, 10);

        if(mazes == 10){
            $('body').empty();
            let guess = $('<p id = "guess">Поздравляю! Ты победил!</p>').appendTo('body');
        }
        // Переход на другой лабиринт
        if (x >= w) {
            clearInterval(timerID)
            if (w + 5 > 100 || h + 5 > 100) {
            }
            else {
                mazes++;
                $('#mazes').text('Лабиринтов пройдено: ' + mazes)
                mapGen(w + 5, h + 5, -1, mazes, Math.floor((w + h + 10)*1.5))
            }
        }
    }

    let canv = document.querySelector('#canv');
    let ctx = canv.getContext('2d');
    // Меняем размеры канваса в соответствии с шириной/высотой лабиринта
    canv.width = 13*w + 3;
    canv.height = 13*h + 3;
    // Заливаем всё чёрным цветом
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    // Генерация лабиринта
    // Объявляем массивы для хранения значения множества текущей ячейки,
    // для хранения клетки справа и клетки снизу
    let column = Array(w);
    let right = Array(w);
    let bottom = Array(w);
    // Номер клетки в множестве
    let quan = 1
    // Цикл по строкам
    for (let str = 0; str < h; str++) {
        // Создание клеточек
        for (let stolb = 0; stolb < w; stolb++) {
            // Делаем клетку
            ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 10);
            if (str == 0 || bottom[stolb] == 1) {
                column[stolb] = 0
            }
            if (column[stolb] == 0) {
                column[stolb] = quan++;
            }
        }

        // Рандомно убираем стенки справа и снизу
        for (let stolb = 0; stolb < w; stolb++) {
            // 0 - есть проход
            // 1 - нет прохода
            right[stolb] = Math.floor(Math.random()*2)
            bottom[stolb] = Math.floor(Math.random()*2)
            // Убираем нижние стенки
            if (str != h-1 && bottom[stolb] == 0) {
                ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 15);
            }
            // Убираем правые стенки
            if (stolb != w-1 && column[stolb] != column[stolb+1] && (right[stolb] == 0 || str == h-1)) {
                ctx.clearRect(13*stolb + 3, 13*str + 3, 15, 10);
                // Проверяем все остальные клетки в этом ряду
                let l = column[stolb+1]
                for (let i = 0; i < w; i++) {
                    if (column[i] == l) {
                        column[i] = column[stolb]
                    }
                }
            }
        }
        
        // Убираем замкнутые области
        for (let stolb = 0; stolb < w; stolb++) {
            let isSquare = true
            for (let i = 0; i < w; i++) {
                if (column[stolb] == column[i] && bottom[i] == 0) {
                    isSquare = false
                }
            }
            if (isSquare) {
                bottom[stolb] = 0
                ctx.clearRect(13*stolb + 3, 13*str + 3, 10, 15);
            }
        }
    }

    // Делаем выход из лабиринта
    ctx.clearRect(13*w, 13*Math.floor(Math.random()*h)+3, 15, 10);
    // Устанавливаем начальные координаты персонажа
    let x = 0, y = 0;
    // Рисуем персонажа
    player(0, 0)
    // Обработка клавиатуры
    window.onkeydown = function(event) {
        // Влево
        if (event.keyCode == 37) {
            player(-1, 0)
        }
        // Вверх
        if (event.keyCode == 38) {
            player(0, -1)
        }
        // Вправо
        if (event.keyCode == 39) {
            player(1, 0)
        }
        // Вниз
        if (event.keyCode == 40) {
            player(0, 1)
        }
    }
    // Таймер
    $('#time').text('Осталось: ' + time)
    let timerID = setInterval(function(){
        let oldTime = +$('#time').text().split(' ')[1]
        // Если время закончилось
        if (oldTime == 0) {
            // Запускаем этот же лабиринт заново
            mapGen(w, h, -1, mazes, Math.floor((w+h)*1.5))
            clearInterval(timerID)
        
        }
        else {
            // Уменьшаем время на 1
            let newTime = oldTime - 1
            // Выводим новое время
            $('#time').text('Осталось: ' + newTime)
        }
    }, 1000)

}

function play() {
    let w = +$('#width').val()
    let h = +$('#height').val()
    $('.wrap').remove()
    $('<div class="stat">').appendTo('body')
    $('<span id="steps">Шагов пройдено: 0</span>').appendTo('.stat')
    $('<span id="mazes">Лабиринтов пройдено: 0</span>').appendTo('.stat')
    $('<span id="time">Осталось: </span>').appendTo('.stat')
    $('<canvas id="canv">Canvas не поддерживается</canvas>').appendTo('body')
    mapGen(w, h, -1, 0, Math.floor((w+h)*1.5))
}