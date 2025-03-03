const menuBtn = document.querySelector('.js-menu__btn');
const menuList = document.querySelector('.js-menu__list');

menuBtn.addEventListener('click', ()=>{
    menuList.classList.toggle('open');
    menuBtn.classList.toggle('open');
    document.body.classList.toggle("no-scroll");
})