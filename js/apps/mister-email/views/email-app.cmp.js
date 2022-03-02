import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js"
import { eventBus } from "../../../services/eventBus-service.js";


export default {
    template: `
        <section class="email-app app-main">
            <h1>Mail app</h1>
           <!-- <car-filter @filtered="setFilter" /> -->
           <!-- <section class="" -->
           <router-link to="/">Home</router-link>
           <mail-list :mails="mails" @remove="removeMail"/>
        </section>
    `,
    components: {
    mailList
    },
    data() {
        return {
            mails: null,
        };
    },
    created() {
        this.unsubscribe = eventBus.on('updatedMails', this.updateMails);
        mailService.query()
            .then(mails => this.mails = mails);
    },
    methods: {
        updateMails(mails){
            this.mails = mails
            console.log(mails)
        },
        removeMail(id) {
            mailService.remove(id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === id);
                    this.mails.splice(idx, 1);
        //             showSuccessMsg('Deleted succesfully');
                })
        //         .catch(err => {
        //             console.error(err);
        //             showErrorMsg('Error - please try again later')
        //         });
        },
        // setFilter(filterBy) {
        //     this.filterBy = filterBy;
        // }
    },
    computed: {
        // carsForDisplay() {
        //     if (!this.filterBy) return this.cars;
        //     const regex = new RegExp(this.filterBy.vendor, 'i');
        //     return this.cars.filter(car => regex.test(car.vendor));
        },
        unmounted() {
            this.unsubscribe();
        }
    // },
};
