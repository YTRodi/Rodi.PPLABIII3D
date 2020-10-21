import { frmPrincipal } from "./form.js";
import { botonBaja, botonModificar, botonCancelar, botonLimpiarTabla } from "./form.js";
import { obtenerAnuncio_Auto, limpiarControles } from "./form.js";
import { obtenerAnuncios_Autos, obtenerId, guardarDatos } from "./localstorage.js";
import { actualizarLista, eventHandlerBaja, eventHandlerModificar, eventHandlerCancelar, eventHandlerLimpiarTabla } from "./controllers/controller.js";


let lista;
let proximoId;


window.addEventListener( 'load', initHanlders );


function initHanlders() {
    
    lista = obtenerAnuncios_Autos(); // [ { Obj, Obj, Obj... } ]
    proximoId = obtenerId(); // number
    actualizarLista( lista );

    // ALTA
    frmPrincipal.addEventListener( 'submit', ( e ) => {

        e.preventDefault();
    
        try {

            const nuevoAnuncio = obtenerAnuncio_Auto();

            if( nuevoAnuncio ) {
    
                lista.push( nuevoAnuncio );
                proximoId++;
                guardarDatos( lista, proximoId );
                actualizarLista( lista );
                limpiarControles();
        
            }
            
        } catch ( error ) {
            
            alert( error );
            limpiarControles();

        }


    });


    // BAJA
    botonBaja.addEventListener( 'click', ( e ) => { eventHandlerBaja( e, lista, proximoId ) });


    // MODIFICAR
    botonModificar.addEventListener( 'click', ( e ) => {

        try {

            eventHandlerModificar( e, lista, proximoId );
            
        } catch (error) {
            
            alert( error );

        }

    });
        

    // CANCELAR
    botonCancelar.addEventListener( 'click', ( e ) => { eventHandlerCancelar( e ); });


    // LIMPIAR TABLA
    botonLimpiarTabla.addEventListener( 'click', ( e ) => { eventHandlerLimpiarTabla( e ); });

};