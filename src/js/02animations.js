z.timer = {
    sliderFadeOut: 400,
    sliderFadeIn: 400,
    page: 6000,
    counter: 450
};

z.animations = {

    sliderFadeOutTimer: 0,
    sliderFadeOut: function(start, stop)
    {
        var self = this;
        clearTimeout(self.sliderFadeOutTimer);

        z.$backgrounds.removeClass('fade-out fade-in');
        setTimeout(function()
        {
            z.$backgrounds.addClass('fade-out');
            // коллбэки
            if (typeof start == "function") { start(); }
            if (typeof stop == "function")
            {
                self.sliderFadeOutTimer = setTimeout(function() {
                    stop();
                }, z.timer.sliderFadeOut);
            }
        }, 50);
    },

    sliderFadeInTimer: 0,
    sliderFadeIn: function(start, stop)
    {
        var self = this;

        clearTimeout(self.sliderFadeInTimer);
        z.$backgrounds.removeClass('fade-in fade-out');
        setTimeout(function()
        {
            z.$backgrounds.addClass('fade-in');
            // коллбэки
            if (typeof start == "function") { start(); }
            if (typeof stop == "function")
            {
                self.sliderFadeInTimer = setTimeout(function() {
                    stop();
                }, z.timer.sliderFadeIn);
            }
        }, 50);
    },

    sliderZoomTimer: 0,
    sliderZoom: function(start, stop)
    {
        var self = this;

        clearTimeout(self.sliderZoomTimer);
        z.$backgrounds.removeClass('zoom');
        setTimeout(function()
        {
            z.$backgrounds.addClass('zoom');
            // коллбэки
            if (typeof start == "function") { start(); }
            if (typeof stop == "function")
            {
                self.sliderZoomTimer = setTimeout(function() {
                    stop();
                }, z.timer.page);
            }
        }, 50);
    },

    progressResetTimer: 0, // для таймаута
    progressReset: function(start, stop)
    {
        var self = this;

        clearTimeout(self.progressResetTimer);
        z.$progress.removeClass('animate');
        setTimeout(function()
        {
            z.$progress.addClass('animate');
            // коллбэки
            if (typeof start == "function") { start(); }
            if (typeof stop == "function")
            {
                self.progressResetTimer = setTimeout(function() {
                    stop();
                }, z.timer.page);
            }
        }, 50);
    }

};
