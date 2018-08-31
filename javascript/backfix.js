// Include this file and calls to relevant functions to fix background header
// and footer problems.
var not_set = true;
$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if(!mobileAndTabletCheck()){
    if((scroll >= $('#header').height() + 86) && not_set){
      $("#content-wrapper").css('background-attachment', 'fixed');
      not_set = false;
    } else if((scroll <= $('#header').height() + 86) && !not_set){
      $("#content-wrapper").css('background-attachment', 'initial');
      not_set = true
    }
  }
});
