/// my big custom component
Vue.component("questions", {
  props: ["questionInfo", "likeImage"],
  template: `
<div class="container">
<div class="questionbox">
<h4> Question {{ questionInfo.caseNum }} </h4><h4> {{ questionInfo.question}} </h4>
<p class="icon"> {{ questionInfo.img}}</p>

<p> Assent Votes: {{ questionInfo.forVote }}</p
<p> Dissent Votes: {{ questionInfo.againstVote }}</p>
<p> Total Votes: {{ countTotal }}</p>
<button @click="addLike"> 👍FOR  </button>
<button @click="addDislike"> 👎AGAINST  </button>

<div>
<p v-if="!comments.length"> Be the first to comment! </p>
<ul v-else class="commentarea">
<li v-for="comment in comments">
<p> I feel {{ comment.mood }}. </p>
<p> Because...{{ comment.comment }} </p>

</li>
</ul>

</div>
<div>
<usercomment @comment-submitted="addComment">  </usercomment>
</div>

</div>

</div>

`,
  methods: {
    addLike() {
      this.questionInfo.forVote++;
    },
    addDislike() {
      this.questionInfo.againstVote++;
    },
    addComment(userComment) {
      this.comments.push(userComment);
      // console.log(this.comments)
    }
  },
  computed: {
    countTotal() {
      return this.questionInfo.forVote + this.questionInfo.againstVote;
    }
  },
  data() {
    return {
      comments: []
    };
  }
});

//my small custom component
Vue.component("usercomment", {
  template: `
<div>
<form @submit.prevent="onSubmit">

          <label> How do you feel? </label>
          <select v-model="mood">
            <option>😻excited</option>
            <option>😸happy</option>
            <option>😐neutral</option>
            <option>🙀surprised</option>
            <option>😾angry</option>
          </select>
   <p> <textarea v-model="comment" placeholder="Share with us your thoughts about this topic!" rows="5" cols="25"></textarea>
        </p>
<input type="submit" value="submit">
</form>
</div>
`,
  data() {
    return {
      mood: null,
      comment: null
    };
  },
  methods: {
    onSubmit() {
      let userComment = {
        mood: this.mood,
        comment: this.comment
      };
      // console.log(userComment);
      this.$emit("comment-submitted", userComment);
      this.mood = null;
      this.comment = null;
    }
  }
});

// to myslef: 寫在第二個custom component裡的v-model綁的都是寫在這個小的component的data。問題：comment的data type default應該是一個null還是empty string或array？

///my root component
let app = new Vue({
  el: "#app",
  data: {
    referendumData: [
      {
        caseNum: 1,
        img: `👩‍❤️‍👩`,
        question: "Protection of same-sex marital rights",
        forVote: 0,
        againstVote: 0,
        comments: [],
        id: 0
      },
      {
        caseNum: 2,
        img: "⚖️",
        question: "Implementing the Gender Equality Education Act",
        forVote: 0,
        againstVote: 0,
        comments: [],
        id: 1
      },
      {
        caseNum: 3,
        img: "🥫",
        question: "Prohibition of food imports from Fukushima",
        forVote: 0,
        againstVote: 0,
        comments: [],
        id: 2
      },
      {
        caseNum: 4,
        img: "🏭",
        question: "Ceasing expansion of coal power plants",
        forVote: 0,
        againstVote: 0,
        comments: [],
        id: 3
      }
    ],
    likeimg: "👍",
    disLikeimg: "👎"
  }
});

// <div class="forarea">
// <span v-for="x in questionInfo.forVote" class="likebtn"> 👍 </span>
// </div>
// <div class="againstarea">
// <span v-for="x in questionInfo.againstVote" class="likebtn"> 👎 </span>
// </div>
