<template>
    <component :is="tag"
               :id="computedID"
               :class="computedTabsClasses">

        <div :class="computedNavListWrapperClasses">
            <ul :class="computedNavListClasses"
                role="tablist"
                tabindex='0'
                :id="computedTabControlsID"
                @keydown="handleOnKeynav">
                <d-tab-button v-for="(tab, index) in tabs" :key="index"
                              :content="tab.title"
                              :href="tab.href"
                              :id="computedTabButtonID"
                              :active="tab.isActive"
                              :disabled="tab.isDisabled"
                              :setSize="tabs.length"
                              :posInSet="index + 1"
                              :controls="tabsContainerID"
                              :linkClass="tab.titleLinkClass"
                              :itemClass="tab.titleItemClass"
                              @click="setTab(index)"/>
                <slot name="tabs"/>
            </ul>
        </div>

        <div ref="tabsContainer"
             :class="computedTabsContainerClasses"
             :id="tabsContainerID">
            <slot/>
        </div>
    </component>
</template>

<script>
import {guid} from '../../utils'
import {KEYCODES} from '../../utils/constants'
import dTabButton from './_TabButton.vue'
import {ref} from 'vue'

const childComponent = ref();

export default {
    name: 'd-tabs',
    emits: ['update:modelValue'],
    components: {
        dTabButton
    },
    data() {
        return {
            currentTab: this.modelValue,
            tabs: [],
            // eslint-disable-next-line
            tabsContainerID: null
        }
    },
    watch: {
        currentTab(newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }

            this.$emit('update:modelValue', newVal)
        },
        value(newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }

            if (typeof oldVal !== 'number') {
                oldVal = 0
            }

            const direction = newVal < oldVal ? -1 : 1
            this.setTab(newVal, false, direction)
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
         * The element tag.
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * Whether it should be displayed as a card, or not.
         */
        card: {
            type: Boolean,
            default: false
        },
        /**
         * The value used to set the current tab.
         */
        modelValue: {
            type: Number,
            default: null
        },
        /**
         * Whether the tab controls should be displayed as pills, or not.
         */
        pills: {
            type: Boolean,
            default: false
        },
        /**
         * Whether the tab controls should be displayed vertically, or not.
         */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * The content class.
         */
        contentClass: {
            type: String,
            default: null
        },
        /**
         * The nav class.
         */
        navClass: {
            type: String,
            default: null
        },
        /**
         * The nav wrapper class.
         */
        navWrapperClass: {
            type: String,
            default: null
        }
    },
    computed: {
        computedID() {
            return this.id || `dr-tabs-${guid()}`
        },
        computedTabControlsID() {
            return `dr-tab-controls-${guid()}`
        },
        computedTabButtonID() {
            return `dr-tabs-tab-${guid()}`
        },
        navStyle() {
            return this.pills ? 'pills' : 'tabs'
        },
        computedTabsClasses() {
            return [
                'tabs',
                this.vertical ? 'row' : '',
                (this.vertical && this.card) ? 'no-gutters' : '',
            ]
        },
        computedNavListClasses() {
            return [
                'nav',
                `nav-${this.navStyle}`,
                (this.card && !this.vertical) ? `card-header-${this.navStyle}` : '',
                (this.card && this.vertical) ? 'card-header' : '',
                (this.card && this.vertical) ? 'h-100' : '',
                this.vertical ? 'flex-column' : '',
                this.vertical ? 'border-bottom-0' : '',
                this.vertical ? 'rounded-0' : '',
                this.vertical ? 'd-tabs-vertical-nav' : '',
                this.navClass
            ]
        },
        computedNavListWrapperClasses() {
            return [
                this.card && !this.vertical ? 'card-header' : '',
                this.vertical ? 'col-auto' : '',
                this.navWrapperClass
            ]
        },
        computedTabsContainerClasses() {
            return [
                'tab-content',
                this.vertical ? 'col' : '',
                this.contentClass
            ]
        }
    },
    created() {
        this.tabsContainerID = `tabs-container-${guid()}`
    },
    methods: {
        handleOnKeynav(e) {
            if (Object.keys(KEYCODES).some((k) => KEYCODES[k] === e.keyCode)) {
                e.preventDefault()
                e.stopPropagation()
            }

            if (e.keyCode === KEYCODES.UP || e.keyCode === KEYCODES.LEFT) {
                this.previousTab()
            }

            if (e.keyCode === KEYCODES.DOWN || e.keyCode === KEYCODES.RIGHT) {
                this.nextTab()
            }
        },
        nextTab() {
            this.setTab(this.currentTab + 1, false, 1)
        },
        previousTab() {
            this.setTab(this.currentTab - 1, false, -1)
        },
        setTab(index, force, direction) {
            direction = direction || 0
            index = index || 0

            direction = direction === 0 ? 0 : (direction > 0 ? 1 : -1)

            if (!force && index === this.currentTab) {
                return
            }

            const tab = this.tabs[index]

            if (!tab) {
                this.$emit('update:modelValue', this.currentTab)
                return
            }

            if (tab.disabled) {
                if (direction) {
                    this.setTab(index + direction, force, direction)
                }

                return
            }

            this.tabs.forEach(_tab => {
                if (_tab === tab) {
                    _tab.active();
                    return
                }

                _tab.inactive();
            })

            this.currentTab = index
        },
        updateTabs() {
            //                         tab-content / tab-pane / d-tab
            this.tabs = this.$.subTree.children[1].children[0].children
                .filter(child => !!child.component)
                .map((dTab) => {
                    return dTab.component.ctx
                })
                .filter(child => child._isTab);

            let tabIndex = null

            this.tabs.forEach((tab, index) => {
                if (tab.localActiveState && !tab.disabled) {
                    tabIndex = index
                }
            })

            if (tabIndex === null) {
                if (this.currentTab >= this.tabs.length) {
                    this.setTab(this.tabs.length - 1, true, -1)
                    return
                }

                if (this.tabs[this.currentTab] && !this.tabs[this.currentTab].disabled) {
                    tabIndex = this.currentTab
                }

                this.tabs.forEach((tab, index) => {
                    if (!tab.disabled && tabIndex === null) {
                        tabIndex = index
                    }
                })
            }

            this.setTab(tabIndex || 0, true, 0)
        }
    },
    mounted() {
        this.updateTabs()
    }
}
</script>

<style scoped lang="scss">
.d-tabs-vertical-nav:hover {
    background: rgba(90, 97, 105, 0.06);
}
</style>
