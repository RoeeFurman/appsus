import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
_createMails();

export const mailService = {
    query,
    remove,
    get,
    save,
    addMail,
};


function query() {
    return storageService.query(MAILS_KEY);
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId);
}


function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
}

function addMail(newMail){
    save(newMail).then((mails)=> console.log(mails))
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                subject: 'OLDEST!',
                body: 'Would love to catch up sometimes',
                isRead: true, 
                isSent: false, 
                isDraft: false,
                isStarred: true,
                isTrash: false,
                sentAt: 1501133000000,
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'NOLDEST!',
                body: 'Would love to catch up sometimes',
                isRead: true, 
                isSent: false, 
                isDraft: false,
                isStarred: false,
                isTrash: false,
                sentAt: 1501133000000,
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'NEWEST!',
                body: 'Would love to catch up sometimes',
                isRead: false, 
                isSent: true, 
                isDraft: false,
                isStarred: false,
                isTrash: false,
                sentAt: 1901133000000,
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false, 
                isSent: false, 
                isDraft: true,
                isStarred: false,
                isTrash: false,
                sentAt: 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'i dont Miss you!',
                body: 'i Would not love to catch up sometimes',
                isDraft: false, 
                isRead: false, 
                isStarred: false,
                isSent: true, 
                isTrash: true,
                sentAt: 1551133930599,
                to: 'bobo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'SALE! BEST OFFER WINTER SALE!',
                body: 'now on Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nihil perspiciatis nemo rerum eligendi molestiae rem, quod sed aut at laudantium aliquid? Ex, reprehenderit! Doloremque natus assumenda sequi nostrum quam!',
                isSent: false, 
                isDraft: false, 
                isStarred: false,
                isRead: true, 
                isTrash: false,
                sentAt: 1551133930598,
                to: 'lolo@momo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Sprint 3! STARTS ON WEDNESDAY',
                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nihil perspiciatis nemo rerum eligendi molestiae rem, quod sed aut at laudantium aliquid? Ex, reprehenderit! Doloremque natus assumenda sequi nostrum quam!',
                isSent: false, 
                isStarred: false,
                isDraft: true, 
                isRead: true, 
                isTrash: false,
                sentAt: 1551133930597,
                to: 'go@gogo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Sprint 3 WE kick your ass!',
                body: 'oh actually I Would love to catch up sometimes',
                isSent: true, 
                isDraft: false, 
                isRead: false, 
                isStarred: true,
                isTrash: false,
                sentAt: 1551133930596,
                to: 'go@gogo.com'
            },
            {
                id: utilService.makeId(),
                subject: 'VUE is killing me!!!!',
                body: 'oh actually I made it very good, although consectetur adipisicing elit. Minima nihil perspiciatis nemo rerum eligendi molestiae rem',
                isSent: false, 
                isDraft: false, 
                isRead: true, 
                isStarred: true,
                isTrash: false,
                sentAt: 1551133930596,
                to: 'yaron@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Response: VUE is killing me!!!!',
                body: 'oh actually I made it very good, although consectetur adipisicing elit. Minima nihil perspiciatis nemo rerum eligendi molestiae rem',
                isSent: false, 
                isDraft: false, 
                isRead: true, 
                isStarred: true,
                isTrash: false,
                sentAt: 1551133930596,
                to: 'so@soso.com'
            },
        ];
        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails;
}
