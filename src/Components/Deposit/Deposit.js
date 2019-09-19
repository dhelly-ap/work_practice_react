import React from 'react';
// import ReactDOM from 'react-dom';
import "./Deposit.css";


export default function Deposit(props) {
    const {
        title,
        description,
        img,
        rate,
        removing,
        adding,
        default_sum } = props;

    var formatter = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
    });
    const result = Math.round((default_sum * (parseFloat(rate.replace(',','.')) / 100)) + default_sum);
    return (
        <div className={'wrap-with-border-product'}>
            <div className={'wrap-product'}>
                <div className={'wrap-img'}><img src={img}/></div>
                <div className={'wrap-info'}>
                    <h3 className={'title'}>{title}</h3>
                    <div className={'description'}>{description}</div>
                    <div className={'main-info'}>
                        <div className={'result sum'}>
                            <div>Вы получите</div>
                            <div>{formatter.format(result)}</div>
                        </div>
                        <div className={'result rate'}>
                            <div>Ставка</div>
                            <div>{`${rate} %`}</div>
                        </div>
                        <div className={'result add-remove'}>
                            <div>{removing ?
                                <div className={'with'}>С частичным снятием</div> :
                                <div className={'without'}>Без частичного снятия</div>}
                            </div>
                            <div>{adding ?
                                <div className={'with'}>С пополнением</div> :
                                <div className={'without'}>Без пополнения</div>}
                            </div>
                        </div>
                    </div>
                    <button className={'open button'}>Открыть вклад</button>
                    <button className={'info button'}>Подробнее</button>
                </div>
            </div>
        </div> );
}