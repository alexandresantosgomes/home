$(document).on('ready', function() {
    $(".projects").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
    var date = new Date()
    var anoAtual = date.getFullYear();
    $(".date").text(anoAtual);

});

var accordions = document.getElementsByClassName("accordion");
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click",function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}