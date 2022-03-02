import mailPreview from "./mail-preview.cmp.js";

export default{
    props:['mails'],
    template: `
            <h1>Mail preview</h1>
        <section class="mail-list">
            <article v-for="mail in mails">
      <router-link :to="'/mail/'+mail.id">
            <mail-preview :mail="mail">
    </router-link>
        </article>
        </section>
    `,
    components:{
        mailPreview
    },
    methods: {
        select(id){
            console.log(id)
            this.$emit('selected', id)
        },
    }
}