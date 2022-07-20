'use strict';

const dom = document;
const bar = dom.querySelector('.bar');
const x = dom.querySelector('.x');
const principal_nav = dom.querySelector('.principal_nav');
const div = dom.querySelector('.body_secondary');
const background_bar = dom.querySelector('.background');

bar.addEventListener('click',()=>{
    principal_nav.classList.replace('no_active','active') 
    principal_nav.style.right = '0';
    div.style.filter = 'blur(2px)';
    background_bar.style.filter = 'blur(2px)';
});


    // document.body.addEventListener('click', ()=>{
    //     if(principal_nav.classList.contains('active')){
    //         principal_nav.classList.replace('active','no_active') 
    //         principal_nav.style.right = '-300px';
    //         div.style.filter = 'none';
    //         background_bar.style.filter = 'none';
    //     }
    // })


x.addEventListener('click',()=>{
    principal_nav.classList.replace('active','no_active') 
    principal_nav.style.right = '-300px';
    div.style.filter = 'none';
    background_bar.style.filter = 'none';
})


