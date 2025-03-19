import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import 'rsuite/DateRangePicker/styles/index.css';  

const DateRangeForm = (props) => {
    const [dateRange, setDateRange] = useState(null);

    const predefinedRanges = [
        {
            label: 'Today',
            value: [new Date(), new Date()],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Yesterday',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'This week',
            value: [startOfWeek(new Date()), endOfWeek(new Date())],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Last week',
            closeOverlay: false,
            value: value => {
                const [start = new Date()] = value || [];
                return [
                    addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
                    addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
                ];
            },
            appearance: 'subtle'
        },
        {
            label: 'Next week',
            closeOverlay: false,
            value: value => {
                const [start = new Date()] = value || [];
                return [
                    addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
                    addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
                ];
            },
            appearance: 'subtle'
        },
        {
            label: 'Last 7 days',
            value: [subDays(new Date(), 6), new Date()],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Last 30 days',
            value: [subDays(new Date(), 29), new Date()],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'This month',
            value: [startOfMonth(new Date()), new Date()],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Last month',
            value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'This year',
            value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Last year',
            value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
            placement: 'bottom',
            appearance: 'subtle'
        },
        {
            label: 'Clear',
            value: null,
            placement: 'bottom',
            appearance: 'default'
        },
    ];

    const handleSelect = (range) => {
        setDateRange(range);
        props.onRangeChange(range);
    }

    return (
        <DateRangePicker
            format="MM/dd/yyyy"
            value={dateRange}
            onChange={handleSelect}
            showOneCalendar
            ranges={predefinedRanges}
        />
    )
};

export default DateRangeForm;
