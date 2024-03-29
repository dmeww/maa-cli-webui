import Snack from "../components/Snack.vue";
import {createApp} from "vue";
import vuetify from "../plugins/vuetify.js";

export function notify(msg = '', timeout = 2000) {

    const app = createApp(Snack, {
        text: msg,
        timeout
    })
    const div = document.createElement('div')

    document.body.appendChild(div)

    app.use(vuetify)
    app.mount(div)

    setTimeout(() => {
        app.unmount()
        div.remove()
    }, timeout)

}


export function debounce(func, delay, preFunc) {
    if (preFunc) {
        preFunc()
    }
    let timerId;
    return function () {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    }
}

/**
 * @param {Map<String,Boolean>} showChips
 * @param {String} taskName
 * @param {String} chipName
 */
export function checkShow(showChips = new Map(), taskName, chipName) {
    let val = showChips.get(`${taskName}_${chipName}`)
    if (val) {
        return val
    } else {
        return false
    }
}








