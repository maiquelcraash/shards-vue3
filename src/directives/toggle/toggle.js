import target from '../../utils/target'
import eventbus from '../../utils/eventbus.js';
import { COLLAPSE_EVENTS } from '../../utils/constants'
import { setAttr, addClass, removeClass } from '../../utils'

const inBrowser = typeof window !== 'undefined'
const DR_TOGGLE = '__DRTOGGLE'

export default {
    beforeMount(element, binding, vnode) {
        const targets = target(vnode, binding, { click: true }, ({ targets, vnode }) => {
            targets.forEach(target => eventbus.$emit(COLLAPSE_EVENTS.TOGGLE, target));
        });

        if (inBrowser && vnode.context && targets.length > 0) {
            setAttr(element, 'aria-controls', targets.join(' '))
            setAttr(element, 'aria-expanded', 'false')

            if (element.tagName !== 'BUTTON') {
                setAttr(element, 'role', 'button')
            }

            element[DR_TOGGLE] = function toggleDirectiveHandler(id, state) {
                if (targets.indexOf(id) !== -1) {
                    setAttr(element, 'aria-expanded', state ? 'true' : 'false');

                    if (state) {
                        removeClass(element, 'collapsed');
                        return;
                    }

                    addClass(element, 'collapsed');
                }
            }
            eventbus.$on(COLLAPSE_EVENTS.STATE, element[DR_TOGGLE])
        }
    },
    unmounted(element, binding, vnode) {
        if (!element[DR_TOGGLE]) {
            return
        }

        eventbus.$off(COLLAPSE_EVENTS.STATE, element[DR_TOGGLE])
        element[DR_TOGGLE] = null
    }
}
