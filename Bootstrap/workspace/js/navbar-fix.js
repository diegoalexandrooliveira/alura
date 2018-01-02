let banner_principal = $(".banner-principal");
// let menu = $(".todo-menu");
$("#menu").on("show.bs.collapse", function() {
  // let altura = menu.height() + 20;
  // banner_principal.css("transform", "translate(-50%, " + altura + "px)");
  // banner_principal.css("top", "0");
  banner_principal.css("transform", "translate(-50%, 10%)");
});
$("#menu").on("hide.bs.collapse", function() {
  banner_principal.css("transform", "translate(-50%, -50%)");
  // banner_principal.css("top", "50%");
});
