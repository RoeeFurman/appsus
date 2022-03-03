import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.js';
import bookFilter from '../cmps/book-filter.js'
import bookAdd from '../cmps/book-add.cmp.js'



export default {
    template: `
        
        <section class="book-app app-main">
            <book-filter @filtered="setFilter"></book-filter>
            <book-add @bookAdded="updateBooks"></book-add>
            <book-list :books="booksToShow"></book-list> 
        </section>
    `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
        bookAdd
    },
    data() {
        return {
            books: [],
            filterBy: null,
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        updateBooks(books){
            this.books = books
        },
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            return this.books.filter(book => (regex.test(book.title) && (this.filterBy.price > book.listPrice.amount)));
        },

    },


}