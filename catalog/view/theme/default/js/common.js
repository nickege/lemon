var pages_count = 0, // counter array links pagination
          pages = [], // array links pagination
       progress = false; // progress status

$(document).ready(function(){

    var page_href = $('.pagination').find('li:last a').attr('href');
    if (page_href) {
        $('.pagination').each(function () {

            total_pages = page_href.substring(page_href.indexOf("page=") + 5);
            first_index = $(this).find('li.active span').html();
            var i = parseInt(first_index) + 1;
            while (i <= total_pages) {
                pages.push(page_href.substring(0, page_href.indexOf("page=") + 5) + i);
                i++;
            }
        });
        $('.load_more').click(function (event) {
            getNextProductPage(pages, pages_count);
            pages_count++;
        });
    } else {
        $('.load_more').hide();
    }
});

function getNextProductPage(pages, pages_count) {

    if (progress || pages_count >= pages.length)
        return;

    progress = true;
    var product_block = ($('.product-list').length > 0) ? '.product-list' : '.product-grid';

    $.ajax({
        url  : pages[pages_count],
        type : "GET",
        data : '',
        success : function (data) {
            $data = $(data);
            if ($data) {
                if ($data.find('.product-list').length > 0)    {
                    $(product_block).parent().append($data.find('.product-list').parent().html());
                    if (product_block == '.product-grid') {$('#grid-view').trigger('click')};
                } else {
                    $(product_block).parent().append($data.find('.product-grid').parent().html());
                    if (product_block == '.product-list') {$('#list-view').trigger('click')};
                }
            }
            progress = false;
        }
    });
    if (pages_count+1 >= pages.length)
        $('.load_more').hide();
}
