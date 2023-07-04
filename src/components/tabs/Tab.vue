<template>
    <transition mode="out-in" name="fade"
                @beforeEnter="handleBeforeEnter"
                @afterEnter="handleAfterEnter"
                @afterLeave="handleAfterLeave">
        <component :is="tag"
                   ref="panel"
                   v-show="localActiveState"
                   role="tabpanel"
                   :id="computedID"
                   :aria-hidden="localActiveState ? 'false' : 'true'"
                   :aria-expanded="localActiveState ? 'true' : 'false'"
                   :aria-labelledby="controlledBy || null"
                   :class="classes">
            <slot/>
        </component>
    </transition>
</template>

<script>
import {guid} from '../../utils';

export default {
    name: 'd-tab',
    data() {
        return {
            localActiveState: this.active && !this.disabled,
            show: false
        }
    },
    props: {
        /**
         * The element ID.
         */
        id: {
            type: String,
            default: null
        },
        /**
         * The active state.
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The element tag.
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * The button ID.
         */
        buttonId: {
            type: String,
            default: ''
        },
        /**
         * The title.
         */
        title: {
            type: String,
            default: ''
        },
        /**
         * The disabled state.
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Whether the card should display the body, or not.
         */
        noBody: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedID() {
            return this.id || `dr-tab-${guid()}`
        },
        controlledBy() {
            return this.buttonId || `dr-tab-button-${guid()}`
        },
        computedFade() {
            return this.$parent.fade
        },
        _isTab() {
            return true
        },
        classes() {
            return [
                'tab-pane',
                (this.$parent && this.$parent.card && !this.noBody) ? 'card-body' : '',
                this.show ? 'show' : '',
                this.disabled ? 'disabled' : '',
                this.localActiveState ? 'active' : ''
            ]
        },
        isActive() {
            return this.localActiveState;
        },
        isDisabled() {
            return this.disabled;
        }
    },
    methods: {
        handleBeforeEnter() {
            this.show = false
        },
        handleAfterEnter() {
            this.show = true
        },
        handleAfterLeave() {
            this.show = false
        },
        active() {
            this.localActiveState = true;
        },
        inactive() {
            this.localActiveState = false;
        }
    },
    mounted() {
        this.show = this.localActiveState
    }
}
</script>

<style scoped>
.fade-enter-active {
    transition: opacity .25s ease-in-out;
}

.fade-leave-active {
    transition: opacity .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
