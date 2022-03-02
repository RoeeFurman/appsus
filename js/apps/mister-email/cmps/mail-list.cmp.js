import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <hr>
                <div v-for="mail in mails" :key="mail.id">
                   <mail-preview :mail="mail" />
                   <!-- <div class="actions">
                       <button @click="remove(car.id)">X</button>
                       <router-link :to="'/car/edit/'+car.id">Edit</router-link> -->
                   </div>
        </section>
    `,
    components: {
        mailPreview
    },
    methods: {
        // remove(id) {
        //     this.$emit('remove', id);
        // },
        // select(car) {
        //     this.$emit('selected', car);
        // }
    },
    computed: {}
}