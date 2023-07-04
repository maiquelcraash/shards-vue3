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
import Button from '../src/components/button/Button.vue'

function handleClick() {
  window.alert('You clicked');
}

</script>

<script>
export default {
  data() {
    return {
      checked: false,
      selected: 'orange'
    }
  },
  watch: {
    checked(newVal, oldVal) {
      console.log('Checkbox changed to', newVal);
    },
  }
}
</script>

<template>
  <!-- Plugin component -->
  <d-badge theme="secondary">I'm a plugin component</d-badge>

  <br>

  <!-- Imported Single File Component -->
  <Button theme="danger" @click="handleClick">Click me! I'm an inported component</Button>

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur eros tellus. Fusce mollis felis a lorem euismod sollicitudin. Maecenas et porttitor mauris.
            </d-tab>
            <d-tab title="Tab 2">
                Sed at lacus efficitur, imperdiet purus et, pretium arcu. Mauris vulputate, libero in dignissim auctor, nunc tortor interdum elit, ac dignissim ex enim vitae diam.
            </d-tab>
            <d-tab title="Tab 3" disabled>
                Sed at lacus efficitur, imperdiet purus et, pretium arcu. Mauris vulputate, libero in dignissim auctor, nunc tortor interdum elit, ac dignissim ex enim vitae diam.
            </d-tab>
        </d-tabs>
    </d-card>

    <d-button v-d-tooltip="'👋 Hello there!'">Hover Me</d-button>

</template>

<style lang="css">
  body {
    padding: 5px;
  }
</style>
