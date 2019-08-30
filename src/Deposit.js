import React from 'react';
import ReactDOM from 'react-dom';
import "./Deposit.css";


export default function Deposit(props) {
    let result = 100000;
    var formatter = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
    });

    return (
            <div className={'wrap'}>
                <div className={'wrap-img'}><img src={props.img} /></div>
                <div className={'wrap-info'}>
                    <h3 className={'title'}>{props.title}</h3>
                    <div className={'description'}>{props.description}</div>
                    <div className={'main-info'}>
                        <div className={'result sum'}>
                            <div>Вы получите</div>
                            <div>{formatter.format((result*(props.rate/100)) + result)}</div>
                        </div>
                        <div className={'result rate'}>
                            <div>Ставка</div>
                            <div>{`${props.rate} %`}</div>
                        </div>
                        <div className={'result add-remove'}>
                            <div>{props.removing ?
                                <div className={'check'}>С частичным снятием</div> :
                                <div className={'denial'}>Без частичного снятия</div>}
                            </div>
                            <div>{props.adding ?
                                <div className={'check'}>С пополнением</div> :
                                <div className={'denial'}>Без пополнения</div>}
                            </div>
                        </div>
                    </div>
                    <button className={'open button'}>Открыть вклад</button>
                    <button className={'info button'}>Подробнее</button>
                </div>
            </div>
    );
}