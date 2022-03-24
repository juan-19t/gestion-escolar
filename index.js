var body = document.getElementsByTagName("body");
var materia = document.getElementById("materia");
var nota1 = document.getElementById("nota1");
var nota2 = document.getElementById("nota2");
var nota3 = document.getElementById("nota3");

var nombreAlumno = document.getElementById("nombre");
var dni = document.getElementById("dni");
var fecha = document.getElementById("fecha");
var curso = document.getElementById("curso");

let botonAgregar = document.getElementById("agregar-nuevo");
botonAgregar.style.display='none';
let spinner = document.getElementById("spinner");


let listaDeMaterias = [];
var materiasAprobadas = [];
var materiasDesaprobadas=[];


class Alumno {
    
    constructor (nombreAlumno,dni,fecha,curso,materias){
        this.nombreAlumno = nombreAlumno;
        this.dni = dni;
        this.fecha = fecha;
        this.curso = curso;
        this.materias = materias;
    }
    calcularPromedioAnual () {
        return (this.materias.reduce((acum, materia) => 
        acum + parseFloat(materia.promedio), 0)/this.materias.length).toFixed(2);
    }
     
}
    var alumno;

class Materia{
    constructor (materia,nota1,nota2 ,nota3){
    this.materia = materia;
    this.nota1 = nota1;
    this.nota2  = nota2; 
    this.nota3 = nota3;
    this.promedio = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) /3).toFixed(2);
    }
}
var materia2; 

// Funciones globales
function limpiarElemento(el){
    return el.style.visibility="hidden";
};

function calcularPromedioAnual (lista) {
    let promedios = lista.map((item)=>parseFloat(item.promedio));
    let acum = 0;

    for(let i = 0;i<promedios.length;i++){
        acum+=promedios[i];
    }
    return (acum/lista.length).toFixed(2);
};

// Declaracion de variables para el formulario de los datos del alumno
let tabla = document.getElementById("tabla");
let primerHilera = document.getElementById("primerHilera");
let botonGuardarAlumno = document.getElementById("boton");
let hileraConReferencias = document.createElement("tr");
let ultimaHilera = document.createElement("tr");
const formularioDatos = document.getElementById("formulario-datos");

// Recopilacion de valores de los input y funcionalidad del submit
formularioDatos.addEventListener("submit",(e)=>{
e.preventDefault();
 
    const nombreAlumno = document.getElementById("nombre").value;
    const dni = document.getElementById("dni").value;
    const fecha = document.getElementById("fecha").value;
    const curso = document.getElementById("curso").value;

    if(nombreAlumno==""||dni==""||fecha==""||curso==""){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Olvidaste completar un campo',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
    alumno = new Alumno(nombreAlumno,dni,fecha,curso,listaDeMaterias);
    
    botonGuardarAlumno.style.display="none";
    formularioDatos.style.display="none";
    spinner.style.visibility="visible";
    setTimeout(()=>{limpiarElemento(spinner);},2000);
    setTimeout(()=>{
        hileraConReferencias.innerHTML=`
            <th scope="col" id="nombre1">${alumno.nombreAlumno}</th>
            <th scope="col">Materias</th>
            <th scope="col">Primer trimestre</th>
            <th scope="col">Segundo Trimestre</th>
            <th scope="col">Tercer trimestre</th>
            <th scope="col">Promedio por materia</th>
`;
    primerHilera.appendChild(hileraConReferencias);
    formulario.style.display="flex";
    guardarCambios.style.display="flex";
    },2000);
    
}});
// Recopilacion de valores de los inputs en el formulario de materias y notas y funcionalidad del submit
const formulario = document.getElementById("formulario");
formulario.style.display="none";
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();

    const materia = document.getElementById("materia").value;
    const nota1 = document.getElementById("nota1").value;
    const nota2 = document.getElementById("nota2").value;
    const nota3 = document.getElementById("nota3").value;
    const promedio = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) /3).toFixed(2);
    
   if(materia=="" || nota1==""|| nota2=="" || nota3==""){

    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Olvidaste completar un campo',
        showConfirmButton: false,
        timer: 1500
      })
       
    }else{ 
    materia2 = new Materia(materia,nota1,nota2,nota3);
    listaDeMaterias.push(materia2);
    

    tabla.innerHTML = '';
for (discpilina of listaDeMaterias){
    let hilera = document.createElement("tr");
        hilera.innerHTML = `
                
                    <th scope="row" class="table-secondary" ></th>
                    <td class="table-secondary">${discpilina.materia}</td>
                    <td class="table-secondary">${discpilina.nota1}</td>
                    <td class="table-secondary">${discpilina.nota2}</td>
                    <td class="table-secondary">${discpilina.nota3}</td>
                    <td class="table-secondary">${discpilina.promedio}</td>
                    
                    `;  

        tabla.appendChild(hilera);
}

        ultimaHilera.innerHTML= `
            <tr>
                <th scope="row" class="table-secondary">Promedio final</th>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="fw-bold table-secondary">${alumno.calcularPromedioAnual()}</td>
            </tr>
        `;
        tabla.appendChild(ultimaHilera);

        
}});


