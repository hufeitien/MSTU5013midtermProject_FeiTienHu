Vue.component("checklist", {
  props: ["item"],

  template: `
<div>

<p :class="{done:item.done}" @click="finished" >
<i class="fas fa-check-square" v-if="item.done"></i>
<i class="fad fa-check-square" v-else="!item.done"></i>

{{ item.task }}

</div>
`,
  methods: {
    finished() {
      this.item.done = !this.item.done;
      this.$emit("checked-msg", this.item.id);
    }
    //To myself: 在裡面打勾以後parent不知道child哪些選項被勾選了，所以要用emit讓parent知道，進而觸發另一個在parent的fucntion
  }
});

let app = new Vue({
  el: "#app",
  data: {
    checklist: [
      {
        task: "Have you done any reserach on topics of the referendum?",
        done: false,
        id: 0
      },
      {
        task:
          "Have you spotted bias on different media source and try make your own judgement?",
        done: true,
        id: 1
      },
      {
        task:
          "Do you know what what items shoud you bring on the election day?",
        done: false,
        id: 2
      },
      {
        task:
          "Have you participated in any forms of discussion on the topics of referendum?",
        done: false,
        id: 3
      },
      { task: "Do you know candidates' policy proposals?", done: false, id: 4 }
    ],
    checkedItemList: []
    // isDisabled: true
  },

  computed: {
    isDisabled() {
      if (this.checkedItemList.length <= 3) {
        return true;
      } else {
        return false;
      }
    },
    alertMsg() {
      if (this.checkedItemList.length <= 3) {
        return `You should do more!`
      } else {
        return `Great job!`;
      }
    },
    countDoneItems() {
      var done = 0;
      var total = this.checklist.length;
      for (var i = 0; i < total; i++) {
        if (this.checklist[i].done) {
          done++;
        }
      }
      return "(" + done + "/" + total + ") COMPLETED!";
    }
  },
  methods: {
    checkedItems() {
      this.checkedItemList = this.checklist.filter(function(todo) {
        return todo.done === true;
      });
      // if (this.checkedItemList.length <= 3) {
      //   alert("You should do more!");
      // } else {
      //   this.isDisabled = false;
      // }
      //to myself: all the changes are depending on the changes of my root checklist[] data, so here I move the condition into the computed property. I left the new todo list I receive through filter() method.
    }
  }
});
