z.slider = {
    firstRun: true,

    init: function() {
        // убираем лоадер
        z.$loader.addClass('hide');
        // события на кнопки
        this.buttonsInit();
        // запускаем слайдшоу
        this.goTo(0);
        this.firstRun = false;
    },

    buttonsInit: function() {
        var self = this;

        z.$control.find('.arrows').off('click').on('click', 'a', function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('hide')) return;
            var command = $(e.currentTarget).attr('data-command');
            self.goTo(command);
        });
    },

    // анимирует смену слайда
    countTimer: 0,
    changeCount: function(text) {
        // текущий элемент
        var $current_wrap = z.$counter.find('.current');
        // добавляем ноль
        text = Math.floor(text);
        text = (text < 10) ? '0' + text : text;

        // Если это первый запуск - незачем анимировать
        if (this.firstRun) {
            $current_wrap.find('.count').text(text);
            this.firstRun = false;
            return;
        }

        // новый элемент
        var $new = $current_wrap.find('.count.new'); // возможно уже существует
        if (!$new.length) $new = $current_wrap.find('.count').clone().addClass('new'); // в противном случае копируем текущий
        //прописываем значение, добавляем в контейнер, запускаем css анимацию
        $new.text(text);
        $current_wrap.append($new).addClass('animate');

        clearTimeout(this.countTimer);
        this.countTimer = setTimeout(function() {
            $new.siblings('.count').remove();
            $new.removeClass('new');
            $current_wrap.removeClass('animate');
        }, z.timer.counter);
    },

    // открывает слайд с номером
    // запускает слайдшоу
    goTo: function(command, stop) {
        var self = this;
        var $item, $current;
        var id;
        var length = z.$backgrounds.find('img.seo').length;

        // вычисляем номер слайда на который надо перейти
        if (command == 'prev' || command == 'next') {
            var current = z.$backgrounds.find('.item.show').attr('data-item');
            if (!current) current = -1;
            current = Math.floor(current);

            id = (command == 'prev') ? current - 1 : current + 1;
        } else {
            id = Math.floor(command);
        }
        // попытка выйти за пределы (меньше первого или больше последнего слайда)
        if (id < 0) {
            id = length - 1;
        }
        if (id >= length) {
            id = 0;
        }

        // находим требуемый слайд
        $item = z.$backgrounds.find('.item[data-item="' + id + '"]');

        // АНИМИРУЕМ
        if (self.firstRun)
        {
            animateIt();
        } else {
            // прячем фон
            z.animations.sliderFadeOut(function() {
                // тормозим прогрессбар
                z.$progress.removeClass('animate');
                // текущий слайд
                self.changeCount(id + 1);
            }, animateIt);
        }

        function animateIt() {
            // по завершению убираем элемент
            $('.backgrounds > .item').removeClass('show');

            // показываем фон
            z.animations.sliderFadeIn(function(){
                // сразу показываем эелемент
                $item.addClass('show');
            });

            // зум
            z.animations.sliderZoom();
            // прогрессбар
            z.animations.progressReset(null, function() {
                // по завершению
                if (!stop) {
                    self.goTo('next');
                }
            });
        }

        // показываем/прячем кнопки управления для первого или последнего слайда
        z.$control.find('.arrows a').removeClass('hide');
        if (id === 0) z.$control.find('.arrows a.left').addClass('hide');
        if (id === length - 1) z.$control.find('.arrows a.right').addClass('hide');

    }
};
