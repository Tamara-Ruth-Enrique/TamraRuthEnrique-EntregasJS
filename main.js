function calcularPromedio(numeros) {
    const suma = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    return suma / numeros.length;
}

function mostrarPromedios(datos) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados previos

    for (let materia in datos) {
        const promedio = calcularPromedio(datos[materia]);
        const p = document.createElement('p');
        p.textContent = `El promedio de ${materia} es ${promedio.toFixed(2)}`;
        resultadosDiv.appendChild(p);
    }
}

function almacenarDatos(datos) {
    localStorage.setItem('datos', JSON.stringify(datos));
}

function recuperarDatos() {
    const datosRecuperados = localStorage.getItem('datos');
    return datosRecuperados ? JSON.parse(datosRecuperados) : null;
}

document.getElementById('formulario-datos').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const datos = {
        matematicas: document.getElementById('matematicas').value.split(',').map(Number),
        fisica: document.getElementById('fisica').value.split(',').map(Number),
        quimica: document.getElementById('quimica').value.split(',').map(Number)
    };

    mostrarPromedios(datos);
    almacenarDatos(datos);
});

// Recuperar y mostrar datos almacenados al cargar la página
window.addEventListener('load', function() {
    const datosRecuperados = recuperarDatos();
    if (datosRecuperados) {
        document.getElementById('matematicas').value = datosRecuperados.matematicas.join(',');
        document.getElementById('fisica').value = datosRecuperados.fisica.join(',');
        document.getElementById('quimica').value = datosRecuperados.quimica.join(',');
        mostrarPromedios(datosRecuperados);
    }
});
