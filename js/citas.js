
'use strict';

let URL_BASE="https://proyecto-clinica.herokuapp.com/";
let idCita=0;
let idPaciente=0;
let idUsuario=1;
let myModal = new bootstrap.Modal(document.getElementById('modalCita'), { keyboard: false});
const swalWithBootstrapButtons = Swal.mixin({
customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger ml-2'
},
buttonsStyling: false
});


const getMedicos= async ()=>{

    const cmbDoctor=document.querySelector("#cmbDoctor");
    const cmbDoctorRegistro=document.querySelector("#cmbDoctorRegistro");

    const res=  await fetch(`${URL_BASE}doctor/listar`);
    const t= await res.json();

    cmbDoctor.innerHTML = "<option value=''></option>";
    cmbDoctorRegistro.innerHTML="<option value=''></option>";

    t.forEach(doctor=>{
        const {id,nombre,apellido}=doctor;
        let nombreCompleto= nombre +" "+apellido;
        cmbDoctor.innerHTML += `<option value='${id}'>${nombreCompleto}</option>`;
        cmbDoctorRegistro.innerHTML += `<option value='${id}'>${nombreCompleto}</option>`;
     });

}


const getEspecialidades= async ()=>{

    const cmbEspecialidad=document.querySelector("#cmbEspecialidad");
    const cmbEspecialidadRegistro=document.querySelector("#cmbEspecialidadRegistro");

    const res=  await fetch(`${URL_BASE}especialidad/listar`);
    const t= await res.json();

    cmbEspecialidad.innerHTML = "<option value=''></option>";
    cmbEspecialidadRegistro.innerHTML = "<option value=''></option>";

    t.forEach(especialidad=>{
        const {id,nombre}=especialidad;
        cmbEspecialidad.innerHTML += `<option value='${id}'>${nombre}</option>`;
        cmbEspecialidadRegistro.innerHTML += `<option value='${id}'>${nombre}</option>`;
     });

}

const getUsuario= async (idUsuario)=>{

    const res=  await fetch(`${URL_BASE}usuario/buscar/${idUsuario}`);
    const t= await res.json();
    
    const {id,usuario,paciente}=t;
  
    const nombreCompleto=paciente.nombre+' '+paciente.apellido;
    document.querySelector("#navNombreUsuario").innerHTML=nombreCompleto.toUpperCase();
    

    idPaciente=id;
    document.querySelector("#txtIdUsuario").value=id;
    document.querySelector("#txtNombreUsuario").value=paciente.nombre;
    document.querySelector("#txtApellidosUsuario").value=paciente.apellido;
    document.querySelector("#txtEdad").value=paciente.edad;
    document.querySelector("#txtCorreoElectronico").value=usuario;

    getCitas(id); 
}


const getFormDataRegistro = () => {

    const documentformCitaRegistro = document.forms['frmRegistroCita'];
    const id = 0;
    const doctor = documentformCitaRegistro['doctor_'].value;
    const especialidad = documentformCitaRegistro['especialidad_'].value;
    const fecha = documentformCitaRegistro['fecha_'].value;
    const hora = documentformCitaRegistro['hora_'].value;

   /* let fecha_formateada = new Date(fecha);

    let day = fecha_formateada.getDate()+2;
    let month = fecha_formateada.getMonth() + 1;
    let year = fecha_formateada.getFullYear();

    if(month < 10){
        fecha_formateada=`${year}-0${month}-${day}`;
      }else{
        fecha_formateada=`${year}-${month}-${day}`;
      }
    
    fecha=fecha_formateada;
    console.info(fecha_formateada);*/
    return ({ id, doctor, especialidad, fecha, hora });

  };

  const resetFormDataRegistro = () => {

    const documentformCitaRegistro = document.forms['frmRegistroCita'];
    documentformCitaRegistro['doctor_'].value='';
    documentformCitaRegistro['especialidad_'].value='';
    documentformCitaRegistro['fecha_'].value='';
    documentformCitaRegistro['hora_'].value='';

  };


const getFormData = () => {

    const documentformCita = document.forms['formCita'];
    const id = documentformCita['id'].value;
    const doctor = documentformCita['doctor'].value;
    const especialidad = documentformCita['especialidad'].value;
    const fecha = documentformCita['fecha'].value;
    const hora = documentformCita['hora'].value;

   /* let fecha_formateada = new Date(fecha);

    let day = fecha_formateada.getDate()+2;
    let month = fecha_formateada.getMonth() + 1;
    let year = fecha_formateada.getFullYear();

    if(month < 10){
        fecha_formateada=`${year}-0${month}-${day}`;
      }else{
        fecha_formateada=`${year}-${month}-${day}`;
      }
    
    fecha=fecha_formateada;*/

    return ({ id, doctor, especialidad, fecha, hora });

  };

  const validateForm = () => {
    const documentformCitaRegistro = document.forms['frmRegistroCita'];
    const doctor = documentformCitaRegistro['doctor_'].value;
    const especialidad = documentformCitaRegistro['especialidad_'].value;
    const fecha = documentformCitaRegistro['fecha_'].value;
    const hora = documentformCitaRegistro['hora_'].value;
  
    return [doctor.trim(), especialidad.trim(), fecha.trim(), hora.trim()].includes('');
  };
  

