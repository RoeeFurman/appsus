import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
_createMails();

export const mailService = {
    query,
    remove,
    get,
    save,
    // removeMail
};


function query() {
    return storageService.query(MAILS_KEY);
}

function remove(bookId) {
    return storageService.remove(MAILS_KEY, bookId);
}


// function removeMail(mailId){
//     return storageService.query(MAILS_KEY)
//     .then(mails =>{
//         const idx = mails.findIndex(mail => mail.id === mailId);
//         console.log(idx);
//         remove(mailId)
//         mails.splice(idx, 1);
//         console.log(mails)
//         return mails
//     })
    // get(mailId).then(mail => console.log(mail));
// }

// function removeReview(book, reviewId) {
//     const idx = book.reviews.findIndex(review => review.id === reviewId)
//     book.reviews.splice(idx, 1)
//     return storageService.put(BOOKS_KEY, book)
//   }


function get(bookId) {
    return storageService.get(MAILS_KEY, bookId)
        // .then(book => {
        //     return _setNextPrevbookId(book)
        // })
}

function save(book) {
    if (book.id) return storageService.put(MAILS_KEY, book);
    else return storageService.post(MAILS_KEY, book);
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false, 
                sentAt: 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: 'e102',
                subject: 'i dont Miss you!',
                body: 'i Would not love to catch up sometimes',
                isRead: true, 
                sentAt: 1551133930594,
                to: 'bobo@momo.com'
            },
            {
                id: 'e103',
                subject: 'Miss you!',
                body: 'oh actually I Would love to catch up sometimes',
                isRead: false, 
                sentAt: 1551133930594,
                to: 'lolo@momo.com'
            }
        ];
        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails;
}


// function _setNextPrevbookId(book) {
//   return storageService.query(MAILS_KEY).then(books => {
//     const bookIdx = books.findIndex(currbook => currbook.id === book.id)
//     book.nextbookId = (books[bookIdx + 1]) ? books[bookIdx + 1].id : books[0].id
//     book.prevbookId = (books[bookIdx - 1]) ? books[bookIdx - 1].id : books[books.length - 1].id
//     return book
//   })
// }