<template>
    <transition name="fade">
        <component :is="tag"
                   v-if="show"
                   :class="[
            'modal',
            this.noBackdrop ? 'modal--no-backdrop' : ''
        ]">
            <div :class="[
            'modal-dialog',
            size ? `modal-${size}` : '',
            centered ? `modal-dialog-centered` : '',
        ]"
                 role="document"
                 v-click-away="away">
                <div class="modal-content">
                    <slot/>
                </div>
            </div>
        </component>
    </transition>
</template>

<script>
import {mixin as clickAwayMixin} from 'vue3-click-away';
import {MODAL_EVENTS} from '../../utils/constants';
import eventbus from '../../utils/eventbus.js';

export default {
    name: 'd-modal',
    mixins: [clickAwayMixin],
    props: {
        /**
         * Controls if the modal should be shown
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * The component tag.
         */
        tag: {
            type: String,
            default: "div"
        },
        /**
         * The size (sm, lg).
         */
        size: {
            type: String,
            default: null,
            validator: v => ['sm', 'lg'].includes(v)
        },
        /**
         * Hides the backdrop overlay.
         */
        noBackdrop: {
            type: Boolean,
            default: false
        },
        /**
         * Whether it is centered, or not.
         */
        centered: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        away() {
            if (this.noBackdrop) {
                return;
            }

            /**
             * @event close
             *
             * Triggered when the modal is closed.
             */
            this.$emit('close');

            /**
             * @event hidden
             *
             * Triggered when the modal is hidden.
             */
            eventbus.$emit(MODAL_EVENTS.HIDDEN)
        }
    },
};
</script>

<style scoped lang="scss">
.modal {
    content: "ludixii";
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
    transition: .3s;
    overflow-y: auto;
}

.modal-dialog {
    transition: .3s;
}

.modal--no-backdrop {
    background: none;
    pointer-events: none;
}

.fade-enter-from {
    transform: translate(0, 0);
    opacity: 1;
}

.fade-leave-active {
    transform: translate(0, 0);
    opacity: 1;
}

.fade-enter-from, .fade-leave-active {
    opacity: 0;
}

.fade-enter-from .modal-dialog,
.fade-leave-active .modal-dialog {
    -webkit-transform: translate(0, -25%);
    transform: translate(0, -25%);
}
</style>
