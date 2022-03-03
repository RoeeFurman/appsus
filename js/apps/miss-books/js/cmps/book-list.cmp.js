import bookPreview from "./book-preview.cmp.js";


export default{
    props:['books'],
    template: `
        <section class="book-list">
            <article v-for="book in books" class="book-preview-container" :key="book.id">
                <book-preview :book="book"/>
                <router-link class="back-link" :to="'/book/'+book.id">Details</router-link>
            </article>
        </section>
    `,
    components:{
        bookPreview
    },
    methods: {
        select(id){
            console.log(id)
            this.$emit('selected', id)
        },
    }
}