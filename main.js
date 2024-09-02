const canvas = document.getElementById('ruletaCanvas');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girarBtn');

const radio = canvas.width / 2;
const sectores = 8; // Número de sectores en la ruleta
const anguloSector = (2 * Math.PI) / sectores;
let anguloActual = 0;
let velocidad = 0;

const premios = [ 
    'Premio 1', 
    'Premio 2', 
    'Premio 3', 
    'Premio 4', 
    'Premio 5', 
    'Premio 6', 
    'Premio 7', 
    'Premio 8'];


    
function dibujarRuleta() {
    for (let i = 0; i < sectores; i++) {
        const inicioAngulo = anguloSector * i + anguloActual;
        const finalAngulo = inicioAngulo + anguloSector;

        ctx.beginPath();
        ctx.moveTo(radio, radio);
        ctx.arc(radio, radio, radio, inicioAngulo, finalAngulo);
        ctx.fillStyle = i % 2 === 0 ? '#FF5733' : '#33CFFF'; // Colores alternos
        ctx.fill();
        ctx.stroke();

        // Dibujar el texto
        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate(inicioAngulo + anguloSector / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(textos[i], radio - 10, 10); // Ajustar la posición del texto
        ctx.restore();
    }

    // Dibuja la línea de referencia en la parte superior
    ctx.beginPath();
    ctx.moveTo(radio, radio);
    ctx.lineTo(radio, 0);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function girarRuleta() {
    if (velocidad > 0) {
        anguloActual += velocidad;
        velocidad *= 0.98; // Disminuir velocidad gradualmente
        if (velocidad < 0.01) {
            velocidad = 0;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarRuleta();
    requestAnimationFrame(girarRuleta);
}

girarBtn.addEventListener('click', () => {
    if (velocidad === 0) {
        velocidad = Math.random() * 0.2 + 0.1; // Velocidad aleatoria inicial
    }
});

dibujarRuleta();
girarRuleta();
