const { createApp } = Vue;
createApp({
  data() {
    return { //REACTIVAS
      selectecionadoCheckbox: [],
      textoIngresado: "",
      eventosApp: [],
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.eventosApp = data.events;
        console.log(this.eventosApp);
      })
      .catch((error) => console.error(error));
  },

  computed: {
    eventosFiltrados() {
      let filteredData = this.eventosApp;
      if (this.selectecionadoCheckbox.length > 0) {
        filteredData = filteredData.filter((evento) => this.selectecionadoCheckbox.includes(evento.category));
      }
      if (this.textoIngresado) {
        filteredData = filteredData.filter((evento) => evento.name.toLowerCase().includes(this.textoIngresado.toLowerCase())
        );
      }
      return filteredData;
    },

    categoriasCheckbox() {
      if (!this.eventosApp) {
        return [];
      }
      const categorias = this.eventosApp.map((item) => item.category);
      return [...new Set(categorias)];
    },
  },
}).mount("#app");