<template>
    <label :class="[
            'custom-control',
            !toggle ? 'custom-checkbox' : 'custom-toggle',
            toggle && toggleSmall ? 'custom-toggle-sm' : '',
            inline ? 'custom-control-inline' : '',
            computedStateClass
        ]">
        <input type="checkbox"
               ref="check"
               autocomplete="off"
               :aria-required="required ? 'true' : null"
               :id="computedID"
               :class="[ 'custom-control-input', computedStateClass ]"
               :name="name"
               :value="value"
               :disabled="disabled"
               :required="required"
               v-model="computedLocalState"
               @change="handleChange"/>
        <label :for="computedID" class="custom-control-label" aria-hidden="true"></label>
        <span :class="['custom-control-description']">
            <slot/>
        </span>
    </label>
</template>

<script>
import { guid } from '../../utils'

export default {
    name: 'd-form-checkbox',
    emits: ['update:modelValue', 'update:indeterminate', 'change'],
    data() {
        return {
            localState: this.modelValue
        }
    },
    props: {
        /**
         * The checkbox input name.
         */
        name: {
            type: String
        },
        /**
         * The checkbox input ID.
         */
        id: {
            type: String,
            default: null
        },
        /**
         * The checkbox input value.
         */
        value: {
            default: true
        },
        /**
         * The checkbox input unchecked state value.
         */
        uncheckedValue: {
            default: false
        },
        /**
         * The disabled state.
         */
        disabled: {
            type: Boolean
        },
        /**
         * The required state.
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * The checked state.
         */
        modelValue: {
            type: [Boolean, String, Array]
        },
        /**
         * The indeterminate state.
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * The validation state.
         */
        state: {
            type: [Boolean, String],
            default: null
        },
        /**
         * Display as toggle.
         */
        toggle: {
            type: Boolean,
            default: false
        },
        /**
         * Display as small toggle.
         */
        toggleSmall: {
            type: Boolean,
            default: false
        },
        /**
         * Whether the checkbox should be displayed inline, or not.
         */
        inline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedLocalState: {
            get() {
                return this.localState
            },

            set(val) {
                this.localState = val
            }
        },
        computedID() {
            return this.id || `dr-checkbox-${guid()}`
        },
        computedState() {
            if (this.state === true || this.state === 'valid') {
                return true
            }

            if (this.state === false || this.state === 'invalid') {
                return false
            }

            return null
        },
        computedStateClass() {
            if (this.computedState === true) {
                return 'is-valid'
            }

            if (this.computedState === false) {
                return 'is-invalid'
            }

            return null
        }
    },
    watch: {
        computedLocalState(newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }

            this.$emit('update:modelValue', newVal)
            this.$emit('update:indeterminate', this.$refs.check.indeterminate)
        },

        modelValue(newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }

            this.computedLocalState = newVal
        },

        indeterminate(newVal) {
            this.setIndeterminate(newVal)
        }
    },

    methods: {
        computedLocalState(e) {
            this.$emit('change', e.target.checked ? this.modelValue : this.uncheckedValue)
            this.$emit('update:indeterminate', this.$refs.check.indeterminate)
        },

        setIndeterminate(state) {
            this.$refs.check.indeterminate = state
            this.$emit('update:indeterminate', this.$refs.check.indeterminate)
        }
    },

    mounted() {
        this.setIndeterminate(this.indeterminate)
    }
}
</script>
