import { cuponPremios, msnPremios } from "./src/premios.js";

const canvas = document.getElementById('ruletaCanvas');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girarBtn');
const againBtn = document.getElementById('againBtn')
const container = document.querySelector('.container')
const cStart = document.querySelector('.container--start')
const cEnd = document.querySelector('.container--end')
const cupon = document.querySelector('.end-cupon')
const cuponMsn = document.querySelector('.end-msn')
const contentCupon = document.querySelector('.content-cupon')
const pCheck = document.querySelector('.pCheck')

canvas.width = 600;
canvas.height = 600;


const imgArrow = new Image()
imgArrow.src = './assets/arrow.png'
const radio = 250;
const sectores = 12;
const anguloSector = (2 * Math.PI) / sectores;
let anguloActual = 0;
let velocidad = 0;


const premios = [
    '10% OFF Extra',
    'Envío Gratis',
    '5% OFF Extra',
    'Intentalo de nuevo',
    'Envío Gratis',
    '10% OFF Extra',
    '5% OFF Extra',
    'Intentalo de nuevo',
    '5% OFF Extra',
    'Envío Gratis',
    '10% OFF Extra',
    'Intentalo de nuevo'];


const colors = ['#FFFFFF', '#131E29', '#EA0029']

const posX = radio + 50
const posY = radio + 50


function dibujarRuleta() {

    // ctx.fillStyle = '#131e29';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sectores; i++) {
        const inicioAngulo = anguloSector * i + anguloActual;
        const finalAngulo = inicioAngulo + anguloSector;

        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.arc(posX, posY, radio, inicioAngulo, finalAngulo);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        // ctx.stroke();

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(inicioAngulo + anguloSector / 2);
        ctx.textAlign = 'right';
        if (i % 3 == 0) {
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 16px Arial';
        } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'normal 16px Arial';

        }
        ctx.fillText(premios[i], radio - 10, 10);
        ctx.restore();
    }


    ctx.beginPath();
    ctx.moveTo(posX, 20);
    ctx.lineTo(posX, 40);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(posX, posY, radio + 14, 0, 2 * Math.PI, false);
    ctx.arc(posX, posY, radio, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.beginPath();
    ctx.arc(posX, posY, radio * 0.15, 0, 2 * Math.PI);
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
        ctx.translate(posX, posY);
        ctx.rotate(inicioAngulo + anguloSector / 2);
        ctx.arc(radio, (radio) * anguloSector / 2, radio * 0.02, 0, 2 * Math.PI);
        ctx.fillStyle = '#CCCCCC';
        ctx.fill();
        ctx.restore();
    }



    ctx.drawImage(imgArrow, posX - 24, 8, imgArrow.width, imgArrow.height)

    // ctx.beginPath();
    // ctx.moveTo(posX, 20);
    // ctx.lineTo(posX, 50);
    // ctx.strokeStyle = '#000';
    // ctx.lineWidth = 1;
    // ctx.stroke();
}


function girarRuleta() {
    if (velocidad > 0) {
        anguloActual += velocidad;
        velocidad *= 0.9935;
        if (velocidad < 0.003) {
            velocidad = 0;
            cStart.style.display = 'none'
            cEnd.style.display = 'block'
            contentCupon.style.display = "flex"
            if (screen.width <= 680) {
                container.style.display = 'block'

            }
            printMsn()
        }
    }
    anguloActual %= 2 * Math.PI;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarRuleta();
    requestAnimationFrame(girarRuleta);
}
function printMsn() {

    switch (calcularPremio()) {
        case '5% OFF Extra':

            cuponMsn.innerHTML = msnPremios.fiveExtra
            cupon.innerHTML = cuponPremios.fiveExtra
            contentCupon.style.display = "flex"

            break
        case '10% OFF Extra':
            cuponMsn.innerHTML = msnPremios.tenExtra
            cupon.innerHTML = cuponPremios.tenExtra
            contentCupon.style.display = "flex"
            break
        case 'Envío Gratis':
            cuponMsn.innerHTML = msnPremios.freeShipping
            cupon.innerHTML = cuponPremios.freeShipping
            contentCupon.style.display = "flex"
            break
        default:
            cuponMsn.innerHTML = msnPremios.again
            cupon.innerHTML = ''
            contentCupon.style.display = "none"

    }
}

function calcularPremio() {

    const anguloReferencia = (anguloActual + Math.PI / 2) % (2 * Math.PI);
    const indiceSector = Math.floor(anguloReferencia / anguloSector);
    const indiceGanador = (sectores - indiceSector - 1) % sectores;
    return premios[indiceGanador];
}


girarBtn.addEventListener('click', () => {
    if (velocidad === 0) {
        velocidad = Math.random() * 0.3 + 0.1;
        if (screen.width <= 680) {
            container.style.display = 'none'

        }
    }
});

againBtn.addEventListener('click', () => {
    if (velocidad === 0) {
        velocidad = Math.random() * 0.3 + 0.1;
        if (screen.width <= 680) {
            container.style.display = 'none'

        }
        pCheck.style.display = 'none'
    }
})
contentCupon.addEventListener('click', () => {

    let text = cupon.innerHTML;

    const tempInput = document.createElement('input');
    tempInput.setAttribute("value", text);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    pCheck.style.display = 'block'

})

dibujarRuleta();
girarRuleta();
