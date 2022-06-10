'use strict';

import {doctores} from '../utils/doctores.js';
import {especialidades} from '../utils/especialidades.js';
import {sedes} from '../utils/sedes.js';

const listarDoctores = (doctores)=>{
    
    const doctoresContenedor = document.querySelector('#doctoresContenedor');
    doctoresContenedor.innerHTML='';
    doctores.forEach((element) => {
        doctoresContenedor.innerHTML += `
        <div class="col-md-3">
            <article class="card">
            <img src="${element.enlace}"
                class="card-img-top" alt="Imagen doctor">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.cmp}</p>
                <p class="card-text">Sede: ${element.sede.nombre}</p>
                <p class="card-text">Especialidad: ${element.especialidad.nombre}</p>
                <a href="#" class="btn btn-primary rounded-pill">Ver horarios</a>
            </div>
            </article>
        </div>
    `
    });
}

const listarEspecialidades = ()=>{
    
    const cmbEspecialidades = document.querySelector('#cmbEspecialidades');
    especialidades.forEach((element) => {
        cmbEspecialidades.innerHTML += `
        <option value="${element.id}">${element.nombre}</option>
        `
        });
}

const listarSedes = ()=>{
    
    const cmbSedes = document.querySelector('#cmbSedes');
    sedes.forEach((element) => {
        cmbSedes.innerHTML += `
        <option value="${element.id}">${element.nombre}</option>
        `
        });
}

const documentReady = () => {

    const btnBuscar=document.querySelector('#btnBuscar');
    
    
    listarDoctores(doctores);
    listarEspecialidades();
    listarSedes();

    const buscadorMedico = ()=>{

        const sede=document.querySelector('#cmbSedes').value == '' ? 0 : parseInt(document.querySelector('#cmbSedes').value);
        const especialidad=document.querySelector('#cmbEspecialidades').value=='' ? 0 : parseInt(document.querySelector('#cmbEspecialidades').value);
        const nombreMedico=document.querySelector('#txtNombreMedico').value;


        if(sede===0 && especialidad===0 && nombreMedico==='')
        {
            listarDoctores(doctores);
            return;
        }
        

        const doctoresBuscados = doctores.filter((element) => {

            if(sede!=0){

                return  especialidad!=0 ?   

                                nombreMedico!='' ? (element.sede.id===sede && element.especialidad.id===especialidad && element.nombre.toLowerCase().includes(nombreMedico.toLowerCase()))
                                        
                                        : (element.sede.id===sede && element.especialidad.id===especialidad)
                                
                            : (element.sede.id==sede);


            }else if(especialidad!=0){

                return  nombreMedico!=''?  (element.especialidad.id===especialidad && element.nombre.toLowerCase().includes(nombreMedico.toLowerCase())):  (element.especialidad.id===especialidad );

            }else {
                return element.nombre.toLowerCase().includes(nombreMedico.toLowerCase());

            }

        });

        doctoresBuscados.length>0 ? listarDoctores(doctoresBuscados) : window.alert('No se encontraron resultados');

    }

    btnBuscar.addEventListener('click',buscadorMedico)
}

document.addEventListener('DOMContentLoaded', documentReady);