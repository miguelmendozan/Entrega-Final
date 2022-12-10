
//buscar elementos del DOM

const divProductos = document.querySelector("#divProductos");
const divTotal = document.querySelector("#divTotal");

// Consumiendo Json de productos
fetch("productos.json")
  .then((respuesta) => respuesta.json())
  .then((productos) => {
    //renderizamos los productos
    productos.forEach((producto) => {
      divProductos.innerHTML += `
      <div id="${producto.id}" class="card cardProducto">
      <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <img src="${producto.imagen}" alt="Skate" class="img-fluid">
      <p class="card-text">$${producto.precio}</p>
      <button id="${producto.id}" type="button" class="btn btn-warning">Agregar</button>
      </div>
      </div>
      `;
    });
    //carrito de compra

    const carrito = [];
    const botonesAgregar = document.querySelectorAll(".btn-warning");

    botonesAgregar.forEach((boton) => {
      boton.onclick = () => {
        const producto = productos.find(
          (prod) => prod.id === parseInt(boton.id)
        );
        const productoCarrito = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        };
        const indexCarrito = carrito.findIndex(
          (prod) => prod.id === producto.id
        );
        if (indexCarrito === -1) {
          carrito.push(productoCarrito);
        } else {
          carrito[indexCarrito].cantidad += 1;
        }
        guardarCarritoLocalStorage();
      };
    });

    const botonFinalizar = document.querySelector("#finalizar");
    botonFinalizar.onclick = () => {
      const totalCompra = carrito
        .map((prod) => prod.precio * prod.cantidad)
        .reduce((elem1, elem2) => elem1 + elem2);

      swal(
        "Gracias por tu compra!",
        "El total de tu compra es " + totalCompra,
        "success"
      );
    };
  });

// guardar carrito local storage
function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

