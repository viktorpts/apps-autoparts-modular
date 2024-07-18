const container = document.getElementById('notification');

export function notify(msg) {
    const para = document.createElement('p');
    para.textContent = msg;
    container.appendChild(para);
    
    para.addEventListener('click', () => hide(para));

    container.style.display = 'block';

    setTimeout(() => hide(para), 3000);
}

function hide(para) {
    para.remove();

    if (container.childElementCount == 0) {
        container.style.display = 'none';
    }
}