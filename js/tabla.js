import { txtTitulo, rdoTransaccion, txtDescripcion, numbPrecio, numbPuertas, numbKMs, numbPotencia, txtId } from "./form.js";
import { botonAlta, botonBaja, botonModificar } from "./form.js";


export const divTabla = document.querySelector( '#divTabla' );


const crearTabla = ( lista ) => {

    const tabla = document.createElement( 'table' );

    tabla.appendChild( crearCabecera( lista[0] ) );
    tabla.appendChild( crearCuerpo( lista ) );

    return tabla;
};

const crearCabecera = ( item ) => {

    const tHead = document.createElement( 'thead' );
    const tr = document.createElement( 'tr' );

    for (const key in item) {
        
        const th = document.createElement( 'th' );
        const texto = document.createTextNode( key );

        th.appendChild( texto );
        tHead.appendChild(th);
    }


    return tHead;

};

const crearCuerpo = ( lista ) => {

    const tBody = document.createElement( 'tbody' );

    lista.forEach( element => {

        const tr = document.createElement( 'tr' );

        for (const key in element) {
            
            // table data
            const td = document.createElement( 'td' );

            // Como es un array asociativo, nos da el valor del atributo key.
            const texto = document.createTextNode( element[ key ] );
            td.appendChild( texto );
            tr.appendChild( td );

        }

        // console.log(element.id);

        if( element.hasOwnProperty( 'id' ) ) { // Si el elemento tiene la propiedad 'id'

            // #2
            tr.dataset.id = element[ 'id' ];

        } else {

            console.log( 'El elemento no tiene la propiedad "id".' );
            
        }

        //Le agrego el manejador del evento.
        agregarManejadorTR( tr, lista );

        tBody.appendChild( tr );

    });

    return tBody;

};

const agregarManejadorTR = ( tr, lista ) => {
    
    let idPersonaSeleccionada;

    if( tr ) { 
        
        tr.addEventListener( 'click', ( e ) => {

            e.preventDefault();

            idPersonaSeleccionada = parseInt( e.path[1].dataset.id );

            cargarDatosForm( lista, idPersonaSeleccionada );

        });


    } else {
        console.log( 'tr null' );
    }

}

const cargarDatosForm = ( lista, id ) => {
    
    for (const anuncio_auto of lista) {
        
        if( anuncio_auto.id === id ) {

            txtId.value = anuncio_auto.id;
            txtTitulo.value = anuncio_auto.titulo;
            rdoTransaccion.value = anuncio_auto.transaccion;
            txtDescripcion.value = anuncio_auto.descripcion;
            numbPrecio.value = anuncio_auto.precio;
            numbPuertas.value = anuncio_auto.num_puertas;
            numbKMs.value = anuncio_auto.num_KMs;
            numbPotencia.value = anuncio_auto.potencia;

            // Lógica: Si toco algún tr de la tabla, el botón de alta desaparece, aparece el input del ID ( deshabilitado ), el botón de baja y modificar con todos los datos de la persona seleccionada.
            labelId.classList.remove( 'desaparecer' );
            txtId.classList.remove( 'desaparecer' );

            botonAlta.classList.add( 'desaparecer' );

            botonBaja.classList.remove( 'desaparecer' );
            botonModificar.classList.remove( 'desaparecer' );

            // console.log( anuncio_auto );

            break;
        }

    }

};


export default crearTabla;