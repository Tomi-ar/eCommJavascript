// READY FUNCTION
$(() => {
    console.log('El DOM esta listo');
});

function refresh() {
    window.location.reload();
}

class Producto {
    constructor(id, nombre, tipo, productor, precio, seleccion, cantidad) {
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.productor = productor;
        this.precio = parseFloat(precio);
        this.seleccion = seleccion;
        this.cantidad = parseInt(cantidad);
    }
}

// DEFINICION DE PRODUCTOS PARA AGREGAR AL CARRITO
const Productos = [{
        id: 1,
        nombre: "Kilometro 24.7",
        tipo: "Session IPA",
        productor: "Patagonia",
        precio: 150,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Kuné",
        tipo: "Pale Ale",
        productor: "Patagonia",
        precio: 200,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Riberão Lager",
        tipo: "Lager",
        productor: "Colorado",
        precio: 310,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Eugenia",
        tipo: "Session IPA",
        productor: "Colorado",
        precio: 285,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 5,
        nombre: "Ithaca",
        tipo: "Stout",
        productor: "Colorado",
        precio: 250,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 6,
        nombre: "India Pale Ale",
        tipo: "IPA",
        productor: "Antares",
        precio: 275,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 7,
        nombre: "Fin de Tarde",
        tipo: "Weiss",
        productor: "Antares",
        precio: 230,
        seleccion: false,
        cantidad: 1,
    },
    {
        id: 8,
        nombre: "Playa Grande",
        tipo: "Lager",
        productor: "Antares",
        precio: 320,
        seleccion: false,
        cantidad: 1,
    },
];

// CARGO LOS PRODUCTOS DESDE LA LISTA DE JAVASCRIPT
for (const product of Productos) {
    $("#productos").append(
        `<div id="producto-box" class="card producto-box">
            <img src="images/TiposCerveza.jpg" class="card-img-top mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">Productor: ${product.productor}</p>
                <p class="card-text">Estilo: ${product.tipo}</p>
                <p class="card-text">Precio: $${product.precio}</p>
                <button id="${product.id}" class="btn btn-primary Add my-3">+ Agregar</button>
            </div>
        </div>`
    )
};

// FILTRO DE TEXTO PARA MOSTRAR LAS VARIEDADES
$("#tipoCerveza").change(function(e) {
    if (e.target.value !== "") {
        const filtrado = Productos.filter((itemFiltrado) => itemFiltrado.tipo.toUpperCase() === e.target.value.toUpperCase());

        console.log(filtrado);

        $("#productos").replaceWith(`
        <div id="productos" class="col-md-9 productos">
            <div class="clearall"></div>
        </div>`);

        for (const product of filtrado) {
            $("#productos").append(
                `<div id="producto-box" class="card producto-box">
                <img src="images/TiposCerveza.jpg" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text">Productor: ${product.productor}</p>
                    <p class="card-text">Estilo: ${product.tipo}</p>
                    <p class="card-text">Precio: $${product.precio}</p>
                    <button id="${product.id}" class="btn btn-primary Add my-3">+ Agregar</button>
                </div>
            </div>`
            )
        };

    } else {
        console.log('No has ingresado un parámetro.');

        $("#productos").replaceWith(`
        <div id="productos" class="col-md-9 productos">
            <div class="clearall"></div>
        </div>`);

        for (const product of Productos) {
            $("#productos").append(
                `<div id="producto-box" class="card producto-box">
                <img src="images/TiposCerveza.jpg" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text">Productor: ${product.productor}</p>
                    <p class="card-text">Estilo: ${product.tipo}</p>
                    <p class="card-text">Precio: $${product.precio}</p>
                    <button id="${product.id}" class="btn btn-primary Add my-3">+ Agregar</button>
                </div>
            </div>`
            )
        }
        refresh();
    }
});


let enCarrito = [];

// CALCULAR EL TOTAL DEL CARRITO EN BASE AL PRODUCTO Y CANTIDAD
function calculadora(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].cantidad >= 6) {
            total += array[i].precio * array[i].cantidad * 0.85;
        } else {
            total += array[i].precio * array[i].cantidad
        }
    }
    return total;
}

// FUNCIÓN PARA CALCULAR EL TOTAL SIN DESCUENTO
function sinDescuento(array) {
    let sumaproducto = 0;
    for (let i = 0; i < array.length; i++) {
        sumaproducto += array[i].precio * array[i].cantidad;
    }
    return sumaproducto
};

//CAMBIA EL ESTILO DEL BOTON UNA VEZ SELECCIONADA LA CERVEZA
$("button").click(function() {
    $(this).removeClass("btn btn-primary");
    $(this).addClass("btn btn-success");
});

