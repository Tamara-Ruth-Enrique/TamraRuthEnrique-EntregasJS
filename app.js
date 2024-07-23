document.addEventListener('DOMContentLoaded', () => {
    class CalculadoraPromedios {
        constructor() {
            this.numeros = [];
            this.app = document.getElementById('app');
            this.crearInterfaz();
        }

        async cargarDatos() {
            try {
                const response = await fetch('data.json');
                const data = await response.json();
                this.numeros = data.numbers;
                this.actualizarLista();
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        }

        crearInterfaz() {
            this.app.innerHTML = `
                <div class="container">
                    <h1>Calculadora de Promedios</h1>
                    <input type="number" id="numero" placeholder="Ingresa un número">
                    <button id="agregarNumero">Agregar Número</button>
                    <button id="calcularPromedio">Calcular Promedio</button>
                    <button id="reiniciar">Reiniciar</button>
                    <button id="cargarDatos">Cargar Datos</button>
                    <h2>Números: <span id="numeros"></span></h2>
                    <h2>Promedio: <span id="promedio"></span></h2>
                </div>
            `;

            document.getElementById('agregarNumero').addEventListener('click', () => this.agregarNumero());
            document.getElementById('calcularPromedio').addEventListener('click', () => this.calcularPromedio());
            document.getElementById('reiniciar').addEventListener('click', () => this.reiniciar());
            document.getElementById('cargarDatos').addEventListener('click', () => this.cargarDatos());
        }

        agregarNumero() {
            const numero = parseFloat(document.getElementById('numero').value);
            if (!isNaN(numero)) {
                this.numeros.push(numero);
                this.actualizarLista();
                document.getElementById('numero').value = '';
            }
        }

        calcularPromedio() {
            if (this.numeros.length === 0) {
                alert('No hay números para calcular el promedio.');
                return;
            }
            const suma = _.sum(this.numeros);
            const promedio = suma / this.numeros.length;
            document.getElementById('promedio').innerText = promedio.toFixed(2);
        }

        reiniciar() {
            this.numeros = [];
            this.actualizarLista();
            document.getElementById('promedio').innerText = '';
        }

        actualizarLista() {
            document.getElementById('numeros').innerText = this.numeros.join(', ');
        }
    }

    const calculadora = new CalculadoraPromedios();
});