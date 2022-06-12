const bar = document.querySelector('.bar');
const x = document.querySelector('.x');
const principal_nav = document.querySelector('.principal_nav');
bar.addEventListener('click',()=>{ 
    principal_nav.classList.toggle('moved_nav');
});

x.addEventListener('click',()=>{ 
    principal_nav.classList.toggle('moved_nav');
})