//TRANSFORMA EL BOTON DE AGREGAR
$("button").mouseover(function() {
    $(this).css({ transform: "scale(1.1)" }, "slow");
})
$("button").mouseout(function() {
    $(this).css({ transform: "scale(1)" }, "slow");
})

// FUNCION PARA QUITAR DEL CARRITO
const clickQuitar = (evento) => {
    const quitado = evento.target;
    const quitadoPadre = quitado.parentElement;
    console.log(quitadoPadre.id);

    let index = enCarrito.findIndex(i => i.id === parseInt(quitadoPadre.id));
    console.log(index)

    enCarrito[index].cantidad = 1;
    enCarrito.splice(index, 1);
    console.log(enCarrito);
    $(`#cod${quitadoPadre.id}`).remove();

    console.log(calculadora(enCarrito));

    const Desc2 = (sinDescuento(enCarrito) - calculadora(enCarrito));
    const Subt2 = calculadora(enCarrito);

    $("#totalDesc").replaceWith(`<span id="totalDesc" class="pull-right">-$${Desc2}</span>`);
    $("#mini-cart-subtotal").replaceWith(`<strong id="mini-cart-subtotal" class="pull-right">$${Subt2}</strong>`);
}

//FUNCION PARA LLAMAR AL BOTON QUE VOY A AGREGAR DESPUES
const eventoQuitar = (padre, callback) => {
    $(padre).click(callback);
}

// FUNCION PARA REVISAR SI EL PRODUCTO ESTÁ EN EL CARRITO Y QUE ME DEVUELVA EL INDEX
function checkCarrito(array, a) {
    let idx = array.findIndex(i => i.id === parseInt(a.id));
    return idx;
}

// AGREGO EVENTO PARA AGREGAR PRODUCTOS AL CARRITO
$(".Add").click(function(e) {
    const agregado = e.target;
    console.log(agregado.id);
    const prodAgregado = Productos.find((productoItem) => productoItem.id === parseInt(agregado.id));

    if (checkCarrito(enCarrito, prodAgregado) === -1) {
        enCarrito.push(prodAgregado);
        console.log(enCarrito);

        $("#seleccionadas").prepend(`
        <div id="cod0${prodAgregado.id}" class="mini-cart-item">
            <img src="images/CervezasyMas.PNG" alt="CERVEZA AGREGADA AL CARRITO" width="50px" height="77px">
            <div class="inf-produto-carrito" id="0${prodAgregado.id}">
                <p class="title-mini">${prodAgregado.nombre}</p>
                <p class="tipoCerv">${prodAgregado.tipo}</p>
                <div class="cantidad-produto">
                    <p class="cantidad-produto-item">x${prodAgregado.cantidad}</p>
                    <p class="cantidad-produto-precio">$ ${prodAgregado.precio}</p>
                </div>
                <br clear="all">
                <button class="quitar${prodAgregado.id}">Remover</button>
            </div>
        </div>       
        `);
    } else {
        let Cant = enCarrito[checkCarrito(enCarrito, prodAgregado)].cantidad;
        enCarrito[checkCarrito(enCarrito, prodAgregado)].cantidad = Cant + 1;

        $(`#0${prodAgregado.id}`).replaceWith(`
        <div class="inf-produto-carrito" id="0${prodAgregado.id}">
                <p class="title-mini">${prodAgregado.nombre}</p>
                <p class="tipoCerv">${prodAgregado.tipo}</p>
                <div class="cantidad-produto">
                    <p class="cantidad-produto-item">x${prodAgregado.cantidad}</p>
                    <p class="cantidad-produto-precio">$ ${prodAgregado.precio}</p>
                </div>
                <br clear="all">
                <button class="quitar${prodAgregado.id}">Remover</button>
            </div>`)
    }

    $("#mini-cart").show();

    const Desc = (sinDescuento(enCarrito) - calculadora(enCarrito));
    const Subt = calculadora(enCarrito);

    $("#totalDesc").replaceWith(`<span id="totalDesc" class="pull-right">-$${Desc}</span>`);
    $("#mini-cart-subtotal").replaceWith(`<strong id="mini-cart-subtotal" class="pull-right">$${Subt}</strong>`);

    eventoQuitar(`.quitar${prodAgregado.id}`, clickQuitar);
    console.log(calculadora(enCarrito));
    console.log(Desc);
});

// EVENTO QUE MUESTRA O ESCONDE LOS PRODUCTOS DEL CARRITO
$("#carrito").click(() => {
    $("#mini-cart").toggle(2000);
});

$("#btCerrar").click(() => {
    $("#mini-cart").hide();
});

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

$("#finalizar").click(() => {
    guardarLocal("Carrito1", JSON.stringify(enCarrito));

    alert("Gracias por su compra! En breve nos pondremos en contacto para terminar el pedido");

    refresh();
})