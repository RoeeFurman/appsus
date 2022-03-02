import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js"


export default {
    template: `
        <section class="email-app app-main">
            <h1>Mail app</h1>
           <!-- <car-filter @filtered="setFilter" /> -->
           <router-link to="/">Home</router-link>
           <mail-list :mails="mails"/>
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
        mailService.query()
            .then(mails => this.mails = mails);
    },
    methods: {
        // removeCar(id) {
        //     carService.remove(id)
        //         .then(() => {
        //             const idx = this.cars.findIndex((car) => car.id === id);
        //             this.cars.splice(idx, 1);
        //             showSuccessMsg('Deleted succesfully');
        //         })
        //         .catch(err => {
        //             console.error(err);
        //             showErrorMsg('Error - please try again later')
        //         });
        // },
        // setFilter(filterBy) {
        //     this.filterBy = filterBy;
        // }
    },
    computed: {
        // carsForDisplay() {
        //     if (!this.filterBy) return this.cars;
        //     const regex = new RegExp(this.filterBy.vendor, 'i');
        //     return this.cars.filter(car => regex.test(car.vendor));
        }
    // },
};
