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


// You Import the component directly as SFC.
import Button from '../src/components/button/Button.vue'

function handleClick() {
    window.alert('You clicked');
}
</script>

<template>
    <!-- Plugin component -->
    <d-badge theme="secondary">I'm a plugin component</d-badge>

    <br>

    <!-- Imported Single File Component -->
    <Button theme="danger" @click="handleClick">Click me! I'm an inported component</Button>
</template>
