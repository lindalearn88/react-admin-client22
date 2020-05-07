import store from 'store';
const USER_KEY = 'USER_KEY';
export default {
    saveUser(user) {
        store.set(USER_KEY, user)
    },
    getUser(key) {
        //return JSON.parse(localStorage.getItem(key) || '{}')
        return store.get(USER_KEY) || {}
    },
    removeUser(key) {
        store.remove(USER_KEY)
    }
}