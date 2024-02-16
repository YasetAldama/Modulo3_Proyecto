const alumnos = [
      {
      "id": 1,
      "nombre": "Liam", 
      "apellido": "Aldama", 
      "edad": 12, 
      "asignaturas": [{"materia": 'español', 'calificacion': 10}, {"materia": 'ingles', 'calificacion': 9}] 
   },
   {
      "id": 1,
      "nombre": "Liam", 
      "apellido": "Martinez", 
      "edad": 12, 
      "asignaturas": [{"materia": 'español', 'calificacion': 10}, {"materia": 'ingles', 'calificacion': 9}] 
   },
   {
      "id": 2,
      "nombre": "Azul", 
      "apellido": "Aldama", 
      "edad": 8, 
      "asignaturas": [{"materia": 'español', 'calificacion': 10}, {"materia": 'ingles', 'calificacion': 10}, {"materia": 'arte', 'calificacion': 10}] 
   },
   {
      "id": 1,
      "nombre": "Leonel", 
      "apellido": "Pliego", 
      "edad": 12, 
      "asignaturas": [{"materia": 'español', 'calificacion': 7}, {"materia": 'ingles', 'calificacion': 6}, {"materia": 'arte', 'calificacion': 8}] 
   },
   {
      "id": 3,
      "nombre": "Manuel", 
      "apellido": "Muciño", 
      "edad": 8, 
      "asignaturas": [{"materia": 'español', 'calificacion': 5}, {"materia": 'ingles', 'calificacion': 8}, {"materia": 'arte', 'calificacion': 9}] 
   },
   {
      "id": 4,
      "nombre": "Ian", 
      "apellido": "Zurita", 
      "edad": 12, 
      "asignaturas": [{"materia": 'español', 'calificacion': 8}, {"materia": 'ingles', 'calificacion': 7}, {"materia": 'arte', 'calificacion': 7}] 
   },
];

localStorage.setItem('alumnos', JSON.stringify(alumnos));
let alumnosClase = []; 

function reset() {
   var allInputs = document.querySelectorAll('input');
   allInputs.forEach(singleInput => singleInput.value = '');
}

function submitAlta() {
   let name = document.getElementById('nombre').value;
   let lastName = document.getElementById('apellido').value;
   let age = document.getElementById('edad').value;
   // checar si name y last
   let newObj = {
      "nombre": name,
      "apellido": lastName,
      "edad": age,
      "asignaturas": []
   }

   alumnos.push(newObj);
   document.getElementById('msj').innerHTML = 'Se agrego correctamente';
   reset();
   localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function addClase() {
   let findAlumno = document.getElementById('alumno').value;
   let calif = document.getElementById('calif').value;
   let asignatura = document.getElementById('clase').value;
   const obj = alumnos.find(alumno => alumno.nombre === findAlumno);
   // validacion de alumno
   if(obj == undefined) {
      document.getElementById('msj').innerHTML = 'No se encontró al alumno';
      return false;
   }
   // validacion de materia para no repetir y si ya existe actualizar calif
   const newClase = {
      "materia": asignatura,
      "calificacion": calif
   };
   if (obj.asignaturas.length === 0) { 
      obj.asignaturas.push(newClase);
   }
   obj.asignaturas.map((clase) => {
      if(clase.materia == asignatura){
        clase.calificacion = calif;
      }
      return clase;
   });
   document.getElementById('msj').innerHTML = 'Se agrego correctamente';
   localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function searchAlumno() {
   const filtro = document.getElementById('filtroAlumno');
   filtro.innerHTML += "  ";

   let inputAlumno = document.getElementById('buscarAlumno').value;
   let lastName = inputAlumno.slice(inputAlumno.indexOf(' ') + 1);
   let name = inputAlumno.slice(0, inputAlumno.indexOf(' '));
   let nombre = alumnos.filter(alumno => alumno.nombre === name);
   
   if(!nombre) {
      alert('El nombre no es correcto o no existe');
      return false;
   }
   let alumno = nombre.filter(alumno => alumno.apellido === lastName);

   if(!alumno) {
      alert('El apellido no es correcto o no existe');
      return false;
   }

   if( alumno[0].asignaturas.length == 0) {
      alert('No está inscrito en ninguna clase');
      return false;
   }

   const materias =  alumno[0].asignaturas.map((mat) => {
         let result = `<br>` + mat.materia + " " + mat.calificacion ;
         return result
      });
   const printName = `<h2>` + alumno[0].nombre + " " + alumno[0].apellido +`</h2>`;
   const printClasses = `<span>` + materias +`</span>`;
   filtro.innerHTML+= printName + printClasses;
}

function buscarMateria() {
   let listaGrupo = document.getElementById('materia').value;

   alumnos.map((alumno) => {
      console.log('alumno', alumno)
      let materia = alumno.asignaturas.filter(elem => elem.materia === listaGrupo);
      if(materia.length != 0) {
         let obj = [
            alumno.nombre + " " + alumno.apellido,
            " " + materia[0].calificacion,
         ];
         return alumnosClase.push(obj);
         localStorage.setItem('alumnosClase', JSON.stringify(alumnosClase));
      }
   }); 
   printList(alumnosClase);
}

function printList(lista) {
   document.getElementById('grupo').innerHTML = "";

   let list = lista || window.localStorage.alumnosClase;
   const grupo = document.getElementById('grupo');

   list.map((alumno) => {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(alumno));
      grupo.appendChild(li);
   });
}

function sortAbc() {
   let list = alumnosClase || window.localStorage.alumnosClase;
   list.sort();
   printList(list);
}

function sortNum() {
   let list = alumnosClase || window.localStorage.alumnosClase;
   list.sort((a, b) => a[1] - b[1]);
   printList(list);
}
