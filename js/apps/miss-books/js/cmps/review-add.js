import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
  props: ["bookId"],
  template: `
        <p class="review-title">Book Reviews:</p>
        <div v-if="book" v-for="review in showReviews" class="review">
            <span>Comment By: {{review.name}}</span>
            <span>Date: {{review.date}} Rate: {{'💥'.repeat(review.rate)}}</span>
            <span>Description: {{review.desc}}</span>
            <button @click="removeComment(review.id)">Delete Comment</button>
        </div>
        <form @submit.prevent class="review-add">
            <div class="review">
                <p>Your Review:</p>
                <input ref="input" type="text" @input="displayReview" v-model="review.name" placeholder="Your Name">
                <div class="review-data">
                Rate:<select @change="displayReview" v-model="review.rate" size=1>
                            <option v-for="star in stars" :value="star">{{'💥'.repeat(star)}}</option>
                     </select>
                Date: <input v-model="review.date" type="date" id="start">
                </div>
                <textarea v-model="review.desc" id="review-content" name="review" rows="4" cols="30" placeholder="Your comment here"></textarea>
                <button @click="save">Submit</button>
            </div>
        </form>
    `,
  data() {
    return {
      review: {
        name: "",
        rate: null,
        date: new Date().toISOString().slice(0, 10),
        desc: "",
      },
      book: null,
      // stars: ['💥', '💥💥', '💥💥💥', '💥💥💥💥', '💥💥💥💥💥'],
      stars: [1, 2, 3, 4, 5],
    };
  },
  created() {
    bookService.get(this.bookId).then((book) => (this.book = book));
  },
  computed: {
    showReviews() {
      if (Array.isArray(this.book.reviews)) return this.book.reviews;
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    displayReview() {
      // console.log(this.review)
      return this.review;
    },
    save() {
      bookService.addReview(this.bookId, { ...this.review }).then((book) => {
        this.book = book;
        this.review = {
          name: "",
          rate: null,
          date: new Date().toISOString().slice(0, 10),
          desc: "",
        };
        eventBus.emit("show-msg", { txt: "Review Added", type: "success" });
        // this.$router.push(`/book/${book.id}`)
      });
    },
    removeComment(reviewId) {
      bookService.removeReview(this.book, reviewId).then((book) => {
        this.book = book;
        eventBus.emit("show-msg", { txt: "Review Removed", type: "failure" });
      });
    },
  },
};
