import Anuncio_Auto from "./anuncio_auto.js";
import { obtenerId } from "./localstorage.js";
import { validarString } from "./validaciones.js";

// ------ Controles Formulario ------

// Form principal.
export const frmPrincipal = document.querySelector( '#form-principal' );

// LabelId, TextBox's, radioButton
export const labelId = document.querySelector( '#labelId' );
export const txtId = document.querySelector( '#txtId' );
export const txtTitulo = document.querySelector('#txtTitulo');
export const rdoTransaccion = frmPrincipal.transaccion;
export const txtDescripcion = document.querySelector('#txtDescripcion');
export const numbPrecio = document.querySelector('#numbPrecio');
export const numbPuertas = document.querySelector('#numbPuertas');
export const numbKMs = document.querySelector('#numbKMs');
export const numbPotencia = document.querySelector('#numbPotencia');


// Botones ( Alta, Baja, Modificar, LimpiarTabla );
export const botonAlta = document.querySelector( '#btnAlta' );
export const botonBaja = document.querySelector( '#btnBaja' );
export const botonModificar = document.querySelector( '#btnModif' );
export const botonCancelar = document.querySelector( '#btnCancelar' );
export const botonLimpiarTabla = document.querySelector( '#btnLimpiarTabla' );


// ------ Funciones ------
export const obtenerAnuncio_Auto = () => {

    const nuevoAnuncio = new Anuncio_Auto( obtenerId(),
                                            validarString( txtTitulo.value ),
                                            rdoTransaccion.value,
                                            validarString( txtDescripcion.value ),
                                            numbPrecio.value,
                                            numbPuertas.value,
                                            numbKMs.value,
                                            numbPotencia.value);

    if ( nuevoAnuncio.titulo && nuevoAnuncio.descripcion ) {

        return nuevoAnuncio;

    } else {

        throw new Error( `El titulo y/o la descripción no pueden ser sólo números.` );

    }

}

export const limpiarControles = () => {

    txtTitulo.value = '';
    rdoTransaccion.value = 'Venta';
    txtDescripcion.value = '';
    numbPrecio.value = '';
    numbPuertas.value = '';
    numbKMs.value = '';
    numbPotencia.value = '';
    
    botonAlta.classList.remove( 'desaparecer' ); // Le saco la clase desaparecer al botón del alta

    labelId.classList.add( 'desaparecer' );
    txtId.classList.add( 'desaparecer' );
    botonBaja.classList.add( 'desaparecer' );
    botonModificar.classList.add( 'desaparecer' );
    
};