


const $ = elem => document.querySelector(elem);
const $$ = elems => document.querySelectorAll(elems);
const $app = $('.app');

// Creating the elements
    const circle = document.createElement('div');
        circle.className = 'circle';
    const square = document.createElement('div');
        square.className = 'square';
    const container = document.createElement('div');
        container.className = 'container';


// DOM LOADED
document.addEventListener('DOMContentLoaded', () =>{
    let html = ``;
    for(let i=1; i <= 9; i++){
        html += `<div class="block-${i} blocks"></div>`;
    }
    container.innerHTML = html;
    $app.append(container);

    const $$blocks = $$('.blocks');

    $$blocks.forEach( (block)=>{
        block.addEventListener('click', (e) => {
            e.target.innerHTML = `<p>O</p>`;
        });
    });
});
