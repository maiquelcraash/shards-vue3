import { isArray } from '../utils';
import eventbus from '../utils/eventbus.js';

const _DR_RL_ = '_DR_RL_';

export default {
    methods: {
        listenOnRoot(event, callback) {
            if (!this[_DR_RL_] || !isArray(this[_DR_RL_])) {
                this[_DR_RL_] = []
            }

            this[_DR_RL_].push({ event, callback })
            eventbus.$on(event, callback)

            return this
        },
        emitOnRoot(event, ...args) {
            eventbus.$emit(event, ...args)
            return this
        }
    },
    beforeDestroy() {
        if (!this[_DR_RL_] && !isArray(this[_DR_RL_])) {
            return
        }

        while (this[_DR_RL_].length > 0) {
            const { event, callback } = this[_DR_RL_].shift()
            eventbus.$off(event, callback)
        }
    }
}
