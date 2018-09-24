
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

function create_portfolio(data, status, xhr) {
    var translate = data.translate
    var count = 0
    var active = "active"
    var indicators = $('#portfolio-indicators')
    var portfolio = $('#portfolio-images')
    var all = []
    for (item in translate) {
        var imgclass = translate[item]
        var images = data[item]
        for (i in images) {
            all.push({'imgclass':imgclass, 'img':images[i]})
        }
    }
    for (e in shuffle(all)) {
        var element = all[e]
        add_indicator(e, active, indicators)
        add_image_to_portfolio(element.img, element.imgclass, active, portfolio)
        active = ""
    }
    /*
    var images = data[item]
    var imgclass = translate[item]
    for (i in images) {
        add_indicator(count++, active, indicators)
        add_image_to_portfolio(images[i], imgclass, active, portfolio)
        active = ""
    }
    */
    $('.carousel').carousel()
}

$(function() {
    $.ajax({
        type: "GET",
        cache: "false",
        url: "images/images.json",
        success: create_portfolio
    })
});
