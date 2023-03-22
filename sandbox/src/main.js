import { createApp } from 'vue'
import Sandbox from '../Sandbox.vue'
import ShardsVue from '../../dist/shards-vue3.esm.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'shards-ui/dist/css/shards.css';

const main = createApp(Sandbox)

main.use(ShardsVue);
main.mount('#app');
