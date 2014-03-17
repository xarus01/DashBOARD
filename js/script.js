$(function(){ //DOM Ready
//  var gridster = $(".gridster ul").gridster().data('gridster');
  gridster = $(".gridster > ul").gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [60, 30]
  }).data('gridster');
  var widgets = [
    ['<li><a href="http://facebook.com/xarus01"><i class="fa fa-facebook-square" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://twitter.com/xarus01"><i class="fa fa-twitter-square" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://k001kat.tumblr.com/"><i class="fa fa-tumblr-square" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://instagram.com/xarus01"><i class="fa fa-instagram" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://koolkat.wo.gl/blog"><i class="fa fa-pencil-square" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://github.com/xarus01"><i class="fa fa-github-square" style="font-size: 54px;"></i></a></li>', 2, 3],
    ['<li><a href="http://koolkat.wo.gl/map"><i class="fa fa-check-square" style="font-size: 54px;"></i></a></li>', 2, 3]
  ];

  $.each(widgets, function(i, widget){
    gridster.add_widget.apply(gridster, widget)
  });

  renderInstagram();
});

$(window).scroll(function (event) {
  var value = $("#slide1").height() - $(window).height() + $("#navbar").height();
  if(value <= $(window).scrollTop()) {
    if($("#slide1").height() < $(window).scrollTop()) {
      $("#navbar").css("bottom", $(window).height() - $("#navbar").height());
      $("#navbar").addClass("navbar-fixed-top");
      $("#navbar").removeClass("navbar-fixed-bottom");
    } else {
      $("#navbar").css("bottom", $(window).scrollTop() - value);
      if($("#navbar").hasClass("navbar-fixed-top")) {
        $("#navbar").addClass("navbar-fixed-bottom");
        $("#navbar").removeClass("navbar-fixed-top");
      }
    }
  } else {
    $("#navbar").css("bottom", 0);
    if($("#navbar").hasClass("navbar-fixed-top")) {
      $("#navbar").addClass("navbar-fixed-bottom");
      $("#navbar").removeClass("navbar-fixed-top");
    }
  }
});

//instagram photos
function renderInstagram() {
  var clientID = "3fe5075c8573464ab24b7e65f4124767";
  $.getJSON("https://api.instagram.com/v1/users/search?q=xarus01&client_id=" + clientID + "&callback=?", function(res) {
    var id = res.data[0].id
    $.getJSON("https://api.instagram.com/v1/users/" + id + "/media/recent/?client_id=" + clientID + "&callback=?", function(res) {
      var mediaJson = res.data;
      $(mediaJson).each(function(){
        if($(this)[0].type == "image") {
          console.log($(this)[0].images.thumbnail.url);
//          post.images.thumbnail //url, width, height, maybe use low_resolution?
          //Do
        }
      });
    });
  });
}

/*
//instagram photos
$.get("page", function(res) {
    $.get("page_with_data", function(res) {
        var mediaJson = $.parseJSON(res).data;
        $(mediaJson).each(function(post){
            if(post.type == "image") {
                post.images.thumbnail //url, width, height, maybe use low_resolution?
                //Do
            }
        });
    });
});

//WP feed
$.get("http://koolkat.wo.gl/blog/feed/", function(res) {
    var wpFeed = $.parseXML(res);
    $(wpFeed).find("item").each(function(i) {
        i.title
        i.link
        i.description //<![CDATA ?
        //DO
    });
});
*/