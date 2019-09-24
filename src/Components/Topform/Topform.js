import React from 'react';
import Form from "../Form/Form"
import "./Topform.css"

export default class TopForm extends React.Component {
    constructor(props) {
        super(props);
        this.onInputPeriodClick = this.onInputPeriodClick.bind(this);
        this.onInputPeriodChange = this.onInputPeriodChange.bind(this);
        this.state = {
            input_period_result: "1 год 1 месяц",
        };
    }

    onInputPeriodClick (e){
       let value = e.target.innerHTML;
       let value_arr = value.split(" ");
       let result;
       if (value_arr[2])
           result = Number(value_arr[0]) * 12 + Number(value_arr[2]);
       else
           result = Number(value_arr[0]);

       value = <InputPeriod
           result={result}
           onInputPeriodChange={this.onInputPeriodChange}
           period_to={this.props.period_to}
       />;
        this.setState({input_period_result: value});
    }

    onInputPeriodChange(value){
        let year = Math.floor(value / 12);
        let month = value - (year * 12);
        let year_str = "год";
        let month_str = "месяцев";

        if ((month === 0 && !year) || (month === 1 && !year)) {
            this.setState({input_period_result: "1 месяц"});
            return;
        }
        else if (month === 1)
            month_str = "месяц";
        else if (month > 1 && month < 5){
            if (!year){
                month_str = "месяца";
                this.setState({input_period_result: `${month} ${month_str}`});
                return;
            }
            else
                month_str = "месяца";
        }
        else if (!month){
            if (year > 1){
                year_str = "года";
            }
            console.log(month);
            this.setState({input_period_result: `${year} ${year_str}`});
            return;
        }
        if (year > 1)
            year_str = "года";
        else if (!year){
            this.setState({input_period_result: `${month} ${month_str}`});
            return;
        }
        this.setState({input_period_result: `${year} ${year_str} ${month} ${month_str}`});
    }

    render() {
        const { checkboxes, input_money, sum_min, period_from, period_to } = this.props;

        return(
            <div className={'wrap-head'}>
                <div className={'wrap-inputs'} >
                    <div className={'money'}>
                        <div className={'input'}>
                            <label>Хочу вложить</label>
                            <input className={"input-money"}
                                   onChange={this.props.onInputMoney}
                                   onKeyDown={this.props.onKeyDownChange}
                                   onBlur={this.props.onBlurChange}
                                   value={input_money.toLocaleString()}
                            />
                            <div className={'currency'}>
                                <span>₽</span>
                            </div>
                        </div>
                        <div className={'sign'}>
                            <span>от </span>
                            <span>{sum_min}</span>
                            <span> ₽</span>
                        </div>
                    </div>
                    <div className={'period'}>
                        <div className={'input'}>
                            <label>На срок</label>
                            <span className={"input-period"}
                                  onClick={this.onInputPeriodClick}>
                                {this.state.input_period_result}
                            </span>
                        </div>
                        <div className={'wrap-sign'}>
                            <span className={'sign'}>
                                <span>{period_from}</span>
                                <span> мес</span>
                            </span>
                            <span className={'sign'}>
                                <span>{period_to/12}</span>
                                <span> года</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={'checkboxes'}>
                    <label className={'condition_label'} htmlFor={'condition_check'}>Дополнительные условия</label>
                    <input className={'condition_check'} id={'condition_check'} type={'checkbox'}/>
                    <div className={'wrap-box'}>
                    {checkboxes.map((item, index) =>
                        <Checkboxes
                            key={index}
                            checkbox={item.text}
                            index={item.id}
                            onCheckChange={this.props.onCheckChange}/>)}
                    </div>
                </div>
            </div>);
}};

class Checkboxes extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let check = e.target.checked;
        let check_id = e.target.id;
        this.props.onCheckChange(check, check_id);
    }

    render () {
        const { checkbox, index } = this.props;
    return (
            <div className={'box'}>
                <input
                    className={'check'}
                    type={'checkbox'}
                    id={index}
                    onChange={this.handleChange}
                />
                <label
                    className={'label'}
                    htmlFor={index}
                >
                    {checkbox}
                </label>
            </div>
    );
    }
}
class InputPeriod extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.onKeyDownChange = this.onKeyDownChange.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
        this.textInput = React.createRef();
        this.state = {
            input_value: this.props.result,
            month: "месяцев"
        };
    }
    onKeyDownChange (e){
        Form.onKeyDownChange(e);
        if (e.key === 'Enter')
            this.handleBlur(e);
    }
    focusTextInput() {
        this.textInput.current.focus();
    }
    componentDidMount() {
        this.focusTextInput();
    }

    handleChange(e){
        let value = e.target.value;
        value = Number(value);
        if (value > this.props.period_to)
            value = this.props.period_to;
        this.setState({input_value: value});
        if (value === 1)
            this.setState({month: "месяц"});
        else if (value > 1 && value < 5)
            this.setState({month: "месяца"});
        else
            this.setState({month: "месяцев"});
    }

    handleBlur(e){
        let value = e.target.value;
        this.props.onInputPeriodChange(value);
    }

    render() {
        return(
            <div>
                <input
                    className={'input-period-value'}
                    value={this.state.input_value}
                    onKeyDown={this.onKeyDownChange}
                    onChange={this.handleChange}
                    ref={this.textInput}
                    onBlur={this.handleBlur}
                />
                <span>{this.state.month}</span>
            </div>
        )
    }
}