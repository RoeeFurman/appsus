import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
        <section class="book-add">
            <span>
                <input type="text" ref="input" v-model="searchBy" placeholder="Add-book?" class="add-book-input">
                <button @click="onSearchBy(searchBy)">Search by</button>
                <div v-for="book in booksFromGoogle" v-if="showResults">
                <h5>{{book.volumeInfo.title}}<button @click="onAddGoogleBook(book)">➕</button></h5>
                </div>
            </span>
        </section>
    `,
    data() {
        return {
            showResults: false,
            searchBy: '',
            booksFromGoogle: [],
            showResults: false,
        }
    },
    methods: {
        onSearchBy(val) {
            if (!val) return
            //    console.log(val)
            this.showResults = true;
            this.searchBy = '';
            bookService.getApiBooks(val)
                .then(res => {
                    console.log(res)
                    this.booksFromGoogle = res
                    console.log(this.booksFromGoogle)
                })
        },
        onAddGoogleBook(book) {
            bookService.addGoogleBook(book)
                .then(book => {
                    console.log(book)
                    bookService.query()
                        .then(updatedBooks =>
                            this.$emit('bookAdded', updatedBooks))
                })
            this.showResults = false;
            eventBus.emit('show-msg', { txt: 'Book Added', type: 'success' })

            this.$router.push('/book')

        }
    },
    mounted() {
        this.$refs.input.focus()
    },
}