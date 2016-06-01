z.build = function() {
    var self = this;

    // основные элменты страницы
    self.$loader = $('.loader');
    self.$backgrounds = $('.backgrounds');
    self.$progress = $('.progress');
    self.$counter = $('.counter');
    self.$control = $('.control');

    // прелоад картинок, если не сработает через 10сек, инитим сразу
    var is_init = false;
    var loaded = 0;
    var length = self.$backgrounds.find('img.seo').length;

    // стартуем через 10 секунд
    var loaderTimer = setTimeout(function() {
        if (!is_init) {
            z.slider.init();
            is_init = true;
        }
    }, 10 * 1000);

    // либо после того как подгрузятся картинки
    self.$backgrounds.find('img.seo').addClass('loaded');
    self.$backgrounds.find('img.seo').load(function(e) {
        $(e.currentTarget).removeClass('loaded');
        loaded++;
        if (!is_init && loaded == length) {
            z.slider.init();
            is_init = true;
            clearTimeout(loaderTimer);
        }
    });
};
