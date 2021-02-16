declare module "Divider" {
    function Divider({ children }: {
        children: any;
    }): any;
    namespace Divider {
        namespace propTypes {
            const children: any;
        }
    }
    export default Divider;
}
declare module "DateInput/Input" {
    function Input({ ariaLabel, autoFocus, className, disabled, itemRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder, required, showLeadingZeros, step, value, }: {
        ariaLabel: any;
        autoFocus: any;
        className: any;
        disabled: any;
        itemRef: any;
        max: any;
        min: any;
        name: any;
        nameForClass: any;
        onChange: any;
        onKeyDown: any;
        onKeyUp: any;
        placeholder?: string;
        required: any;
        showLeadingZeros: any;
        step: any;
        value: any;
    }): any[];
    namespace Input {
        namespace propTypes {
            const ariaLabel: any;
            const autoFocus: any;
            const className: any;
            const disabled: any;
            const itemRef: any;
            const max: any;
            const min: any;
            const name: any;
            const nameForClass: any;
            const onChange: any;
            const onKeyDown: any;
            const onKeyUp: any;
            const placeholder: any;
            const required: any;
            const showLeadingZeros: any;
            const step: any;
            const value: any;
        }
    }
    export default Input;
}
declare module "shared/propTypes" {
    export const isValueType: any;
    export function isMinDate(props: any, propName: any, componentName: any): Error;
    export function isMaxDate(props: any, propName: any, componentName: any): Error;
}
declare module "shared/utils" {
    /**
     * Returns a value no smaller than min and no larger than max.
     *
     * @param {*} value Value to return.
     * @param {*} min Minimum return value.
     * @param {*} max Maximum return value.
     */
    export function between(value: any, min: any, max: any): any;
    export function safeMin(...args: any[]): number;
    export function safeMax(...args: any[]): number;
}
declare module "DateInput/DayInput" {
    function DayInput({ maxDate, minDate, month, year, ...otherProps }: {
        [x: string]: any;
        maxDate: any;
        minDate: any;
        month: any;
        year: any;
    }): any;
    namespace DayInput {
        namespace propTypes {
            export const ariaLabel: any;
            export const className: any;
            export const disabled: any;
            export const itemRef: any;
            export { isMaxDate as maxDate };
            export { isMinDate as minDate };
            export const month: any;
            export const onChange: any;
            export const onKeyDown: any;
            export const onKeyUp: any;
            export const placeholder: any;
            export const required: any;
            export const showLeadingZeros: any;
            export const value: any;
            export const year: any;
        }
    }
    export default DayInput;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
}
declare module "DateInput/MonthInput" {
    function MonthInput({ maxDate, minDate, year, ...otherProps }: {
        [x: string]: any;
        maxDate: any;
        minDate: any;
        year: any;
    }): any;
    namespace MonthInput {
        namespace propTypes {
            export const ariaLabel: any;
            export const className: any;
            export const disabled: any;
            export const itemRef: any;
            export { isMaxDate as maxDate };
            export { isMinDate as minDate };
            export const onChange: any;
            export const onKeyDown: any;
            export const onKeyUp: any;
            export const placeholder: any;
            export const required: any;
            export const showLeadingZeros: any;
            export const value: any;
            export const year: any;
        }
    }
    export default MonthInput;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
}
declare module "shared/dateFormatter" {
    export function getFormatter(options: any): (locale: any, date: any) => any;
    export function formatMonth(locale: any, date: any): any;
    export function formatShortMonth(locale: any, date: any): any;
}
declare module "DateInput/MonthSelect" {
    function MonthSelect({ ariaLabel, className, itemRef, locale, maxDate, minDate, placeholder, short, value, year, ...otherProps }: {
        [x: string]: any;
        ariaLabel: any;
        className: any;
        itemRef: any;
        locale: any;
        maxDate: any;
        minDate: any;
        placeholder?: string;
        short: any;
        value: any;
        year: any;
    }): any;
    namespace MonthSelect {
        namespace propTypes {
            export const ariaLabel: any;
            export const className: any;
            export const disabled: any;
            export const itemRef: any;
            export const locale: any;
            export { isMaxDate as maxDate };
            export { isMinDate as minDate };
            export const onChange: any;
            export const onKeyDown: any;
            export const onKeyUp: any;
            export const placeholder: any;
            export const required: any;
            export const short: any;
            export const value: any;
            export const year: any;
        }
    }
    export default MonthSelect;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
}
declare module "DateInput/YearInput" {
    function YearInput({ maxDate, minDate, placeholder, valueType, ...otherProps }: {
        [x: string]: any;
        maxDate: any;
        minDate: any;
        placeholder?: string;
        valueType: any;
    }): any;
    namespace YearInput {
        namespace propTypes {
            export const ariaLabel: any;
            export const className: any;
            export const disabled: any;
            export const itemRef: any;
            export { isMaxDate as maxDate };
            export { isMinDate as minDate };
            export const onChange: any;
            export const onKeyDown: any;
            export const onKeyUp: any;
            export const placeholder: any;
            export const required: any;
            export const value: any;
            export { isValueType as valueType };
        }
    }
    export default YearInput;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
    import { isValueType } from "shared/propTypes";
}
declare module "DateInput/NativeInput" {
    function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType, }: {
        ariaLabel: any;
        disabled: any;
        maxDate: any;
        minDate: any;
        name: any;
        onChange: any;
        required: any;
        value: any;
        valueType: any;
    }): any;
    namespace NativeInput {
        namespace propTypes {
            export const ariaLabel: any;
            export const disabled: any;
            export { isMaxDate as maxDate };
            export { isMinDate as minDate };
            export const name: any;
            export const onChange: any;
            export const required: any;
            export const value: any;
            export { isValueType as valueType };
        }
    }
    export default NativeInput;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
    import { isValueType } from "shared/propTypes";
}
declare module "shared/dates" {
    /**
     * Returns the beginning of a given range.
     *
     * @param {string} rangeType Range type (e.g. 'day')
     * @param {Date} date Date.
     */
    export function getBegin(rangeType: string, date: Date): any;
    /**
     * Returns the end of a given range.
     *
     * @param {string} rangeType Range type (e.g. 'day')
     * @param {Date} date Date.
     */
    export function getEnd(rangeType: string, date: Date): any;
}
declare module "DateInput" {
    class DateInput {
        static getDerivedStateFromProps(nextProps: any, prevState: any): {
            isCalendarOpen: any;
            year: any;
            month: any;
            day: any;
            value: any;
        };
        state: {
            year: any;
            month: any;
            day: any;
        };
        get formatDate(): (locale: any, date: any) => any;
        /**
         * Gets current value in a desired format.
         */
        getProcessedValue(value: any): any;
        get divider(): any;
        get placeholder(): any;
        get commonInputProps(): {
            className: any;
            disabled: any;
            maxDate: any;
            minDate: any;
            onChange: (event: any) => void;
            onKeyDown: (event: any) => void;
            onKeyUp: (event: any) => void;
            required: any;
            itemRef: (ref: any, name: any) => void;
        };
        get valueType(): string;
        onClick: (event: any) => void;
        onKeyDown: (event: any) => void;
        onKeyUp: (event: any) => void;
        /**
         * Called when non-native date input is changed.
         */
        onChange: (event: any) => void;
        /**
         * Called when native date input is changed.
         */
        onChangeNative: (event: any) => void;
        /**
         * Called after internal onChange. Checks input validity. If all fields are valid,
         * calls props.onChange.
         */
        onChangeExternal: () => void;
        renderDay: (currentMatch: any, index: any) => any;
        renderMonth: (currentMatch: any, index: any) => any;
        renderYear: (currentMatch: any, index: any) => any;
        renderCustomInputs(): any;
        renderNativeInput(): any;
        render(): any;
    }
    namespace DateInput {
        namespace defaultProps {
            const maxDetail: string;
            const name: string;
            const returnValue: string;
        }
        namespace propTypes {
            export const autoFocus: any;
            export const className: any;
            export const dayAriaLabel: any;
            export const dayPlaceholder: any;
            export const disabled: any;
            export const format: any;
            export const isCalendarOpen: any;
            export const locale: any;
            export { isMaxDate as maxDate };
            const maxDetail_1: any;
            export { maxDetail_1 as maxDetail };
            export { isMinDate as minDate };
            export const monthAriaLabel: any;
            export const monthPlaceholder: any;
            const name_1: any;
            export { name_1 as name };
            export const nativeInputAriaLabel: any;
            export const onChange: any;
            export const required: any;
            const returnValue_1: any;
            export { returnValue_1 as returnValue };
            export const showLeadingZeros: any;
            export const value: any;
            export const yearAriaLabel: any;
            export const yearPlaceholder: any;
        }
    }
    export default DateInput;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
}
declare module "DatePicker" {
    class DatePicker {
        static getDerivedStateFromProps(nextProps: any, prevState: any): {
            isOpen: any;
            isOpenProps: any;
        };
        state: {};
        componentDidMount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentWillUnmount(): void;
        get eventProps(): any;
        onOutsideAction: (event: any) => void;
        onChange: (value: any, closeCalendar?: any) => void;
        onFocus: (event: any) => void;
        openCalendar: () => void;
        closeCalendar: () => void;
        toggleCalendar: () => void;
        stopPropagation: (event: any) => any;
        clear: () => void;
        handleOutsideActionListeners(shouldListen: any): void;
        renderInputs(): any;
        renderCalendar(): any;
        render(): any;
        wrapper: any;
    }
    namespace DatePicker {
        namespace defaultProps {
            export { CalendarIcon as calendarIcon };
            export { ClearIcon as clearIcon };
            export const closeCalendar: boolean;
            export const isOpen: any;
            export const returnValue: string;
        }
        namespace propTypes {
            export const autoFocus: any;
            export const calendarAriaLabel: any;
            export const calendarClassName: any;
            export const calendarIcon: any;
            export const className: any;
            export const clearAriaLabel: any;
            export const clearIcon: any;
            const closeCalendar_1: any;
            export { closeCalendar_1 as closeCalendar };
            export const dayAriaLabel: any;
            export const dayPlaceholder: any;
            export const disableCalendar: any;
            export const disabled: any;
            export const format: any;
            const isOpen_1: any;
            export { isOpen_1 as isOpen };
            export const locale: any;
            export { isMaxDate as maxDate };
            export const maxDetail: any;
            export { isMinDate as minDate };
            export const monthAriaLabel: any;
            export const monthPlaceholder: any;
            export const name: any;
            export const nativeInputAriaLabel: any;
            export const onCalendarClose: any;
            export const onCalendarOpen: any;
            export const onChange: any;
            export const onFocus: any;
            export const required: any;
            const returnValue_1: any;
            export { returnValue_1 as returnValue };
            export const showLeadingZeros: any;
            export const value: any;
            export const yearAriaLabel: any;
            export const yearPlaceholder: any;
        }
    }
    export default DatePicker;
    const CalendarIcon: any;
    const ClearIcon: any;
    import { isMaxDate } from "shared/propTypes";
    import { isMinDate } from "shared/propTypes";
}
declare module "entry" {
    import 'react-calendar/dist/Calendar.css';
    import DatePicker from "DatePicker";
    import './DatePicker.css';
    export default DatePicker;
}
declare module "entry.nostyle" {
    import DatePicker from "DatePicker";
    export default DatePicker;
}
