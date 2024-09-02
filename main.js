const canvas = document.getElementById('ruletaCanvas');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girarBtn');

canvas.width = 600;
canvas.height = 600;

const radio = 250;
const sectores = 12;
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
    'Premio 8',
    'Premio 9',
    'Premio 10',
    'Premio 11',
    'Premio 12'];


const colors = ['#ECBA10','#9D7A00','#453700','#140F00']

function dibujarRuleta() {

    ctx.fillStyle = '#131e29'; // Color de fondo, puedes cambiarlo
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sectores; i++) {
        const inicioAngulo = anguloSector * i + anguloActual;
        const finalAngulo = inicioAngulo + anguloSector;

        ctx.beginPath();
        ctx.moveTo(radio + 40, radio + 40);
        ctx.arc(radio + 40, radio + 40, radio, inicioAngulo, finalAngulo);
        ctx.fillStyle = colors[i%colors.length];
        ctx.fill();
        // ctx.stroke();


        ctx.save();
        ctx.translate(radio + 40, radio + 40);
        ctx.rotate(inicioAngulo + anguloSector / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFF';
        ctx.font = 'normal 18px Arial';
        ctx.fillText(premios[i], radio - 10, 10);
        ctx.restore();
    }


    ctx.beginPath();
    ctx.moveTo(radio + 40, 20);
    ctx.lineTo(radio + 40, 40);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(radio + 40, radio + 40, radio + 14, 0, 2 * Math.PI, false);
    ctx.arc(radio + 40, radio + 40, radio, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
    
    ctx.save();


    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.beginPath();
    ctx.arc(radio + 40, radio + 40, radio * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    // ctx.strokeStyle = '#000';
    // ctx.lineWidth = 2;
    // ctx.stroke();
    ctx.restore();





    for (let i = 0; i < sectores; i++) {
        const inicioAngulo = anguloSector * i + anguloActual;
        ctx.save();
        ctx.beginPath();
        ctx.translate(radio + 40, radio + 40);
        ctx.rotate(inicioAngulo + anguloSector / 2);
        ctx.arc(radio, (radio) * anguloSector / 2, radio * 0.02, 0, 2 * Math.PI);
        ctx.fillStyle = '#CCCCCC';
        ctx.fill();
        ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(radio + 40, 20);
    ctx.lineTo(radio + 40, 50);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();



}


function girarRuleta() {
    if (velocidad > 0) {
        anguloActual += velocidad;
        velocidad *= 0.9935;
        if (velocidad < 0.003) {
            velocidad = 0;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarRuleta();
    requestAnimationFrame(girarRuleta);
}

girarBtn.addEventListener('click', () => {
    if (velocidad === 0) {
        velocidad = Math.random() * 0.2 + 0.1;
    }
});

dibujarRuleta();
girarRuleta();
