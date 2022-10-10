let carrito = [];

const contenedorDeStickers = document.getElementById("contenedorStickers");
document.getElementById("botonComprar").addEventListener("click", botonMsjComprar);
document.getElementById("botonVaciarCarrito").addEventListener("click", botonVaciarCarrito)
document.addEventListener("DOMContentLoaded", guardarCarritoLocal)

fetch ("./stockStickers.json")
.then((respuesta) => respuesta.json())
.then ((stockStickers => {
  stockStickers.forEach((sticker) => insertarStock(sticker));
}))

function insertarStock(sticker) {
  const divSticker = document.createElement("div");
  divSticker.classList.add("card","m-4","p-3","mb-5","bg-body","rounded","diseñoCard");
  divSticker.style = "width: 18rem";
  divSticker.innerHTML = `
   <img src="${sticker.imagen}" class="card-img-top" alt="${sticker.nombre}" />
   <div class="card-body">
      <h5 class="card-title">${sticker.nombre}</h5>
      <p class="card-text">
        Precio: <b>$${sticker.precio}</b> <br />
        Tamaño: ${sticker.tamaño}<br />
        Anime: ${sticker.anime}
      </p>
      <button "href="#" id="agregar${sticker.id}" class="btn btn-primary">Agregar al carrito</button>
   </div>`;

  contenedorDeStickers.appendChild(divSticker);

  botonAgregarAlCarrito(sticker)
 
}

const botonAgregarAlCarrito = (sticker) => {
  const buttonAgregar = document.getElementById(`agregar${sticker.id}`);
  buttonAgregar.addEventListener("click", () => {agregarAlCarrito(sticker.id);});
}

const agregarAlCarrito = (stickerId) => {
  fetch ("./stockStickers.json")
.then((respuesta) => respuesta.json())
.then ((stockStickers =>  {
  const existe = carrito.some((producto) => producto.id === stickerId);
  if (existe) {
    const sticker = carrito.map((producto) => {producto.id === stickerId && producto.cantidad++});
  } else {
    const sticker = stockStickers.find((producto) => producto.id === stickerId);
    carrito.push(sticker);
  }
  visualizarCarrito();
}));
}

const visualizarCarrito = () => {
  const tablaCarrito = document.getElementById("tablaCarrito");
  tablaCarrito.innerHTML = "";
  carrito.forEach((sticker) => {
    const trVisualizarCarrito = document.createElement("tr");
    trVisualizarCarrito.classList.add("productoCarrito");
    trVisualizarCarrito.innerHTML = `
<th scope="row">${sticker.id}</th>
<td>${sticker.nombre}</td>
<td>${sticker.tamaño}</td>
<td>${sticker.cantidad} </td>
<td>${sticker.precio * sticker.cantidad}</td>
<td><i onclick="eliminarDelCarrito(${sticker.id})" class="fas fa-trash-alt"></i></p></td>`;
    
tablaCarrito.appendChild(trVisualizarCarrito);
localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  totalCarrito();
};

const totalCarrito = () => {
  let total = 0;
  const precioTotal = document.getElementById("precioTotal");
  carrito.forEach((producto) => {
    const precio = Number(producto.precio);
    total = total + precio * producto.cantidad;
  });
  precioTotal.innerHTML = `$${total}`;
};

const eliminarDelCarrito = (stickerId) => {
  const sticker = carrito.find((producto) => producto.id === stickerId);
  const indice = carrito.indexOf(sticker);
  sticker.cantidad == 1 ? carrito.splice(indice, 1) : sticker.cantidad--;
  localStorage.removeItem("carrito");

  visualizarCarrito();
};

function botonMsjComprar() {
  carrito == 0 ? Swal.fire({position: 'center', icon: 'error', title: '¡Upss! Su carrito esta vacio.', showConfirmButton: false, timer: 1500}) : 
  Swal.fire({position: 'center', icon: 'success', title: '¡Compra realizada con exito!', showConfirmButton: false, timer: 1500})
  carrito.length = 0;
  localStorage.removeItem("carrito");
  visualizarCarrito();
}

function botonVaciarCarrito() {
  Swal.fire({
      title: 'Desea vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar el carrito!'
    }).then((result) => {  
      if (result.isConfirmed) {
        Swal.fire(
          'Carrito vacio',
          'Has vaciado el carrito',
          'success'
        )
        carrito.length = 0;
        localStorage.removeItem("carrito");
        visualizarCarrito();
      }
    })
  };

function guardarCarritoLocal() {
  if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      visualizarCarrito();
    }
}