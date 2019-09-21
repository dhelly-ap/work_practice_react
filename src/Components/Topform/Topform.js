import React from 'react';
// import ReactDOM from 'react-dom';
import "./Topform.css"

export default class TopForm extends React.Component {
    constructor(props) {
        super(props);
        TopForm.onKeyDownChange = TopForm.onKeyDownChange.bind(this);
        this.onInputPeriodClick = this.onInputPeriodClick.bind(this);
        this.onInputPeriodChange = this.onInputPeriodChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.state = {
            input_period_result: "1 год 1 месяц",
        };
    }
    handleFocus (e){
        console.log(e.target.value);
        console.log(typeof e.target.value);

    }
    // shouldComponentUpdate(nextProps) {
    //     if (typeof this.props.input_money === "number")
    //         return true;
    //     return false;
    // }

    static onKeyDownChange(e){
        if (!((e.key >= '0' && e.key <= '9')
            || e.key === 'ArrowLeft'
            || e.key === 'ArrowRight'
            || e.key === 'ArrowUp'
            || e.key === 'ArrowDown'
            || e.key === 'Delete'
            || e.key === 'Tab'
            || e.key === 'Backspace'))
            e.preventDefault();
    };

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
           onKeyDownChange={TopForm.onKeyDownChange}
           onInputPeriodChange={this.onInputPeriodChange}
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
        const { checkboxes, input_money } = this.props;

        return(
            <div className={'wrap-head'}>
                <div className={'wrap-inputs'} >
                    <div className={'money'}>
                        <div className={'input'}>
                            <label>Хочу вложить</label>
                            <input className={"input-money"}
                                   onChange={this.props.onInputMoney}
                                   onKeyDown={TopForm.onKeyDownChange}
                                   onBlur={this.props.handleBlurChange}
                                   // value={input_money.toLocaleString()}
                                   // onFocus={this.handleFocus}
                                   value={input_money}
                            />
                            <select className={'currency'}>
                                <option>₽</option>
                                <option>$</option>
                            </select>
                        </div>
                        <div className={'sign'}>
                            от 30 000 ₽ или от 1 000 $
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
                            <span className={'sign'}>1 мес</span>
                            <span className={'sign'}>3 года</span>
                        </div>
                    </div>
                </div>
                <div className={'checkboxes'}>
                    <div className={'conditions'}>Дополнительные условия</div>
                    {checkboxes.map((item, index) =>
                        <Checkboxes
                            key={index}
                            checkbox={item.text}
                            index={item.id}
                            onCheckChange={this.props.onCheckChange}/>)}
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
            <div className={'wrap-box'}>
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
        this.focusTextInput = this.focusTextInput.bind(this);
        this.textInput = React.createRef();
        this.state = {
            input_value: this.props.result,
            month: "месяцев"
        };
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
        if (value > 37)
            value = 36;
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
                    onKeyDown={TopForm.onKeyDownChange}
                    onChange={this.handleChange}
                    ref={this.textInput}
                    onBlur={this.handleBlur}
                />
                <span>{this.state.month}</span>
            </div>
        )
    }
}