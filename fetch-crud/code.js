const url = 'http://localhost:3000/api/articulos/'
const contenedor = document.querySelector('tbody')
let resultados = ''
const  modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')

let opcion = ' '

btnCrear.addEventListener('click', ()=> {
    descripcion.value =''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

// funcion para mostrar resultado

const mostrar = (articulos) =>{
    articulos.forEach(articulo => {
        resultados += `
                    <tr>
                        <td>${articulo.id}</td>
                        <td>${articulo.descripcion}</td>
                        <td>${articulo.precio}</td>
                        <td>${articulo.stock}</td>
                        <td class="text-center"><a class='btnEditar btn btn-primary'>Editar</a><a class='btnBorrar btn btn-danger'>Borrar</a></td>
                    </tr>
    `
    })
    contenedor.innerHTML = resultados
    
}

// Procedimiento Mostrar

fetch(url)
    .then(response => response.json())
    .then (data => mostrar(data) )
    .catch (error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
on(document, 'click', '.btnBorrar', e => {
    console.log('Borrado')
})