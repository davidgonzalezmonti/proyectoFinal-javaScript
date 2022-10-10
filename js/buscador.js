const formBuscador = document.getElementById("formBuscador");

fetch ("./stockStickers.json")
.then((respuesta) => respuesta.json())
.then ((stockStickers => {

  formBuscador.addEventListener("submit", (e) => {
    e.preventDefault();
    let opcionesBusquedaUI = document.getElementById("opcionesBusqueda").value;
    filtradoPorAnime(opcionesBusquedaUI);
    formBuscador.reset();
  });
  
    const filtradoPorAnime =  (opcionesBusqueda) => {
      contenedorDeStickers.innerHTML = "";
      stockStickers.find((sticker) => sticker.anime === opcionesBusqueda) !== undefined ? (stockStickerFiltrado = stockStickers.filter((sticker) => sticker.anime === opcionesBusqueda)) : (stockStickerFiltrado = stockStickers);
      stockStickerFiltrado.forEach((sticker) => insertarStock(sticker));
    };

}))