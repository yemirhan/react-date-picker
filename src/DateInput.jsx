import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getYear, getMonthHuman, getDate } from '@wojtekmaj/date-utils';

import Divider from './Divider';
import DayInput from './DateInput/DayInput';
import MonthInput from './DateInput/MonthInput';
import MonthSelect from './DateInput/MonthSelect';
import YearInput from './DateInput/YearInput';
import NativeInput from './DateInput/NativeInput';

import { getFormatter } from './shared/dateFormatter';
import {
  getBegin,
  getEnd,
} from './shared/dates';
import { isMaxDate, isMinDate } from './shared/propTypes';
import { between } from './shared/utils';

const defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
const defaultMaxDate = new Date(8.64e15);
const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(maxDetail) {
  return allValueTypes[allViews.indexOf(maxDetail)];
}

function getValue(value, index) {
  if (!value) {
    return null;
  }

  const rawValue = Array.isArray(value) && value.length === 2 ? value[index] : value;

  if (!rawValue) {
    return null;
  }

  const valueDate = toDate(rawValue);

  if (isNaN(valueDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueDate;
}

function getDetailValue({
  value, minDate, maxDate, maxDetail,
}, index) {
  const valuePiece = getValue(value, index);

  if (!valuePiece) {
    return null;
  }

  const valueType = getValueType(maxDetail);
  const detailValueFrom = [getBegin, getEnd][index](valueType, valuePiece);

  return between(detailValueFrom, minDate, maxDate);
}

const getDetailValueFrom = (args) => getDetailValue(args, 0);

const getDetailValueTo = (args) => getDetailValue(args, 1);

const getDetailValueArray = (args) => {
  const { value } = args;

  if (Array.isArray(value)) {
    return value;
  }

  return [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args));
};

function isInternalInput(element) {
  return element.getAttribute('data-input') === 'true';
}

function findInput(element, property) {
  let nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}

function focus(element) {
  if (element) {
    element.focus();
  }
}

function renderCustomInputsHelper(placeholder, elementFunctions, allowMultipleInstances) {
  const usedFunctions = [];
  const pattern = new RegExp(
    Object.keys(elementFunctions).map((el) => `${el}+`).join('|'), 'g',
  );
  const matches = placeholder.match(pattern);

  return placeholder.split(pattern)
    .reduce((arr, element, index) => {
      const divider = element && (
        // eslint-disable-next-line react/no-array-index-key
        <Divider key={`separator_${index}`}>
          {element}
        </Divider>
      );
      const res = [...arr, divider];
      const currentMatch = matches && matches[index];

      if (currentMatch) {
        const renderFunction = (
          elementFunctions[currentMatch]
          || elementFunctions[
            Object.keys(elementFunctions)
              .find((elementFunction) => currentMatch.match(elementFunction))
          ]
        );

        if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
          res.push(currentMatch);
        } else {
          res.push(renderFunction(currentMatch, index));
          usedFunctions.push(renderFunction);
        }
      }
      return res;
    }, []);
}

