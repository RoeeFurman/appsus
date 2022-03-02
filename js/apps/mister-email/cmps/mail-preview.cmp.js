
export default {
    props: ['mail'],
    template: `
            <section class="mail-preview">
            <span>subject: {{mail.subject}} to: {{mail.to}}<hr></span>
            </section>
    `,
    data() {
        return {}
    },
    computed: {

    },

    created() {
    }
}
