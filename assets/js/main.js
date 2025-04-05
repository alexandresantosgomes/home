/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction(){
    const navMenu = document.getElementById('nav-menu');

    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }

    if(itemClass == 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        
        tabContent.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');1
        });

        tab.classList.add('qualification__active');


    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scrollUp');
    if(this.scrollY >= 360) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

function scrollHeader(){
    const nav = document.getElementById('header')

    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== DARK LIGHT THEME ====================*/ 

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

$(".contact__input").on('focus', function(){
    $(this).parents('.contact__content').addClass('focus');
});

$(".contact__input").on('focusout', function(){
    $(this).parents('.contact__content').removeClass('focus');
});

$("#sendForm").on('click', function(e) {
    e.preventDefault();
    var formValidate = true;
    var applyFocus = false;
    $(".error_message").remove();
    $.each($(".contact__input"), function(){
        if($(this).val() == ""){
            $(this).parents('.contact__content').addClass('input__error');
            $(this).parents('.contact__content').append(`<span class="error_message"><i class="uil uil-exclamation-octagon"></i> Este campo e obrigatório.</span>`);
            formValidate = false;
            if(!applyFocus){
                $(this).focus();
                applyFocus = true;
            }
        }else{
            $(this).parents('.contact__content').removeClass('input__error');
        }
    });

    if(!formValidate){
        return false;
    }

    var btn = Ladda.create(this, {style: "zoom-out"});
    btn.start();

    $.ajax({
        type: "POST",
        url: "https://formsubmit.co/santosalexandregomes@gmail.com",
        data: $("#formContact").serialize(),
        success: function() {
            Swal.fire({
                title: "Contato Enviado Com Sucesso!",
                text: "Em breve irei entrar em contato com você.",
                icon: "success",
                draggable: true,
                theme: localStorage.getItem('selected-theme'),
            });
        },
        error: function() {
            Swal.fire({
                title: "Erro ao Enviar Contato!",
                text: "Tente Novamente.",
                icon: "error",
                draggable: true,
                theme: localStorage.getItem('selected-theme'),
            });
        },
        complete: function() {
            btn.stop();
        }
    });
});

var MaskBehavior = function(val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
Options = {
    onKeyPress: function(val, e, field, options) {
        field.mask(MaskBehavior.apply({}, arguments), options);
    }
};

function iniciarMascaraTelefone(){
    var MaskBehavior = function(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    Options = {
        onKeyPress: function(val, e, field, options) {
            field.mask(MaskBehavior.apply({}, arguments), options);
        }
    };

    $('.mask-number').mask(MaskBehavior, Options);
}

iniciarMascaraTelefone();

$("#footerDate").text(new Date().getFullYear());

$(".str-anos-experiencia").text(new Date().getFullYear() - 2019);