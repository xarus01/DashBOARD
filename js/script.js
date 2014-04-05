$(function(){ //DOM Ready
//  var gridster = $(".gridster ul").gridster().data('gridster');
  gridster = $(".gridster > ul").gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [60, 30]
  }).data('gridster');
  var widgets = [
    ['<li><a href="http://github.com/"><i class="fa fa-github-square" style="font-size: 54px;"></i><p>Github</p></a></li>', 1, 3],
    ['<li><a href="http://facebook.com/"><i class="fa fa-facebook-square" style="font-size: 54px;"></i><p>Facebook</p></a></li>', 2, 3],
    ['<li><a href="http://twitter.com/"><i class="fa fa-twitter-square" style="font-size: 54px;"></i><p>Twitter</p></a></li>', 2, 3],
    ['<li><a href="http://tumblr.com/"><i class="fa fa-tumblr-square" style="font-size: 54px;"></i><p>Tumblr</p></a></li>', 2, 3],
    ['<li><a href="http://instagram.com/"><i class="fa fa-instagram" style="font-size: 54px;"></i><p>Instagram</p></a></li>', 3, 5],
    ['<li><a href="http://yourblog.wp"><i class="fa fa-pencil-square" style="font-size: 54px;"></i><p>WordPress</p></a></li>', 2, 3]
  ];

  $.each(widgets, function(i, widget){
    gridster.add_widget.apply(gridster, widget)
  });

//  for feeds
  renderInstagram();
  renderTumblr();
  renderWPFeed();

//  for map
  renderMap();
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
  var clientID = "";
  $.getJSON("https://api.instagram.com/v1/users/search?q=xarus01&client_id=" + clientID + "&callback=?", function(res) {
    var id = res.data[0].id
    $.getJSON("https://api.instagram.com/v1/users/" + id + "/media/recent/?client_id=" + clientID + "&callback=?", function(res) {
      var mediaJson = res.data;
      $(mediaJson).each(function(){
        if($(this)[0].type == "image") {
          $("#insta").append('<div class="col-xs-6 col-md-3"><a href="'+$(this)[0].link+'" class="thumbnail"><img src="'+$(this)[0].images.thumbnail.url+'"></a></div>');
        }
      });
    });
  });
}
  
function renderTumblr() {
  var apiKey = ""
  $.getJSON("http://api.tumblr.com/v2/blog/k001kat.tumblr.com/posts/text?api_key="+apiKey+"&callback=?", function(res) {
    var posts = res.response.posts;
    $(posts).each(function(i) {
      var p = $.parseHTML($(this)[0].body);
      $("#tumbl").append('<blockquote class="blockquote-reverse" id="li_'+i+'"></blockquote>');
      $("#tumbl").find("#li_"+i).append($(p)[0]);
      $("#tumbl").find("#li_"+i).append('<footer><a href="'+$(this)[0].post_url+'">'+$(this)[0].date+'</a></footer>');
    });
  });
}

//WP feed
function renderWPFeed() {
  $.getJSON("http://yourblog.wp/blog/?feed=json&callback=?", function(res) {
    $(res).each(function() {
      $("#wp").append('<li><h3><a href="'+$(this)[0].permalink+'">'+$(this)[0].title+'</a></h3><p>'+$(this)[0].content+'</p></li>');
    });
  });
}

//google map
function renderMap() {
  var latlng = new google.maps.LatLng(37.5655961,126.9332727)
  var mapConf = {
    center: latlng,
    zoom: 14,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapConf);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: "location"
  })
}