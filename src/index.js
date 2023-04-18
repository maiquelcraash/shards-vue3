import * as components from './components'
import * as directives from './directives'
import { vueUse } from './utils'

const VuePlugin = {
  /**
   * Bind shards-vue3 components to Vue instance app
   * @param app instance returned by Vue createApp function
   */
  install: function (app) {
    if (app._shards_vue_installed) {
      return
    }

    app._shards_vue_installed = true;

    // Register component plugins
    for (let component in components) {
      app.use(components[component])
    }

    // Register directive plugins
    for (let directive in directives) {
      app.use(directives[directive])
    }
  }
}

vueUse(VuePlugin)

export default VuePlugin
