import React from 'react';
import style from './Order.module.scss'
const Order = () => {
    return (
        <div className={style.order}>
            <div className={style.container}>
                <h2>Sifariş artır</h2>
                <p>Sifariş №1</p>
                <div className={style.orderCards}>
                <div className={style.orderContainer}>
                    <div className={style.inp}>
                        <h2>Məhsul linki</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün: http://trendyol.com/...' />
                    </div>
                    <div className={style.inp}>
                        <h2>Ədəd</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün:3' />
                    </div>
                    <div className={style.inp}>
                        <h2>Ölçü</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün: S, 36' />
                    </div>
                    <div className={style.inp}>
                        <h2>Rəng</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün: Ağ , Black' />
                    </div>
                    <div className={style.inp}>
                        <h2>Daxili kargo ( TRY )</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün: 14.99' />
                    </div>
                    <div className={style.inp}>
                        <h2>Məhsul qiyməti ( TRY )(1 ədəd)</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Misal üçün: 250.00' />
                    </div>
                    <div className={style.inp}>
                        <h2>Xüsusi qeydlər</h2>
                        {/* sehv olanda  (Düzgün qeyd edin.) cixsin */}
                        <input type="text" placeholder='Zəruri qeydlər' />
                    </div>
                    <div className={style.btn}>
                      <button>Hesabla</button>
                      <button>Link əlave et</button>
                    </div>
                </div>
                <div className={style.orderCalculator}>
                  <div className={style.calculator}>
                  <p>Qiymət:                 t0.00</p>
                  <p>Daxili kargo:                 t0.00</p>
                  <p>Bank xərci:                 t0.00</p>
                  <p>Toplam:                 t0.00</p>
                  </div>
                  <button>Sifarişi tamamla</button>
                </div>
                </div>

            </div>
        </div>
    );
}

export default Order;
