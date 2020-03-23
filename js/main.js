let app = new Vue({
  el: "#app",
  data: {
    name: "",
    gender: "",
    birthdate: "",
    intro: "",
    display: false,
    profilephoto: "",
    mood: 0,
    feelingStyle: {
      background: '',
      filter: ''
    }
  },
  methods: {
    create() {
      this.display = true;
    },
    feelingValue(e) {
      // let colorValue = (e.target.value / 10) * 225;
      let opa = parseFloat(e.target.value / 10)
      this.feelingStyle.background = `rgba(204, 255, 236, ${opa})`;
      this.feelingStyle.filter = `grayscale(${100 - opa * 100}%)`
      // bgc.style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue} )`
      // 63, 224, 208;
      //204	255	236
      
    }
  },
  computed: {
    profilepic() {
      if (this.gender === "Female") {
        return "🦸‍♀️";
      } else if (this.gender === "Male") {
        return "🦸‍♂️";
      } else if (this.gender === "Prefer not to say") {
        return "👤";
      }
    }
  }
});
