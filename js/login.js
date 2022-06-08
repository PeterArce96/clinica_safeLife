
const URL_BASE='http://localhost:8082/usuario/';

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

    const { email, password,nombre,apellido,edad } = getForm();
    
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

    console.log(data);

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
    const data= await resp.json();

    if(Number(data)!=0){

        console.log("acceso");

    }else{
        Swal.fire({
            icon: 'error',
            text: 'Usuario y/o contraseña incorrectos',
          });
    }

  }

  const validarUsuarioRepetido= async (usuario)=>{

    const resp= await fetch(`${URL_BASE}validar/${usuario}`)
    const existe= await resp.json();
 
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

    btnLogin.addEventListener('click',login);
    btnRegistro.addEventListener('click',registroUsuario);
    
 }

document.addEventListener('DOMContentLoaded', documentReady);