document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    let gameOver = false;

    const jump = () => {
        if (gameOver) return;
        if (mario.classList.contains('jump')) return;
        
        mario.classList.add('jump');
        
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            jump();
        }
    });

    const loop = setInterval(() => {

        console.log('Loop');
        if (gameOver) return;

        const pipePosition = pipe.offsetLeft;
        const marioBottom = +window.getComputedStyle(mario).bottom.replace('px', '');

        // Colisão: pipe próximo ao Mario (entre 0 e 120px)
        // Altura do pipe é aproximadamente 80px, então se Mario estiver abaixo de 80px de altura, colide
        if (pipePosition <= 120 && pipePosition > 0 && marioBottom < 80) {
            gameOver = true;
            
            // Remove animação do jump se estiver em andamento
            mario.classList.remove('jump');
            
            // Posiciona Mario em cima do pipe
            mario.style.bottom = '80px';
            mario.style.animation = 'none';
            
            // Para o pipe
            pipe.style.animation = 'none';
            pipe.style.left = pipePosition + 'px';
            
            // Para as nuvens - captura a posição atual e congela lá
            const cloudsRight = window.getComputedStyle(clouds).right;
            clouds.style.animation = 'none';
            clouds.style.right = cloudsRight;
            
            // Muda para imagem de game over
            mario.src = './img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            
            clearInterval(loop);
        }
    }, 10);
});