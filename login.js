let formElement = document.getElementById('formulario-login');
let userElement = document.getElementById('user');
let passwordElement = document.getElementById('password');
let loginError = document.getElementById('error-login')

loginError.style.display='none';
    
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    let user = userElement.value;
    let password = passwordElement.value;
    
    loginError.style.display='none';
    if(user !== '' && password !== ''){
         let match=false;

        fetch('./back.json')
        .then((resp)=> resp.json())
        .then((data)=>{

        data.forEach((datos)=>{
            if(datos.usuario===user){
                if(datos.contraseña===password){
                    match = true;
                    location.href="index.html"
                    return;
                }
            }
        })
    });
    
        if(!match){
            loginError.style.display='block';
            loginError.innerHTML= 'Datos incorrectos';
            
            }
    }else{
    loginError.style.display='block';
    loginError.innerHTML='Completar todos los campos';  
    }
});    
