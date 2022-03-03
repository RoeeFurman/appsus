
export default {
    props: ['book'],
    template: `
            <section class="book-preview">
                <img :src="bookImgUrl" class="preview">
                <!-- <div class="is-on-sale" v-if="book.listPrice.isOnSale">SALE</div> -->
                <p><span>Title:</span> {{book.title}}</p>
                <hr>
                <p><span>Price:</span> {{formatCurrency}}</p>
            </section>
    `,
    data() {
        return {}
    },
    computed: {
        bookImgUrl() {
            return this.book.thumbnail
        }, formatCurrency(){
            let val = this.book.listPrice.currencyCode;
            return new Intl.NumberFormat(val , { style: 'currency', currency: val }).format(this.book.listPrice.amount);
        },
        // methods: {
        // },
        created(){
        }
    }
}

// const book = {id: 123, name: 'book'}
// const name = book.name
// const {name, id} = book
// console.log(name);

// function formatCurrency(num) {
//     return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
// }