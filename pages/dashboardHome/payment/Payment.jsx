import React from 'react';
import style from './Payment.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
const Payment = () => {
    return (
        <div className={style.payment}>
            <div className={style.container}>
                <h2><IoIosArrowBack /> Balans artır <IoInformationCircleOutline /></h2>
                <h3>Balansım</h3>
                <div className={style.btn}>
                    <button>0.00<img src="https://dash.expargo.com/assets/img/flags/squares/usa.svg" alt="" /></button>

                    <button>0.00<img src="https://dash.expargo.com/assets/img/flags/squares/tr.svg" alt="" /></button>

                    <button>0.00<img src="https://dash.expargo.com/assets/img/flags/squares/az.svg" alt="" /></button>
                </div>
                <div className={style.cardBtn}>
                    <button>Kart ilə</button>
                    <button>Promo kod ilə</button>
                </div>
                <div className={style.inp}>
                    <input type="text" placeholder='Kart üzərindəki ad' />
                </div>
                <div className={style.inp}>
                    <input type="text" placeholder='Kart nömrəsi ilə' />
                </div>
                <div className={style.inp}>
                    <input type="text" placeholder='AA/İİ' />
                </div>
                <div className={style.inp}>
                    <input type="text" placeholder='CVC' />
                </div>
                <div className={style.inp}>
                    <input type="text" placeholder='27.05' />
                </div>
               <div className={style.moneyBtn}>
                   <button><img src="https://dash.expargo.com/assets/newIcons/dollar.svg" alt="" />USD</button>
                   <button><img src="https://dash.expargo.com/assets/newIcons/try.svg" alt="" />TRY</button>
                   <button><img src="https://dash.expargo.com/assets/newIcons/azn.svg" alt="" />AZN</button>
               </div>
               <button>Təstiqlə</button>
            </div>
        </div>
    );
}

export default Payment;
