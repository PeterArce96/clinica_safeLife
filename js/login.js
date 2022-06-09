
const URL_BASE='https://proyecto-clinica.herokuapp.com/usuario/';
let myModal = new bootstrap.Modal(document.getElementById('modalRegistroLogin'), { keyboard: false});

const getFormData = () => {

    const documentformCita = document.forms['frmLogin'];
    const email = documentformCita['email'].value;
    const password = documentformCita['password'].value;

    return ({ email, password });

  };

  const validateForm = () => {
    const documentformCitaRegistro = document.forms['frmLogin'];
    const email = documentformCitaRegistro['email'].value;
    const password = documentformCitaRegistro['password'].value;
    return [email.trim(), password.trim()].includes('');
  };

  const validateFormUsuario = () => {
    const frmFormularioUsuario = document.forms['frmFormularioUsuario'];
    const email = frmFormularioUsuario['email_'].value;
    const password = frmFormularioUsuario['password_'].value;
    const nombre = frmFormularioUsuario['nombre_'].value;
    const apellido = frmFormularioUsuario['apellido_'].value;
    const edad = frmFormularioUsuario['edad_'].value;
    return [email.trim(), password.trim(),nombre.trim(),apellido.trim(),edad.trim()].includes('');
  };

  const resetFormUsuario = () => {

    const frmFormularioUsuario = document.forms['frmFormularioUsuario'];
    frmFormularioUsuario['email_'].value='';
    frmFormularioUsuario['password_'].value='';
    frmFormularioUsuario['nombre_'].value='';
    frmFormularioUsuario['apellido_'].value='';
    frmFormularioUsuario['edad_'].value='';
    
  };

  const getForm=()=>{
    const frmFormularioUsuario = document.forms['frmFormularioUsuario'];
    const email = frmFormularioUsuario['email_'].value;
    const password = frmFormularioUsuario['password_'].value;
    const nombre = frmFormularioUsuario['nombre_'].value;
    const apellido = frmFormularioUsuario['apellido_'].value;
    const edad = frmFormularioUsuario['edad_'].value;

    return ({ email, password,nombre,apellido,edad });
  }

  const registroUsuario= async ()=>{


    if(validateFormUsuario()){

      Swal.fire({
        icon: 'error',
        text: 'Debes completar todos los campos',
      });

    }else{

      const { email, password,nombre,apellido,edad } = getForm();

      if(!validarEmail(email)){

        Swal.fire({
          icon: 'error',
          text: 'El formato de email no es valido',
        });

        return;
      }

      if(await validarUsuarioRepetido(email)){

        Swal.fire({
          icon: 'error',
          text: 'El correo electronico ya existe, por favor ingresa otro',
        });

      }else{


        const usuario =   {
          "usuario": email,
          "contrasenia": password,
          "paciente": {
              "nombre": nombre,
              "apellido": apellido,
              "edad": edad
          }
      }
  
      const resp= await fetch(`${URL_BASE}crear`,
      {
           body: JSON.stringify(usuario),
           method: "POST",
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      });
      const data= await resp.json();
  
      Swal.fire({
        icon: 'success',
        title: 'Creado correctamente',
        showConfirmButton: true
      }).then((result) => {
          if (result.isConfirmed) {
  
            resetFormUsuario();
            myModal.hide();
  
          } 
      });

      
      }

    }

  }

  const validarAcceso=async()=>{

    const {email,password}=getFormData();

    const entity={
        "usuario": email,
        "contrasenia":password
    };

    const resp= await fetch(`${URL_BASE}acceso`,
    {
         body: JSON.stringify(entity),
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    });
    let data= await resp.json();
    data=Number(data);

    if(data!=0){

        window.history.back();
        window.history.go(-1);
        window.location.replace(`./Citas.html?id=${data}`);

    }else{
        Swal.fire({
            icon: 'error',
            text: 'Usuario y/o contraseña incorrectos',
          });
    }

  }

  const validarEmail=(valor)=> {

    console.log(valor);

    let re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(valor)){

      return false;
    }else{

    return true;
    }

  }

  const validarUsuarioRepetido= async (usuario)=>{

    const resp= await fetch(`${URL_BASE}validar/${usuario}`)
    const existe= await resp.json();
    console.log(existe);
    return Boolean(existe);
    
  }

  const login=()=>{

    if(validateForm()){

        Swal.fire({
            icon: 'error',
            text: 'Debes ingresar el usuario y contraseña',
          });

    }else{

        validarAcceso();
        
    }
  }
  const documentReady = () => {

    const btnLogin= document.querySelector('#btnLogin');
    const btnRegistro= document.querySelector('#btnRegistro');

    //let deletingAll = browser.history.deleteAll();

    btnLogin.addEventListener('click',login);
    btnRegistro.addEventListener('click',registroUsuario);
   // txtEmailregistro.addEventListener('blur',validarUsuarioRepetido);
    
 }

document.addEventListener('DOMContentLoaded', documentReady);