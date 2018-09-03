import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses'; 
import { filters, altFilters } from '../fixtures/filters'; 

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach( () => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
         filters={filters}
         setTextFilter={setTextFilter}
         sortByDate={sortByDate}
         sortByAmount={sortByAmount}
         setStartDate={setStartDate}
         setEndDate={setEndDate}
        />);
})

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({ 
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle Text change', () => {
    const text = "Love";
    wrapper.find('input').prop('onChange')({ target: { value: text} });
    expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test('should sort by date', () => {
    const text = "date";
    wrapper.setProps({ 
        filters: altFilters
    });
    wrapper.find('select').prop('onChange')({ target: { value: text} });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const text = "amount";
    wrapper.find('select').simulate('change',{ target: { value: text} });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(4, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle onChange Focused ', () => {
    const changeFocused = true;
    wrapper.find('DateRangePicker').prop('onFocusChange')(changeFocused);
    expect(wrapper.state('calenderFocused')).toBe(changeFocused);
});