const getCita= async (id)=>{

    const documentFormCita = document.forms['formCita'];

    const res= await fetch(`${URL_BASE}cita/buscar/${id}`).then();
    const data= await res.json();

    const {doctor,especialidad,fechacita,hora}=data;

    documentFormCita['id'].value=id;
    documentFormCita['doctor'].value=doctor.id;
    documentFormCita['especialidad'].value=especialidad.id;
    documentFormCita['fecha'].value=fechacita;
    documentFormCita['hora'].value=hora;

    myModal.show();
}

const calendario=(eventos)=>{

    $('#calendar').fullCalendar('destroy');
   $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        locale: 'es',
        defaultDate: new Date(),//'2022-06-05',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: eventos,
        
          eventClick: function(info) {
  
            //console.log(idCita);
            idCita=info.id;
             // console.log(idCita);
              getCita(info.id);
              
  
          }
      });
}

const getCitas= async (idPaciente)=>{

   const eventos=[];
   const res=  await fetch(`${URL_BASE}cita/listar/${idPaciente}`);
   const t= await res.json();
   t.forEach(cita=>{

        const {fechacita,hora,especialidad,id} = cita;
        let title=especialidad.nombre+' - '+hora;
        eventos.push({
            "id":id,
            "title":title,
            "start":fechacita
        });
    });
 
    calendario(eventos);
}

const deleteCita=  ()=>{


    swalWithBootstrapButtons.fire({
        title: 'Deseas eliminar esta cita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
        }).then( async (result) => {
        if (result.isConfirmed) {
            
            const res= await fetch(`${URL_BASE}cita/eliminar/${idCita}`).then(console.log);

            getCitas(idPaciente); 
            myModal.hide();
            }

        });
 
}

const updateCita= async ()=>{

    const {id,doctor,especialidad,fecha,hora} = getFormData();

    console.log(id);

    const entity={
        "id": id,
        "doctor": {
            "id": doctor
        },
        "especialidad": {
            "id": especialidad
        },
        "paciente": {
            "id": idPaciente
        },
        "fechacita": fecha,
        "hora": hora
    };

    const resp= await fetch(`${URL_BASE}cita/editar`,
    {
         body: JSON.stringify(entity),
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });

    const content= await resp.json();

    getCitas(idPaciente); 
    myModal.hide();
}

const createCita= async ()=>{

    const {id,doctor,especialidad,fecha,hora} = getFormDataRegistro(); 

    if (validateForm()) {

        showAlert('danger', 'Completar todos los campos');

      } else {
 
        const entity={
            "id": id,
            "doctor": {
                "id": doctor
            },
            "especialidad": {
                "id": especialidad
            },
            "paciente": {
                "id": idPaciente
            },
            "fechacita": fecha,
            "hora": hora
        };
    
        const resp= await fetch(`${URL_BASE}cita/crear`,
        {
            body: JSON.stringify(entity),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    
        const content= await resp.json();
    
        resetFormDataRegistro();
    
        Swal.fire({
            icon: 'success',
            title: 'Creado correctamente',
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
    
                location.reload();
    
            } 
        });

      }

}


const documentReady = () => {

    const queryString = window.location.search;
    console.log({queryString});

    const urlParams = new URLSearchParams(queryString);
    idUsuario = urlParams.get('id')
    console.log(idUsuario);


    getUsuario(idUsuario);
    getMedicos();
    getEspecialidades();
    
    const btnCerrarSesion=document.querySelector("#btnCerrarSesion");
    const btnModificar=document.querySelector("#btnModificar");
    const btnEliminar=document.querySelector("#btnEliminar");
    const btnCrearCita=document.querySelector("#btnCrearCita");

    btnModificar.addEventListener('click',updateCita);

    btnEliminar.addEventListener('click',deleteCita);

    btnCrearCita.addEventListener('click',createCita);

    btnCerrarSesion.addEventListener('click',()=>{

    swalWithBootstrapButtons.fire({
    title: 'Deseas cerrar la sesion?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {

        swalWithBootstrapButtons.fire(
        'Cerrando Sesion',
        '',
        'success'
        ).then((result)=>{
            if(result.isConfirmed){

                window.history.back();
                window.history.go(-1);
                window.location.replace(`./Login.html`);

            }
        });
    } 
    });

    });

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
        });


          
}

document.addEventListener('DOMContentLoaded', documentReady);


 /*   {
              id:4,
            title: 'Click for Google',
            url: 'https://google.com/',
            start: '2022-06-28',
            end: '2022-06-10'
        } 
*/