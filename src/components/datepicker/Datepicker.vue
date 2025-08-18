<template>
    <VueDatepicker
        :name="name"
        :id="id"
        :disabledDates="computedDisabledDates"
        :placeholder="placeholder"
        :disabled="disabled"
        :typeable="typeable"
        :clearable="clearable"
        :minimum-view="minimumView"
        :input-format="format"
        :locale="locale"
        @closed="() => {console.log(this.$)}"
        v-bind="$attrs">
        <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"/>
        <slot name="afterDateInput" slot="afterDateInput"/>
    </VueDatepicker>
</template>

<script>
import VueDatepicker from 'vue3-datepicker';
import { enUS, es,  pt } from 'date-fns/locale';

// Validator function that checks the date props.
const _datePropValidator = (v) => {
    return v === null
        || v instanceof Date
        || typeof v === 'string'
        || typeof v === 'number'
}

export default {
    name: 'd-datepicker',
    components: { VueDatepicker },
    props: {
        /**
         * The datepicker's value.
         */
        value: {
            validator: _datePropValidator
        },
        /**
         * The name.
         */
        name: {
            type: String,
            default: null
        },
        /**
         * The component's ID.
         */
        id: {
            type: String,
            default: null
        },
        /**
         * The date format.
         */
        format: {
            type: [String, Function],
            default: 'yyyy-MM-dd'
        },
        /**
         * The language.
         */
        language: {
            type: String,
            default: 'enUS',
            validator(value) {
                return ['enUS', 'es', 'pt'].includes(value)
            }
        },
        /**
         * Configure disabled dates.
         */
        disabledDates: Object,
        /**
         * The placeholder.
         */
        placeholder: String,
        /**
         * The CSS class applied to the calendar element.
         */
        calendarClass: {
            type: [String, Object, Array],
            default: ''
        },
        /**
         * The disabled state.
         */
        disabled: Boolean,
        /**
         * Whether to allow users to type the date, or not.
         */
        typeable: Boolean,
        /**
         * Whether to allow users to clear the date, or not.
         */
        clearable: Boolean,
        /**
         * If set, the lower-level views will not be shown.
         */
        minimumView: {
            type: String,
            default: 'day'
        },
        /**
         * Whether the datepicker should be small, or not.
         */
        small: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedDisabledDates() {
            return {
                dates: this.disabledDates.dates || [],
                predicate: (targetDate) => {
                    if (this.disabledDates.to && targetDate < this.disabledDates.to) return true;
                    if (this.disabledDates.from && targetDate > this.disabledDates.from) return true;
                    return false;
                }
            }
        },
        locale() {
            switch (this.language) {
                case 'enUS':
                    return enUS;
                    break;
                case 'es':
                    return es;
                    break;
                case 'pt':
                    return pt;
            }
        }
    }
}
</script>

<style lang="scss">
$white: #fff;
$black: #000;

$color-silver-sand: #c3c7cc;
$color-primary: #007bff;
$color-shuttle-gray: #5a6169;
$color-porcelain: #eceeef;

$border-color: transparent;
$border-radius-default: .375rem;
$transition-default: all 250ms cubic-bezier(.27, .01, .38, 1.06);
$font-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

$datepicker-color: $color-shuttle-gray;
$datepicker-min-width: 10rem;
$datepicker-background-color: $white;
$datepicker-border-radius: $border-radius-default;
$datepicker-font-size: 1rem;
$datepicker-padding-x: 22px;
$datepicker-padding-y: 20px;
$datepicker-font-weight: 300;
$datepicker-border: 1px solid rgba($black, .05);
$datepicker-drop-shadows: 0 0.5rem 4rem rgba($black, .11),
0 10px 20px rgba($black, .05),
0 2px 3px rgba($black, .06);

$datepicker-cell-width: 36px;
$datepicker-cell-height: 36px;
$datepicker-cell-hover-color: $color-porcelain;
$datepicker-cell-line-height: 2;
$datepicker-cell-font-size: 1rem;

$datepicker-small-padding-y: .625rem;
$datepicker-small-padding-x: .625rem;
$datepicker-small-font-size: .75rem;
$datepicker-small-max-width: 235px;

$datepicker-small-day-font-size: 12px;
$datepicker-small-day-font-weight: 500;
$datepicker-small-day-width: 1.875rem;
$datepicker-small-day-height: 1.875rem;
$datepicker-small-day-line-height: 2.25;

$datepicker-small-day-header-font-size: 100%;

div.vdp-datepicker {
    &__calendar {
        color: $datepicker-color;
        padding: $datepicker-padding-y $datepicker-padding-x;
        min-width: $datepicker-min-width;
        font-size: $datepicker-font-size;
        font-weight: $datepicker-font-weight;
        font-family: $font-system;
        background-color: $datepicker-background-color;
        border: $datepicker-border;
        border-radius: $datepicker-border-radius;
        box-shadow: $datepicker-drop-shadows;
        border: 1px solid rgba($black, .15) !important;

        // Header
        header {
            display: flex;
            padding-bottom: 10px;

            span {
                transition: $transition-default;
                border-radius: $border-radius-default;
                font-weight: 500;

                &.next:after {
                    border-left-color: $color-silver-sand;
                }

                &.prev:after {
                    border-right-color: $color-silver-sand;
                }
            }
        }

        // Header elements and specific calendar cells.
        header span,
        .cell.day:not(.disabled):not(.blank), .cell.month, .cell.year {
            &:hover {
                background-color: $datepicker-cell-hover-color;
                border-color: $border-color !important;
            }
        }

        // Cells
        .cell {
            line-height: $datepicker-cell-line-height;
            font-size: $datepicker-cell-font-size;
            border-radius: $border-radius-default;
            transition: $transition-default;
            border-color: $border-color;
            height: auto;

            // Day headers
            &.day-header {
                font-weight: 500;
            }

            // Days
            &.day {
                width: $datepicker-cell-width;
                height: $datepicker-cell-height;
                border-radius: 50%;
            }

            // Months
            &.month,
            &.year {
                height: $datepicker-cell-height;
                font-size: 12px;
                line-height: 33px;
            }

            // Selected
            &.selected,
            &.highlighted.selected {
                background: $color-primary !important;
                color: $white;

                &:hover {
                    background: darken($color-primary, 5) !important;
                    border-color: $border-color !important;
                }
            }

            &.highlighted {
                background: $color-primary;
                color: $white;

                &:hover {
                    background: darken($color-primary, 5) !important;
                    border-color: $border-color !important;
                }

                &:not(.highlight-start):not(.highlight-end) {
                    border-radius: 0;
                }

                &.highlight-start {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &.highlight-end {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
    }

    // Small Datepicker modifier.
    &__small {
        padding: $datepicker-small-padding-y $datepicker-small-padding-x;
        font-size: $datepicker-small-font-size;
        max-width: $datepicker-small-max-width;

        .cell {
            &.day {
                width: $datepicker-small-day-width;
                height: $datepicker-small-day-height;
                line-height: $datepicker-small-day-line-height;
            }

            &.day,
            &.month,
            &.year {
                font-size: $datepicker-small-day-font-size;
                font-weight: $datepicker-small-day-font-weight;
            }

            &.day-header {
                font-size: $datepicker-small-day-header-font-size;
            }
        }
    }
}
</style>


