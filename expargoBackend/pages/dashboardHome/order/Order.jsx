import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../redux/reducers/OrderSlice';
import style from './Order.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";
import { GiTrashCan } from "react-icons/gi";
import { CiCirclePlus } from "react-icons/ci";
import Balance from '../balance/Balance';

const USD_TO_TRY = 27.5;

const Order = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([
    {
      id: Date.now(),
      productLink: '',
      quantity: '',
      size: '',
      color: '',
      internalCargo: '',
      productPrice: '',
      note: '',
      errors: {},
    },
  ]);

  const [isTRY, setIsTRY] = useState(true);
  const [totals, setTotals] = useState({ productTotal: 0, cargoTotal: 0, bankFee: 0, grandTotal: 0 });

  // Yeni state balance görünməsi üçün
  const [showBalance, setShowBalance] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][field] = value;
    updatedOrders[index].errors[field] = '';
    setOrders(updatedOrders);
  };

  const handleAddOrder = () => {
    setOrders([
      ...orders,
      {
        id: Date.now(),
        productLink: '',
        quantity: '',
        size: '',
        color: '',
        internalCargo: '',
        productPrice: '',
        note: '',
        errors: {},
      },
    ]);
  };

  const handleRemoveOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const validateOrder = (order) => {
    const errors = {};
    if (!order.productLink || !order.productLink.startsWith('http')) errors.productLink = 'Düzgün qeyd edin.';
    if (!order.quantity || isNaN(order.quantity)) errors.quantity = 'Düzgün qeyd edin.';
    if (!order.internalCargo || isNaN(order.internalCargo)) errors.internalCargo = 'Düzgün qeyd edin.';
    if (!order.productPrice || isNaN(order.productPrice)) errors.productPrice = 'Düzgün qeyd edin.';
    return errors;
  };

  const allRequiredFilledAndValid = () => {
    // Yalnız vacib inputlar yoxlanılır
    return orders.every(order => {
      const errs = validateOrder(order);
      return Object.keys(errs).length === 0;
    });
  };

  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    let productTotal = 0, cargoTotal = 0;
    const updatedOrders = orders.map((order) => {
      const errors = validateOrder(order);
      if (Object.keys(errors).length > 0) {
        return { ...order, errors };
      }

      let price = parseFloat(order.productPrice);
      const qty = parseFloat(order.quantity);
      const cargo = parseFloat(order.internalCargo);
      if (!isTRY) price = price * USD_TO_TRY;

      productTotal += price * qty;
      cargoTotal += cargo;

      return { ...order, errors: {} };
    });

    const fee = ((productTotal + cargoTotal) * 0.02).toFixed(2);
    const grandTotal = (productTotal + cargoTotal + parseFloat(fee)).toFixed(2);

    setOrders(updatedOrders);
    setTotals({
      productTotal: productTotal.toFixed(2),
      cargoTotal: cargoTotal.toFixed(2),
      bankFee: fee,
      grandTotal,
    });

    setCalculated(true);
  };

  const handleSubmit = () => {
    if (!calculated) {
      alert('Zəhmət olmasa əvvəlcə "Hesabla" düyməsinə basın.');
      return;
    }
    const validOrders = orders.filter((order) => Object.keys(validateOrder(order)).length === 0);
    if (validOrders.length === 0) return alert('Zəhmət olmasa düzgün məlumatlar daxil edin.');

    const orderData = validOrders.map((order) => ({
      ...order,
      quantity: Number(order.quantity),
      internalCargo: Number(order.internalCargo),
      productPrice: Number(order.productPrice),
      currency: isTRY ? 'TRY' : 'USD',
    }));

    dispatch(createOrder({ orders: orderData, ...totals, currency: isTRY ? 'TRY' : 'USD' }));
    setShowBalance(true); // Balance-u göstər
  };

  if (showBalance) {
    // Balance componentinə orders və totals göndərilir
    return (
      <Balance
        orders={orders}
        totals={totals}
        onClose={() => setShowBalance(false)}
      />
    );
  }

  return (
    <div className={style.order}>
      <ExpargoMenu />
      <div className={style.container}>
        <h2><IoIosArrowBack /> Sifariş artır</h2>
        <div className={style.currencyToggle}>
          <button className={isTRY ? style.active : ''} onClick={() => setIsTRY(true)}>Türkiyə</button>
          <button className={!isTRY ? style.active : ''} onClick={() => setIsTRY(false)}>ABŞ</button>
        </div>
        <div className={style.orderCards}>
          <div className={style.formContainer}>
            {orders.map((order, index) => (
              <div key={order.id} className={style.orderForm}>

                <div className={style.number}>
                  <p>Sifariş № {index + 1}</p>
                  <button onClick={() => handleRemoveOrder(order.id)}><GiTrashCan /></button>
                </div>
                <div className={style.inp}>
                  <div className={style.alert}><h2>Məhsul linki</h2>{order.errors.productLink && <span>{order.errors.productLink}</span>} </div>
                  <input value={order.productLink} onChange={(e) => handleChange(index, 'productLink', e.target.value)} placeholder="https://trendyol.com/..." />
                </div>
                <div className={style.inp}>
                  <div className={style.alert}><h2>Ədəd</h2>{order.errors.quantity && <span>{order.errors.quantity}</span>} </div>
                  <input value={order.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)} placeholder="Misal ücün: 3" />
                </div>
                <div className={style.inp}><h2>Ölçü</h2>
                  <input value={order.size} onChange={(e) => handleChange(index, 'size', e.target.value)} placeholder="Misal ücün: S, 36" />
                </div>
                <div className={style.inp}><h2>Rəng</h2>
                  <input value={order.color} onChange={(e) => handleChange(index, 'color', e.target.value)} placeholder="Misal ücün: Ağ, Black" />
                </div>
                <div className={style.inp}>
                  <div className={style.alert}><h2>Daxili kargo ({isTRY ? 'TRY' : 'USD'})</h2>  {order.errors.internalCargo && <span>{order.errors.internalCargo}</span>} </div>
                  <input value={order.internalCargo} onChange={(e) => handleChange(index, 'internalCargo', e.target.value)} placeholder="Misal ücün: 14.99" />
                </div>
                <div className={style.inp}>
                  <div className={style.alert}> <h2>Məhsul qiyməti ({isTRY ? 'TRY' : 'USD'})</h2>  {order.errors.productPrice && <span>{order.errors.productPrice}</span>} </div>
                  <input value={order.productPrice} onChange={(e) => handleChange(index, 'productPrice', e.target.value)} placeholder="Misal ücün: 250.00" />
                </div>
                <div className={style.inp}><h2>Xüsusi qeydlər</h2>
                  <input value={order.note} onChange={(e) => handleChange(index, 'note', e.target.value)} placeholder="Zəruri deyil" />
                </div>
              </div>
            ))}
            <div className={style.cardBtn}>
              <button
                onClick={handleCalculate}
                className={style.btn2}
                style={{ backgroundColor: allRequiredFilledAndValid() ? '#FFCA22' : undefined }}
              >
                Hesabla
              </button>
              <button
                onClick={handleAddOrder}
                className={style.btn1}
              >
                <CiCirclePlus /> Link əlavə et
              </button>
            </div>
          </div>
          <div className={style.orderCalculator}>
            <div className={style.calculatorContainer}>
              <h3>Qiymət:   <span>{isTRY ? '₺' : '$'} {totals.productTotal}</span> </h3>
              <h3>Daxili kargo: <span>{isTRY ? '₺' : '$'}{totals.cargoTotal}</span></h3>
              <h3>Bank xərci: <span>{isTRY ? '₺' : '$'}{totals.bankFee}</span></h3>
              <div className={style.line}>
              </div>
              <h3>Toplam: <p>{isTRY ? '₺' : '$'}{totals.grandTotal}</p> </h3>
            </div>
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: calculated ? '#42D77D' : undefined }}
              disabled={!calculated}
            >
              Sifarişi tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
