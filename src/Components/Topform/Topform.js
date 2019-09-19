import React from 'react';
// import ReactDOM from 'react-dom';
import "./Topform.css"

export default class TopForm extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDownChange = this.onKeyDownChange.bind(this);
        this.onInputPeriodClick = this.onInputPeriodClick.bind(this);
        this.onInputPeriodChange = this.onInputPeriodChange.bind(this);
        this.state = {
            input_period_result: "1 год 1 месяц",
            input_period_value: 13
        };
    }


    onKeyDownChange(e){
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
       let result = Number(value_arr[0]) * 12 + Number(value_arr[2]);

       value = <InputPeriod
           result={result}
           onKeyDownChange={this.state.input_period_value}
           onInputPeriodChange={this.onInputPeriodChange}
       />;

        this.setState({input_period_result: value});
    }
    onInputPeriodChange(e){
        let value = e.target.value;
        value = Number(value);
        if (value > 37)
            value = 36;
        this.setState({input_period_value: value});
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
                                   onKeyDown={this.onKeyDownChange}
                                   onBlur={this.props.onBlurChange}
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
                            <span className={'sign'}>3 мес</span>
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
    render() {
        return(
            <div>
                <input
                    className={'input-period-value'}
                    value={this.props.result}
                    onKeyDown={this.props.onKeyDownChange}
                    onChange={this.props.onInputPeriodChange}
                />
                <span>месяцев</span>
            </div>
        )
    }
}

