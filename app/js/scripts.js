"use strict";

/*========== Header ==========*/
$(document).ready(function () {
  ScrollEvent(HeaderDiff());
});
var NavBurger = $('.b-NavBurger');
var NavBar = $('.c-NavBar');
var Header_Overview = $('.m-Header_Overview');
var NavOpen = false;
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
$(window).resize(function () {
  ScrollEvent(HeaderDiff());
});
$(window).scroll(function () {
  ScrollEvent(HeaderDiff());
});
var Header = $('.m-Header');
var MainElem = $('main');
var Navigaion = $('.c-Navigation');
var NavLogo = $('.c-Navigation_svg-Logo');

function HeaderDiff() {
  return Header.height() - Navigaion.height();
}

function ScrollEvent(difference) {
  if (document.documentElement.scrollTop > difference) {
    Header.css('top', -difference).addClass('--Fixed');
    NavLogo.addClass('--Visible');
    MainElem.css('margin-top', Header.height());
  } else {
    Header.removeAttr('style').removeClass('--Fixed');
    NavLogo.removeClass('--Visible');
    MainElem.removeAttr('style');
  }
}

var NavMore = $('.b-NavMore');
var SecondNav = $('.c-SecondNavigation');
var SecNavOpen = false;
NavMore.click(function () {
  if (SecNavOpen) {
    NavMore.removeClass('--Active');
    SecondNav.removeClass('--Open');
    SecNavOpen = false;
  } else {
    NavMore.addClass('--Active');
    SecondNav.addClass('--Open');
    SecNavOpen = true;
  }
});