let imagesColumnDOM = '';
let selectedImageNames = [];
let path = "https://res.cloudinary.com/dzipy5bme/image/upload/w_1000/q_auto:best/f_auto/v1/Dibujos/"; // Usa la URL completa para precargar
const totalImages = 134; // Supongamos que hay 133 imágenes

// Precargar las imágenes
let precachedImages = [];
for (let i = 1; i <= totalImages; i++) {
    let image = new Image(); // Crear un nuevo objeto de imagen
    image.src = `${path}${i}`; // Asignar la ruta de la imagen        
    precachedImages.push(image); // Añadirla al array de imágenes precargadas
}

while (selectedImageNames.length < 20) {
    let random = Math.floor(Math.random() * totalImages) + 1; // Genera un entero entre 1 y 134

    // Verifica si el número aleatorio ya está en el array
    if (!selectedImageNames.includes(random)) {
        selectedImageNames.push(random);
    }
}

let currentImageNames = selectedImageNames;

const changeImage = (imageContainerElement, animationTime) => {
    let containerImage = imageContainerElement.querySelector('img');
    let imageSRC = containerImage.src;

    // Extrae el número de la imagen actual
    let currentImageNumber = imageSRC.substring(imageSRC.lastIndexOf('/') + 1, imageSRC.lastIndexOf('.'));
    // Agrega la imagen actual al arreglo
    currentImageNames.push(parseInt(currentImageNumber)); // Asegúrate de agregarlo como número

    // Genera un nuevo número aleatorio que no esté en currentImageNames
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * totalImages) + 1; // Número entre 1 y totalImages
    } while (currentImageNames.includes(randomNumber)); // Asegúrate de que no esté repetido

    imageContainerElement.style.transitionDuration = `${animationTime}s`;
    imageContainerElement.classList.add('flip');

    // Espera el tiempo de la animación para cambiar la imagen (0.6s en este caso)
    setTimeout(() => {
        containerImage.src = precachedImages[randomNumber - 1].src; // Usar la imagen precargada
        imageContainerElement.classList.remove('flip'); // Quita la clase flipped después del cambio
    }, 400); // Cambia la imagen en el punto medio de la animación (0.3s de los 0.6s)


    // Elimina la imagen anterior de currentImageNames
    currentImageNames.splice(currentImageNames.indexOf(parseInt(currentImageNumber)), 1); // Elimina la imagen anterior
}

let i = 1;

// Generar el HTML para mostrar las imágenes
for (let k = 0; k < selectedImageNames.length; k++) { // Usar el tamaño actual de selectedImageNames
    imagesColumnDOM += `
        <div class="image-container" id="${k + 1}">
            <img src="${precachedImages[selectedImageNames[k] - 1].src}"></img>
        </div>
        `;
    
    if ((k + 1) % 5 === 0) {
        document.querySelector(`.image-column-container-${i}`).innerHTML = imagesColumnDOM;
        imagesColumnDOM = ``;
        i++;
    }
}

for (let k = 0; k < selectedImageNames.length; k++) {
    // Llamar a changeImage cada 3 a 5 segundos para cada contenedor
    
    let randomTime = Math.random() * 2000 + 3000;
    setInterval(() => {
        changeImage(document.getElementById(`${k + 1}`), 1);
    }, randomTime); // Entre 3000 ms (3 segundos) y 5000 ms (5 segundos)
}

const tiktok = document.getElementById('tiktok');
const instagram = document.getElementById('instagram');

const redirectTiktok = () => {
    window.open('https://www.tiktok.com/@cabeto.art/');
}

const redirectInstagram = () => {
    window.open('https://www.instagram.com/cabeto.art/');
}

instagram.addEventListener('click', redirectInstagram);
tiktok.addEventListener('click', redirectTiktok);
