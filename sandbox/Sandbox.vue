<script setup>
/**
 * 🙌 Awesome, so you'd like to contribute!
 *
 * You can use this file to experiment with Shards Vue, add a new
 * feature or maybe fix a bug. All you need to do is work inside
 * this file! That's it!
 *
 * Check out the comments below to understand what's going on!
 */

// Configure Vue3 instance and attach shards-vue3 lib to it
import './src/main.js'

// You can import the component directly as SFC.
import DFormRadio from '@/components/form-radio/FormRadio.vue';
import Button from '@/components/button/Button.vue'
import DDatepicker from "@/components/datepicker/Datepicker.vue";

function handleClick() {
    window.alert('You clicked');
}

</script>

<script>
export default {
    data() {
        return {
            checked: false,
            selected: 'orange',
            date: new Date(),
            opened: false
        }
    },
    methods: {
        handleModalClose() {
            this.checked = false;
        },
        handleDateOpened() {
            this.opened = true
        },
        handleDateClosed() {
            this.opened = false
        }
    },
    watch: {
        checked(newVal, oldVal) {
            console.log('Checkbox changed to', newVal);
        },
    },
    computed: {
        disabledDates() {
            return {
                dates: [
                    new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                ],
                from: new Date(),
                to: new Date(2025, 6, 10)
            }
        }
    }
}
</script>

<template>
    <!-- Plugin component -->
    <d-badge theme="secondary">I'm a plugin component</d-badge>

    <br>

    <!-- Imported Single File Component -->
    <Button theme="danger" @click="handleClick">Click me! I'm an imported component</Button>

    <!-- Component 2-way data binding -->
    <d-checkbox v-model="checked"
                class="custom-toggle-sm mt-4"
                toggle>
        {{ checked }}
    </d-checkbox>

    <d-form-radio v-model="selected" value="orange">Orange</d-form-radio>
    <d-form-radio v-model="selected" value="lemon">Lemon</d-form-radio>
    <d-form-radio v-model="selected" value="kiwi">Kiwi</d-form-radio>
    <p>Selected Status: {{ selected }}</p>

    <d-card>
        <d-tabs card>
            <d-tab title="Tab 1" active>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur eros tellus. Fusce mollis felis
                a lorem euismod sollicitudin. Maecenas et porttitor mauris.
            </d-tab>
            <d-tab title="Tab 2">
                Sed at lacus efficitur, imperdiet purus et, pretium arcu. Mauris vulputate, libero in dignissim auctor,
                nunc tortor interdum elit, ac dignissim ex enim vitae diam.
            </d-tab>
            <d-tab title="Tab 3" disabled>
                Sed at lacus efficitur, imperdiet purus et, pretium arcu. Mauris vulputate, libero in dignissim auctor,
                nunc tortor interdum elit, ac dignissim ex enim vitae diam.
            </d-tab>
        </d-tabs>
    </d-card>

    <d-button v-d-tooltip="'👋 Hello there!'">Hover Me</d-button>


    <d-modal :show="checked" @close="handleModalClose">
        <d-modal-header>
            <d-modal-title>Header</d-modal-title>
        </d-modal-header>
        <d-modal-body>This is a modal</d-modal-body>
        <d-button @click="handleModalClose" class="d-block mx-auto mb-2 px-4" ref="button" theme="primary">OK</d-button>
    </d-modal>

    <div>
        <div>Opened: <span :class="[opened ? 'text-success' : 'text-danger']">{{ opened }}</span></div>
        <div>📅 Date: <span>{{ date }}</span></div>
        <d-datepicker
            v-model="date"
            @opened="handleDateOpened"
            @closed="handleDateClosed"
            :disabled-dates="disabledDates"
            format="dd/MM/yyyy"
            typeable
            clearable
            language="pt"/>
    </div>

</template>

<style lang="css">
body {
    padding: 5px;
}
</style>
