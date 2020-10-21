import crearTabla, { divTabla } from "../tabla.js";
import { limpiarControles } from "../form.js";
import { guardarDatos } from "../localstorage.js";
import { txtId } from "../form.js";
import { txtTitulo, rdoTransaccion, txtDescripcion, numbPrecio, numbPuertas, numbKMs, numbPotencia } from "../form.js";
import { validarString } from "../validaciones.js";




// -------- Manejadores --------

export const eventHandlerBaja = ( e, lista, proximoId ) => {

    e.preventDefault();

    let listaLength = lista.length;
    const idAnuncioSeleccionado = parseInt( txtId.value );  // Obtengo referencia del id

    if ( confirm( 'Seguro que desea eliminar este anuncio?' ) ) { 

        for (let i = 0; i < listaLength; i++) {

            if( lista[i].id === idAnuncioSeleccionado ) {

                lista.splice( i , 1); // 1er param: indice del elemento, 2do: cuantos deseo eliminar.
                guardarDatos( lista, proximoId );
                actualizarLista( lista );
                limpiarControles();
                break;
                
            }
            
        } 

    } else {

        limpiarControles();

    }

}

export const eventHandlerModificar = ( e, lista, proximoId ) => {

    console.log(lista);
    e.preventDefault();

    const idAnuncioSeleccionado = parseInt( txtId.value );  // Obtengo referencia del id del Anuncio de autos.
    const filtrado = lista.filter( x => x.id === idAnuncioSeleccionado );
    console.log(filtrado);

    if ( filtrado ) {

        filtrado[0].titulo = validarString( txtTitulo.value );
        filtrado[0].transaccion = rdoTransaccion.value;
        filtrado[0].descripcion = validarString( txtDescripcion.value );
        filtrado[0].precio = numbPrecio.value;
        filtrado[0].num_puertas = numbPuertas.value;
        filtrado[0].num_KMs = numbKMs.value;
        filtrado[0].potencia = numbPotencia.value;

        if ( confirm( 'Seguro que desea modificar este anuncio?' ) ) { 

            if ( filtrado[0].titulo && filtrado[0].descripcion ) {
        
                guardarDatos( lista, proximoId );
                actualizarLista( lista );
                limpiarControles();
                alert( 'Modificado con éxito!!' );
    
            } else {
                
                throw new Error( `No se pudo hacer la modificación.\nEl titulo y/o la descripción no pueden ser sólo números.\n` );
    
            }

        } else {

            limpiarControles();

        }

    }
}

export const eventHandlerCancelar = ( e ) => {

    console.log('estoy tocando el boton de cancelar');
    e.preventDefault();
    limpiarControles();

}

export const eventHandlerLimpiarTabla = ( e ) => {

    console.log('estoy tocando el boton de limpiar tabla');
    e.preventDefault();
    localStorage.clear();
    window.location.reload();

}


// Verifica que el localStorage esté vacío, si lo está crea el spinner, lo inyecta en divTabla y luego de 3s, se crea la tabla.
export const actualizarLista = ( lista ) => {

    console.log(lista);

    // Cuando no hay nada en el localStorage, no cargo el spinner ni uso el setTimeout().
    if(localStorage.length !== 0 ) {

        divTabla.textContent = "";
        divTabla.appendChild( crearPreloader() );
        
        setTimeout(() => {
            
            divTabla.textContent = "";
            divTabla.appendChild( crearTabla( lista ) );
            
        }, 3000);
        
    }

};

const crearPreloader = () => {

    const spinnerCar = document.createElement( 'img' );

    spinnerCar.width = 80;
    spinnerCar.src = './spinnercar.gif';
    spinnerCar.alt = 'Progressbar para la carga de la tabla.';

    return spinnerCar;
}