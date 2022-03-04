import longText from "../cmps/long-text.js";
import reviewAdd from "../cmps/review-add.js";
import { bookService } from "../services/book-service.js";

export default {
  template: `
                <section v-if="book" class="book-details">
                    <router-link class="back-link" to="/book/">Back to Books</router-link><br>
                    <img :src="bookImgUrl" class="book-details-img">
                    <h4>Book-details:</h4>
                    <p><u>ID:</u> {{book.id}}</p>
                    <p><u>Title:</u> {{book.title}}</p>
                    <p><u>Subtitle:</u> {{book.subtitle}}</p>
                    <p><u>Author:</u> {{authorsForDisplay}}</p>
                    <p><u>Published Year:</u> {{displayPublishedDate}}</p>
                    <long-text :txt="book.description" />
                    <p><u>Pages:</u> {{displayPageCount}}</p>
                    <p><u>Categories:</u> {{displaycategories}}</p>
                    <p :class="displayPriceColor"><u>Price:</u> {{formatCurrency}}</p>
                    <p v-if="book.listPrice.isOnSale" class="sale"><b>IS ON SALE!💥</b></p>
                    <review-add :bookId="book.id"/>
                    <router-link :to="'/book/'+book.prevbookId">Prev book</router-link> | 
                    <router-link :to="'/book/'+book.nextbookId">Next book</router-link> | 

                </section>
                `,
  components: {
    longText,
    reviewAdd,
  },
  data() {
    return {
      book: null,
      bookId: null,
    };
  },
  created() {
    const id = this.$route.params.bookId;
    this.bookId = id;
    console.log(this.$route.params.bookId);
    bookService.get(id).then((book) => {
      console.log(book.prevbookId, book.nextbookId);
      this.book = book;
    });
  },
  computed: {
    authorsForDisplay() {
      return this.book.authors.join(", ");
    },
    displayPageCount() {
      let val = "";
      if (this.book.pageCount > 500) val = "Long Reading";
      else if (this.book.pageCount > 200) val = "Decent Reading";
      else val = "Light Reading";

      return this.book.pageCount + " pages, " + val;
    },
    displayPublishedDate() {
      let date = new Date().getFullYear();
      let val = "";
      let calcYears = date - this.book.publishedDate;
      if (calcYears > 10) val = "Veteran Book";
      if (calcYears < 1) val = "New!";

      return this.book.publishedDate + " " + val;
    },
    displaycategories() {
      return this.book.categories.join(", ");
    },
    bookImgUrl() {
      return this.book.thumbnail;
    },
    // displayPriceColor() {
    //   if (this.book.listPrice.amount > 150) return "expensive";
    //   if (this.book.listPrice.amount < 20) return "cheap";
    // },
    formatCurrency() {
      let val = this.book.listPrice.currencyCode;
      return new Intl.NumberFormat(val, {
        style: "currency",
        currency: val,
      }).format(this.book.listPrice.amount);
    },
  },
  watch: {
    "$route.params.bookId": {
      handler() {
        this.bookId = this.$route.params.bookId;
        bookService.get(this.bookId).then((book) => (this.book = book));
      },
      immediate: true,
    },
  },
};