export default function DateInput({
  autoFocus,
  className,
  dayAriaLabel,
  dayPlaceholder,
  defaultIsCalendarOpen,
  disabled,
  format,
  isCalendarOpen: isCalendarOpenProps,
  locale,
  maxDate,
  maxDetail,
  minDate,
  monthAriaLabel,
  monthPlaceholder,
  name,
  nativeInputAriaLabel,
  onChange: onChangeProps,
  required,
  returnValue,
  showLeadingZeros,
  yearAriaLabel,
  yearPlaceholder,
  value: valueProps,
}) {
  const [value, setValue] = useState();
  const [isCalendarOpenState, setIsCalendarOpenState] = useState(defaultIsCalendarOpen);
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const dayInput = useRef();
  const monthInput = useRef();
  const yearInput = useRef();

  useEffect(() => {
    const nextValue = getDetailValueFrom({
      value: valueProps, minDate, maxDate, maxDetail,
    });

    if (nextValue) {
      setYear(getYear(nextValue).toString());
      setMonth(getMonthHuman(nextValue).toString());
      setDay(getDate(nextValue).toString());
    } else {
      setYear(null);
      setMonth(null);
      setDay(null);
    }
    setValue(nextValue);
  }, [maxDate?.getTime(), maxDetail, minDate?.getTime(), valueProps]);

  const isCalendarOpen = isCalendarOpenProps ?? isCalendarOpenState;

  const valueType = getValueType(maxDetail);

  /**
   * Gets current value in a desired format.
   */
  function getProcessedValue(valueToProcess) {
    const processFunction = (() => {
      switch (returnValue) {
        case 'start': return getDetailValueFrom;
        case 'end': return getDetailValueTo;
        case 'range': return getDetailValueArray;
        default: throw new Error('Invalid returnValue.');
      }
    })();

    return processFunction({
      value: valueToProcess, minDate, maxDate, maxDetail,
    });
  }

  /**
   * Called after internal onChange. Checks input validity. If all fields are valid,
   * calls props.onChange.
   */
  function onChangeExternal() {
    if (!onChangeProps) {
      return;
    }

    const formElements = [dayInput.current, monthInput.current, yearInput.current].filter(Boolean);

    const values = {};
    formElements.forEach((formElement) => {
      values[formElement.name] = formElement.value;
    });

    if (formElements.every((formElement) => !formElement.value)) {
      onChangeProps(null, false);
    } else if (
      formElements.every((formElement) => formElement.value && formElement.validity.valid)
    ) {
      const resultYear = parseInt(values.year, 10);
      const resultMonthIndex = parseInt(values.month, 10) - 1 || 0;
      const resultDay = parseInt(values.day || 1, 10);

      const proposedValue = new Date();
      proposedValue.setFullYear(resultYear, resultMonthIndex, resultDay);
      proposedValue.setHours(0, 0, 0, 0);
      const processedValue = getProcessedValue(proposedValue);
      onChangeProps(processedValue, false);
    }
  }

  /**
   * Called when non-native date input is changed.
   */
  function onChange(event) {
    const { name: targetName, value: targetValue } = event.target;

    const setFunction = (() => {
      switch (targetName) {
        case 'day': return setDay;
        case 'month': return setMonth;
        case 'year': return setYear;
        default: throw new Error('Invalid target name.');
      }
    })();

    setFunction(targetValue);
    onChangeExternal();
  }

  const formatDate = (() => {
    const options = { year: 'numeric' };
    const level = allViews.indexOf(maxDetail);
    if (level >= 2) {
      options.month = 'numeric';
    }
    if (level >= 3) {
      options.day = 'numeric';
    }

    return getFormatter(options);
  })();

  const placeholder = (() => {
    if (format) {
      return format;
    }

    const testYear = 2017;
    const testMonthIndex = 11;
    const testDay = 11;

    const date = new Date(testYear, testMonthIndex, testDay);
    const formattedDate = formatDate(locale, date);

    const datePieces = ['year', 'month', 'day'];
    const datePieceReplacements = ['y', 'M', 'd'];

    function formatDatePiece(datePieceName, dateToFormat) {
      return getFormatter({ useGrouping: false, [datePieceName]: 'numeric' })(locale, dateToFormat).match(/\d{1,}/);
    }

    let result = formattedDate;
    datePieces.forEach((datePiece, index) => {
      const formattedDatePiece = formatDatePiece(datePiece, date);
      const datePieceReplacement = datePieceReplacements[index];
      result = result.replace(formattedDatePiece, datePieceReplacement);
    });

    return result;
  })();

  const divider = (() => {
    const dividers = placeholder.match(/[^0-9a-z]/i);
    return dividers ? dividers[0] : null;
  })();

  function onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case divider: {
        event.preventDefault();

        const { target: input } = event;
        const property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
        const nextInput = findInput(input, property);
        focus(nextInput);
        break;
      }
      default:
    }
  }

  function onKeyUp(event) {
    const { key, target: input } = event;

    const isNumberKey = !isNaN(parseInt(key, 10));

    if (!isNumberKey) {
      return;
    }

    const { value: inputValue } = input;
    const max = input.getAttribute('max');

    /**
     * Given 1, the smallest possible number the user could type by adding another digit is 10.
     * 10 would be a valid value given max = 12, so we won't jump to the next input.
     * However, given 2, smallers possible number would be 20, and thus keeping the focus in
     * this field doesn't make sense.
     */
    if ((inputValue * 10 > max) || (inputValue.length >= max.length)) {
      const property = 'nextElementSibling';
      const nextInput = findInput(input, property);
      focus(nextInput);
    }
  }

  const commonInputProps = {
    className,
    disabled,
    maxDate: maxDate || defaultMaxDate,
    minDate: minDate || defaultMinDate,
    onChange,
    onKeyDown,
    onKeyUp,
    // This is only for showing validity when editing
    required: required || isCalendarOpen,
  };

  /**
   * Called when native date input is changed.
   */
  function onChangeNative(event) {
    const { value: inputValue } = event.target;

    if (!onChangeProps) {
      return;
    }

    const processedValue = inputValue ? (() => {
      const [yearString, monthString, dayString] = inputValue.split('-');
      const resultYear = parseInt(yearString, 10);
      const resultMonthIndex = parseInt(monthString, 10) - 1 || 0;
      const resultDay = parseInt(dayString, 10) || 1;

      const proposedValue = new Date();
      proposedValue.setFullYear(resultYear, resultMonthIndex, resultDay);
      proposedValue.setHours(0, 0, 0, 0);

      return proposedValue;
    })() : null;

    onChangeProps(processedValue, false);
  }

  function onClick() {
    if (event.target === event.currentTarget) {
      // Wrapper was directly clicked
      const firstInput = event.target.children[1];
      focus(firstInput);
    }
  }

  function renderNativeInput() {
    return (
      <NativeInput
        key="date"
        ariaLabel={nativeInputAriaLabel}
        disabled={disabled}
        maxDate={maxDate || defaultMaxDate}
        minDate={minDate || defaultMinDate}
        name={name}
        onChange={onChangeNative}
        required={required}
        value={value}
        valueType={valueType}
      />
    );
  }

  function renderDay(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }

    const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;

    return (
      <DayInput
        key="day"
        {...commonInputProps}
        ariaLabel={dayAriaLabel}
        autoFocus={index === 0 && autoFocus}
        month={month}
        placeholder={dayPlaceholder}
        showLeadingZeros={showLeadingZerosFromFormat || showLeadingZeros}
        value={day}
        year={year}
        itemRef={dayInput}
      />
    );
  }

  function renderMonth(currentMatch, index) {
    if (currentMatch && currentMatch.length > 4) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }

    if (currentMatch.length > 2) {
      return (
        <MonthSelect
          key="month"
          {...commonInputProps}
          ariaLabel={monthAriaLabel}
          autoFocus={index === 0 && autoFocus}
          locale={locale}
          placeholder={monthPlaceholder}
          short={currentMatch.length === 3}
          value={month}
          year={year}
          itemRef={monthInput}
        />
      );
    }

    const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;

    return (
      <MonthInput
        key="month"
        {...commonInputProps}
        ariaLabel={monthAriaLabel}
        autoFocus={index === 0 && autoFocus}
        placeholder={monthPlaceholder}
        showLeadingZeros={showLeadingZerosFromFormat || showLeadingZeros}
        value={month}
        year={year}
        itemRef={monthInput}
      />
    );
  }

  function renderYear(currentMatch, index) {
    return (
      <YearInput
        key="year"
        {...commonInputProps}
        ariaLabel={yearAriaLabel}
        autoFocus={index === 0 && autoFocus}
        placeholder={yearPlaceholder}
        value={year}
        valueType={valueType}
        itemRef={yearInput}
      />
    );
  }

  function renderCustomInputs() {
    const elementFunctions = {
      d: renderDay,
      M: renderMonth,
      y: renderYear,
    };

    const allowMultipleInstances = typeof format !== 'undefined';
    return renderCustomInputsHelper(placeholder, elementFunctions, allowMultipleInstances);
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div
      className={className}
      onClick={onClick}
    >
      {renderNativeInput()}
      {renderCustomInputs()}
    </div>
  );
}

DateInput.defaultProps = {
  maxDetail: 'month',
  name: 'date',
  returnValue: 'start',
};

const isValue = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date),
]);

DateInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string.isRequired,
  dayAriaLabel: PropTypes.string,
  dayPlaceholder: PropTypes.string,
  defaultIsCalendarOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  monthAriaLabel: PropTypes.string,
  monthPlaceholder: PropTypes.string,
  name: PropTypes.string,
  nativeInputAriaLabel: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  returnValue: PropTypes.oneOf(['start', 'end', 'range']),
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.oneOfType([
    isValue,
    PropTypes.arrayOf(isValue),
  ]),
  yearAriaLabel: PropTypes.string,
  yearPlaceholder: PropTypes.string,
};
