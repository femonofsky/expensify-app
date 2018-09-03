import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates'; 

const now = moment();
console.log(now.format('MM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description: '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note: '',
            createdAt:  props.expense ? moment(props.expense.createdAt): moment(),
            calenderfocused: false,
            error: '',
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0.2})?$/)) {
            this.setState( () => ({ amount }));
        }
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState( () => ({ note }));
    };
    
    onDateChanged = (createdAt) => {
        if(createdAt){
            this.setState( () => ({ createdAt }));
        }
    };
    
    calenderfocusedChange = ({ focused}) => {
        this.setState( () => ({ calenderfocused:focused  }));
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
                this.setState( () => ({
                    error: "Please Provide description and amount"
                }) )
        }
        else{
            this.setState( () => ({
                error: ""
            }) );
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }

    };
    render() {
        return (
            <div>
                { this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value= {this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value= {this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date ={this.state.createdAt}
                        onDateChange= {this.onDateChanged}
                        focused={this.state.calenderfocused}
                        onFocusChange={this.calenderfocusedChange}
                        numberOfMonths={1}
                        isOutsideRange={ () => false}

                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)" 
                        onChange={this.onNoteChange}  
                        value= {this.state.note}
                    >
                    </textarea>
                    <button> Add Expense </button>
                </form>
            </div>
        );
    }
}
