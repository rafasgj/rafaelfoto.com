
function shuffle(arr) {
    /* Knuth-Fisher-Yates shuffle. */
	var temp, j, i = arr.length;
	while (--i) {
		j = ~~(Math.random() * (i + 1));
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

function add_image_to_portfolio(img, imgclass, active, portfolio) {
    var pic = $('<div/>')
        .addClass('carousel-item')
        .addClass(active)
        .appendTo(portfolio)
    $('<img/>')
        .addClass('d-block')
        .attr('src', img)
        .attr('alt',imgclass)
        .appendTo(pic)
    var caption = $('<div/>')
        .addClass('carousel-caption')
        .addClass('text-left')
        .appendTo(pic)
    $('<h1/>')
        .text(imgclass)
        .appendTo(caption)
}

function add_indicator(count, active, indicators) {
    $('<li/>')
        .attr('data-target', '#portfolio-carousel')
        .attr('data-slide-to', count)
        .addClass(active)
        .appendTo(indicators)
}

var all_images = []

function create_portfolio(data, status, xhr) {
    var translate = data.translate
    for (item in translate) {
        var imgclass = translate[item]
        var images = data[item]
        for (i in images) {
            all_images.push({'imgclass':imgclass, 'img':images[i]})
        }
    }
    filter_images()
}

function filter_images(filter) {
    var active = "active"
    var indicators = $('#portfolio-indicators')
    var portfolio = $('#portfolio-images')
    indicators.empty()
    portfolio.empty()
    for (e in shuffle(all_images)) {
        var element = all_images[e]
        if (!filter || filter.includes(element.imgclass)) {
            add_indicator(e, active, indicators)
            add_image_to_portfolio(element.img, element.imgclass, active, portfolio)
            active = ""
        }
    }
    $('.carousel').carousel({wrap: true, interval: 2000, keyboard: true})
}

$(function() {
    $.ajax({
        type: "GET",
        cache: "false",
        url: "images/images.json",
        success: create_portfolio
    })
});
