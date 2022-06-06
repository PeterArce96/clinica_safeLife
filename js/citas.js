
let URL_BASE="http://localhost:8082/";
let idCita=0;
let myModal = new bootstrap.Modal(document.getElementById('modalCita'), {
    keyboard: false
  });

const getFormData = () => {
    const documentFormPokemon = document.forms['formPokemon'];
    const id = documentFormPokemon['id'].value;
    const nombre = documentFormPokemon['nombre'].value;
    const tipo = documentFormPokemon['tipo'].value;
    const hp = documentFormPokemon['hp'].value;
    const ataque = documentFormPokemon['ataque'].value;
    const especial = documentFormPokemon['especial'].value;
    const urlImagen = documentFormPokemon['url-imagen'].value;
  
    return ({ id, nombre, tipo, hp, ataque, especial, urlImagen });
  };



const getCita= async (id)=>{

    const documentFormCita = document.forms['formCita'];

    const res= await fetch(`${URL_BASE}cita/buscar/${id}`).then();
    const data= await res.json();

    const {doctor,especialidad,fechacita,hora}=data;

    documentFormCita['id'].value='';
    documentFormCita['doctor'].value=doctor.id;
    documentFormCita['especialidad'].value=especialidad.id;
    documentFormCita['fecha'].value=fechacita;
    documentFormCita['hora'].value=hora;

    myModal.show();
}

const calendario=(eventos)=>{

    $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        locale: 'es',
        defaultDate: '2022-06-05',
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
   const res=  await fetch(`http://localhost:8082/cita/listar/${idPaciente}`);
   const t= await res.json();
   t.forEach(cita=>{

    console.log(cita);
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

const deleteCita= async ()=>{

 
    console.log("id_:"+idCita);

    const res= await fetch(`${URL_BASE}cita/eliminar/${idCita}`).then(console.log);

    console.log("eliminado correctamente");

    getCitas(1); 
    myModal.hide();
}

$(document).ready(function() {

    getCitas(1); 
    
    const btnCerrarSesion=document.querySelector("#btnCerrarSesion");
    const btnModificar=document.querySelector("#btnModificar");
    const btnEliminar=document.querySelector("#btnEliminar");

    btnModificar.addEventListener('click',()=>{


    });

    btnEliminar.addEventListener('click',deleteCita);

    btnCerrarSesion.addEventListener('click',()=>{

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ml-2'
            },
            buttonsStyling: false
            })

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
                );


            } 
            })

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


           
    
     });


 /*   {
              id:4,
            title: 'Click for Google',
            url: 'https://google.com/',
            start: '2022-06-28',
            end: '2022-06-10'
        } 
*/