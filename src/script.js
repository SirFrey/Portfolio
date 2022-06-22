const bar = document.querySelector('.bar');
const x = document.querySelector('.x');
const principal_nav = document.querySelector('.principal_nav');
const div = document.querySelector('.body_secondary');
const container_bar = document.querySelector('.container_bar');


bar.addEventListener('click',()=>{ 
    principal_nav.classList.toggle('moved_nav');
    div.classList.toggle('shadow');
    container_bar.classList.toggle('shadow');
});

x.addEventListener('click',()=>{ 
    principal_nav.classList.toggle('moved_nav');
    div.classList.toggle('shadow');
    container_bar.classList.toggle('shadow')
})


