const { createApp } = Vue;

let app = createApp({
    data() {
        return {
          altoPorcentaje: '',
          bajoPorcentaje: '',
          porcMasCapacidad: '',
          segundaTabla: '',
          terceraTabla: '',
          datos: []

        }
    },
    created() {
      this.datos = [];
      this.currentDate = null;
      fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((response) => response.json())
      .then((data) => {
      this.datos = data.events;
      this.currentDate = data.currentDate;
      
      this. pastEvents = this.pastFilter(datos, currentDate);
      this.upEvents = this.UpFilter(datos, currentDate);
      console.log(this.pastEvents)
      console.log(this.upEvents)
      this.categorias = this.allEvents.map(item => item.category)
      this.filtroCategorias = [...new Set(this.categorias)]
      this.altoPorcentaje = altoPorcentaje(this.pastEvents)
      this.bajoPorcentaje = bajoPorcentaje (this.pastEvents)
      this.porcMasCapacidad = porcMasCapacidad (this.datos)

      this.segundaTabla = this.upComing(this.upEvents)
      this.terceraTabla = this.pastTabla(this.pastEvents)

    }) 
    .catch((error) => console.log(error)); 
    },
    methods: {
         altoPorcentaje(eventos) {
            let inicio = 0;
            let eventoAltoPorcentaje;
            for (let evento of eventos) { 
              let asisistencia = (evento.assistance * 100) / evento.capacity;
              if (asisistencia > inicio) {
                inicio = asisistencia;
                eventoAltoPorcentaje = evento;}
              }
              return `${eventoAltoPorcentaje.name}, ${asistencia.toFixed(1)}%`
            },
        bajoPorcentaje(eventos) {
            let eventoMasBajo = 0;
            let eventoBajoPorcentaje;
            for (let evento of eventos) {
                let asisistencia = (evento.assistance * 100) / evento.capacity;
                 if (eventoMasBajo === 0 || asisistencia < eventoMasBajo) {
                 eventoMasBajo = asisistencia;
                 eventoBajoPorcentaje = evento;
             }
            }
        return `${eventoBajoPorcentaje.name}, ${eventoMasBajo.toFixed(1)}`
        },
        porcMasCapacidad(eventos) {
            let inicio = 0;
            let eventosMasCapacidad;
            for (let evento of eventos) {
              if (evento.capacity > inicio) {
                inicio = evento.capacity;
                eventosMasCapacidad = evento;
              }
             }
             return `${eventosMasCapacidad.name}, ${inicio.toFixed(1)}`
            },
            //SEGUNDA TABLA
             upComing(eventos) {
                let datosCompletosUp = [];
                let upCategorias = Array.from( new Set(eventos.map((evento) => evento.category)));
                
                let ingresosUp = [];
                for (let category of upCategorias) {
                  let upContador = 0;
                  for (let evento of eventos) {
                      if (evento.category == category) {
                        upContador += evento.estimate * evento.price;
                      }
                    }
                    ingresosUp.push(upContador);
                }
                
                let porcenDeAsis = [];
                for (let category of upCategorias) {
                let estimadoUp = 0;
                let capacidad = 0;
                for (let evento of eventos) {
                  if (evento.category === category) {
                    estimadoUp += evento.estimate;
                    capacidad += evento.capacity;
                  }
                 }
                  porcenDeAsis.push((estimadoUp * 100) / capacidad);
                }
                
                  datosCompletosUp.push(upCategorias, ingresosUp, porcenDeAsis);
                  return datosCompletosUp;
                },

                upComing(eventos) {
                  let datosCompletosUp = [];
                  let upCategorias = Array.from( new Set(eventos.map((evento) => evento.category)));
                  
                  let ingresosUp = [];
                  for (let category of upCategorias) {
                    let upContador = 0;
                    for (let evento of eventos) {
                        if (evento.category == category) {
                          upContador += evento.estimate * evento.price;
                        }
                      }
                      ingresosUp.push(upContador);
                  }
                  
                  let porcenDeAsis = [];
                  for (let category of upCategorias) {
                  let estimadoUp = 0;
                  let capacidad = 0;
                  for (let evento of eventos) {
                    if (evento.category === category) {
                      estimadoUp += evento.estimate;
                      capacidad += evento.capacity;
                    }
                   }
                    porcenDeAsis.push((estimadoUp * 100) / capacidad);
                  }
                  
                    datosCompletosUp.push(upCategorias, ingresosUp, porcenDeAsis);
                    return datosCompletosUp
                
                let template = ``
                for (let i = 0; i < datosCompletosUp[0].length; i++){
                template += `
                <tr>
                <td>${datosCompletosUp[0][i]}</td>
                <td>$${datosCompletosUp[1][i].toLocaleString()}</td>
                <td>${datosCompletosUp[2][i].toFixed(2)}%</td>
                </tr>`
        }
        return template
        },
        pastTabla(eventos) {
          let datosCompletosPast = [];
          let pastCategorias = Array.from(new Set(eventos.map((evento) => evento.category)));
          let ingresosPast = [];
          for (let category of pastCategorias) {
            let contadorPast = 0;
            for (let evento of eventos) {
              if (evento.category == category) {
                  contadorPast += evento.assistance * evento.price;
                }
              }
              ingresosPast.push(contadorPast);
          }
          
          let porcenDeAsis = [];
          for (let category of pastCategorias) {
          let estimadoPast = 0;
          let capacidad = 0;
          for (let evento of eventos) {
            if (evento.category === category) {
              estimadoPast += evento.assistance;
              capacidad += evento.capacity;
              }
            }
            porcenDeAsis.push((estimadoPast * 100) / capacidad);
           } 
           datosCompletosPast.push(pastCategorias, ingresosPast, porcenDeAsis);
          return datosCompletosPast;
          
          let datosPastTabla = pastTabla(pastEvents);

          let template2 = ``
          for (let i = 0; i < datosPastTabla[0].length; i++) {
          template2 += `
          <tr>
          <td>${datosPastTabla[0][i]}</td>
          <td>$${datosPastTabla[1][i].toLocaleString()}</td>
          <td>${datosPastTabla[2][i].toFixed(2)}%</td>
          </tr>`;
}
        return template2 


      }
    }
})
app.mount('#app')