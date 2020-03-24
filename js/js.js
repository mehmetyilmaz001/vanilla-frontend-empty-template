// Helpers
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function personTemplateForSelect(item){
    console.log(item);

    var template = '';
    if(item.id > 0){
        template = '<div class="person-list-item-picker">' +
                        '<div class="avatar"><img src="{0}"/></div>' +
                        '<div class="name">{1}</div>' +
                        '<div class="info">' +
                            '<div class="dep">{2}</div>' +
                            '<div class="clearfix"></div>' +
                            '<div class="person-title">{3}</div>' +
                        '</div>' 
                   '</div>'; 

        var html = template.format(item.pic, item.text, item.dep, item.personTitle);
    }

    return html;
}

$(document).ready(function () {



    $('#person-select').select2({
        templateResult : personTemplateForSelect,
        language: "tr",
        width: "100%",
        placeholder: 'Cep telefonuna göre yada isme göre ara',
        escapeMarkup : function(markup) {
            return markup;
        },
        tags: true,
        multiple: true,
        tokenSeparators: [',', ' '],
        minimumInputLength: 2,
        minimumResultsForSearch: 10,
        ajax: {
          url: 'http://localhost:8080/data/persons.json',
          dataType: "json",
            type: "GET",
            data: function (params) {

                var queryParameters = {
                    term: params.term
                }
                return queryParameters;
            },

            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.text,
                            id: item.id,
                            pic: item.pic,
                            dep: item.dep,
                            personTitle: item.title
                        }
                    })
                };
            }
        }
      });

    //https://github.com/asirokas/jPaginate
    $('#thanksgiving-inbox-item-container').paginate({
        items_per_page: 3,
        prev_text: '<i class="fas fa-long-arrow-alt-left"></i>',
        next_text: '<i class="fas fa-long-arrow-alt-right"></i>'
    });

    $('#thanksgiving-sent-item-container').paginate({
        items_per_page: 3,
        prev_text: '<i class="fas fa-long-arrow-alt-left"></i>',
        next_text: '<i class="fas fa-long-arrow-alt-right"></i>'
    });

    function onWindowScroll() {
        $(".isbirthday").getNiceScroll().resize();
    }

    // default mode
    var homeList = localStorage.getItem('homeList');

    if (homeList) {
        if (homeList === 'isTh') {
            isTh()
        } else {
            isRow()
        }
    } else {
        localStorage.setItem('homeList', 'isTh');
    }

    $('.search-input').on('input', function (e) {
        var value = e.target.value;

        if (value.length >= 3) {
            console.log($(this).siblings('.search-result-box'));
            $(this).closest('.search-container').siblings('.search-result-box').removeClass('none');
            // hideOnClickOutside('.search-result-box')
        } else {
            $('.search-result-box').addClass('none');
        }
    });

    function isRow() {
        $('.birthday-lunch').addClass('hidden');
        $('.screen a').removeClass('active');
        $(this).addClass('active');
        $('.is-carousel').removeClass('carousel-inner');
        $('.carousel-indicators').addClass('none');
        $('main').removeClass('lg');
        $('.home-tab').addClass('none');
        $('aside.page-right').removeClass('none');
        localStorage.setItem('homeList', 'isRow')
    }

    function isTh() {
        $('.birthday-lunch').removeClass('hidden');
        $('.screen a').removeClass('active');
        $(this).addClass('active');
        $('.is-carousel').addClass('carousel-inner');
        $('.carousel-indicators').removeClass('none');
        $('main').addClass('lg');
        $('.home-tab').removeClass('none');
        $('aside.page-right').addClass('none');
        localStorage.setItem('homeList', 'isTh')
    }

    $('header').on("click", ".sidebar-button", function () {
        $('.popup').addClass('visible');
    });

    $('header').on("click", ".close-popup", function () {
        $('.popup').removeClass('visible');
    });

  
    $('.screen').on("click", ".is-th", function () {
        isTh()
    });

    $('.screen').on("click", ".is-row", function () {
        isRow()
    });

    if ($('.applications') && $('.applications').length) {
        $('ul.applications').find('li:gt(4)').hide();
        $('ul.applications').has('li:nth-child(5)').after('<p class=\'showhide\'>Daha fazlası..</p>');
        $('p.showhide').click(function () {
            if ($('p.showhide')) {
                $('p.showhide').hide()
            }
            $("ul.applications").find("li:gt(4)").toggle('fade');
        });
    }

    $(".popup-tab-button").on("click", function(){
        var href = $($(this).data("href"));

        $(".popup-tab-container").hide();
        $(".popup-tab-button").removeClass("active");
        
        $(this).addClass("active");
        href.show();
    });

    /*function hideOnClickOutside(selector) {

        var outsideClickListener = function (event) {
            if (!$(event.target).closest(selector).length) {
                if ($(selector).is(':visible')) {
                    $(selector).hide()
                    removeClickListener()
                }
            }
        };

        var removeClickListener = function () {
            document.removeEventListener('click', outsideClickListener)
        };

        document.addEventListener('click', outsideClickListener)
    }*/

    $(".isbirthday").niceScroll();

    $(window).on('scroll', debounce(onWindowScroll, 100));

    

    var accordion = {
        init: function () {
            var $containers = $('.accordion');

            if (!$containers.length) {
                return;
            }

            var $togglers = $containers.find('[data-toggle="collapse"]');
            var $collapses = $containers.find('.collapse');

            $togglers.on('click', function () {
                $collapse = $(this).siblings('.accordion-content').find('.collapse');

                $collapse.collapse('toggle');
            });

            $collapses.on('show.bs.collapse shown.bs.collapse', function () {
                var $toggler = $(this).closest('.accordion-content').siblings('[data-toggle="collapse"]');

                $(this).closest('.accordion-content').addClass('active');
                $toggler.addClass('active');
            });

            $collapses.on('hide.bs.collapse hidden.bs.collapse', function () {
                var $toggler = $(this).closest('.accordion-content').siblings('[data-toggle="collapse"]');

                $(this).closest('.accordion-content').removeClass('active');
                $toggler.removeClass('active');
            });
        }
    };

    accordion.init();

    
});
