const { createApp } = Vue;
createApp({
  data() {
    return { //REACTIVAS
        detalleId: {},
        evento: {},

    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        datos = data.events;
        console.log(datos);

        const params = new URLSearchParams(location.search);

        const nombreParam = params.get("id");

        let detalleId = datos.find((item) => item._id == nombreParam);
        this.detalleId = detalleId;        

        document.title = `Detalle de ${detalleId.name}`;
       
      })
      .catch((error) => console.error(error));
  },
}).mount("#app");