// Acciones del boton "guardar cambios"
const guardarLocal = (clave,valor) => {localStorage.setItem(clave,valor)};
let select = document.getElementById("select");


let guardarCambios = document.getElementById("guardar-cambios");
guardarCambios.style.display="none";
guardarCambios.onclick = () => {

    listaDeAlumnos3.push(alumno);
    guardarLocal("alumnos",JSON.stringify(listaDeAlumnos3));
    
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se almacenaron los cambios.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{location.reload();},1500);
}




// Extraccion de datos del localStorage para mostrarlos en un "select"
const listaDeAlumnos2 =  JSON.parse(localStorage.getItem("alumnos"));
let listaDeAlumnos3= new Array().concat(listaDeAlumnos2);
if (listaDeAlumnos2) { 
    listaDeAlumnos2.shift();
    listaDeAlumnos2.forEach(alumno => {
    select.innerHTML += `<option value="${alumno.dni}">${alumno.nombreAlumno}</option>`;
    });
}

 // Evento para mostrar en pantalla datos, materias y notas del alumno seleccionado en el select
select.addEventListener('change',(e)=>{
    const resultado = listaDeAlumnos2.find( alumno => alumno.dni === event.target.value );
    
    formularioDatos.style.display="none";
    botonAgregar.style.display="flex";
    hileraConReferencias.innerHTML=`
            <th scope="col" id="nombre1">${resultado.nombreAlumno}</th>
            <th scope="col">Materias</th>
            <th scope="col">Primer trimestre</th>
            <th scope="col">Segundo Trimestre</th>
            <th scope="col">Tercer trimestre</th>
            <th scope="col">Promedio por materia</th>
`;
    primerHilera.appendChild(hileraConReferencias);
    tabla.innerHTML = '';
    for (materia of resultado.materias){
        let hilera = document.createElement("tr");
    hilera.innerHTML = `
                
                    <th scope="row" class="table-secondary"></th>
                    <td class="table-secondary">${materia.materia}</td>
                    <td class="table-secondary">${materia.nota1}</td>
                    <td class="table-secondary">${materia.nota2}</td>
                    <td class="table-secondary">${materia.nota3}</td>
                    <td class="table-secondary">${materia.promedio}</td>
                    
                    `;  

        tabla.appendChild(hilera);
    }
   

                ultimaHilera.innerHTML= `
            
                <th scope="row" class="table-secondary">Promedio final</th>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="table-secondary"></td>
                <td class="fw-bold table-secondary">${calcularPromedioAnual(resultado.materias)}</td>
            
        `;
        tabla.appendChild(ultimaHilera);
        
    
        
});
//
botonAgregar.onclick = () => {
    location.reload();
}


// Presentacion con informacion traida desde el documento JSON
let presentacion = document.getElementById('presentacion');
let containerPresentacion= document.getElementById('container__presentacion');

fetch('./back.json')
.then((resp)=> resp.json())
.then((data)=>{

    data.forEach((datos)=>{
        presentacion.innerHTML+=`
                    <h1> Hola! Bienvenido al sistema de gestion escolar del colegio: </h1>
                    <h1>${datos.nombreEscuela}</h1>
                    <h1>${datos.numero}</h1>
        `;                  
    })
});
setTimeout(()=>{limpiarElemento(containerPresentacion);},3000);





 
    
 
    
    


    


    