"use strict";

/*========== Header ==========*/
$(document).ready(function () {
  var NavOpen = false;
  var NavBurger = $('.b-NavBurger');
  var NavBar = $('.c-NavBar');
  var Header_Overview = $('.m-Header_Overview');
  NavBurger.click(function () {
    if (NavOpen) {
      NavBurger.removeClass('--Active');
      NavBar.removeClass('--Open');
      Header_Overview.removeClass('--Visible');
      NavOpen = false;
    } else {
      NavBurger.addClass('--Active');
      NavBar.addClass('--Open');
      Header_Overview.addClass('--Visible');
      NavOpen = true;
    }
  });
  Header_Overview.click(function () {
    NavBurger.removeClass('--Active');
    NavBar.removeClass('--Open');
    Header_Overview.removeClass('--Visible');
    NavOpen = false;
  });
  var Header = $('.m-Header');
  var MainElem = $('main');
  var Navigaion = $('.c-Navigation');
  var NavLogo = $('.c-Navigation_svg-Logo');
  var HeaderHeight = Header.height();
  var NavHeight = Navigaion.height(); // $(window).resize(function() {
  // });

  function HeadFirstSect() {
    return HeaderHeight - NavHeight;
  }

  $(window).scroll(function () {
    ScrollEvent();
  });

  function ScrollEvent() {
    // if (window.innerWidth > 768 && document.documentElement.scrollTop > 184) {
    //     Header.style.position = 'fixed';
    //     Header.style.marginTop = '-184px';
    //     MainElem.style.paddingTop = '233px';
    // }
    // else if (window.innerWidth > 540 && window.innerWidth <= 768 && document.documentElement.scrollTop > 172) {
    //     HeaderMod.style.position = 'fixed';
    //     HeaderMod.style.marginTop = '-172px';
    //     MainElem.style.paddingTop = '222px';
    // } 
    if (window.innerWidth <= 540 && document.documentElement.scrollTop > 96) {
      Header.addClass('--Fixed');
      NavLogo.addClass('--Visible');
      MainElem.css('padding-top', HeadFirstSect());
    } else {
      Header.removeClass('--Fixed');
      NavLogo.removeClass('--Visible');
      MainElem.css('padding-top', '0');
    }
  }
}); // var HeaderMod = document.querySelector('.Header');
// var MainElem = document.querySelector('main');
// window.addEventListener('resize', function() {
//     ScrollEvent();
// });
// function ScrollEvent() {
//     if (window.innerWidth > 768 && document.documentElement.scrollTop > 184) {
//         HeaderMod.style.position = 'fixed';
//         HeaderMod.style.marginTop = '-184px';
//         MainElem.style.paddingTop = '233px';
//     } 
//     else if (window.innerWidth > 540 && window.innerWidth <= 768 && document.documentElement.scrollTop > 172) {
//         HeaderMod.style.position = 'fixed';
//         HeaderMod.style.marginTop = '-172px';
//         MainElem.style.paddingTop = '222px';
//     } 
//     else if (window.innerWidth <= 540 && document.documentElement.scrollTop > 74) {
//         HeaderMod.style.position = 'fixed';
//         HeaderMod.style.marginTop = '-74px';
//         MainElem.style.paddingTop = '114px';
//     } 
//     else {
//         HeaderMod.style.position = 'static';
//         HeaderMod.style.marginTop = '0';
//         MainElem.style.paddingTop = '0';
//     }
// }
// document.querySelector('.NavMore').addEventListener('click', () => {
//     document.querySelectorAll('.SecondNavigation')
//         .forEach(div => div.classList.toggle('SecondNavigationOpen'));
//     document.querySelectorAll('.NavMoreText')
//         .forEach(span => span.classList.toggle('NavMoreActive'));
// });
// document.addEventListener('click', (e) => {
//     var container = document.querySelector('.Header');
//     if (!container.contains(e.target) && document.querySelector('.SecondNavigation').classList.contains('SecondNavigationOpen')) {
//         document.querySelectorAll('.SecondNavigation')
//             .forEach(div => div.classList.toggle('SecondNavigationOpen'));
//         document.querySelectorAll('.NavMoreText')
//             .forEach(span => span.classList.toggle('NavMoreActive'));
//     }
// });