import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, resetPaymentState } from '../../../redux/reducers/PaymentSlice';
import { updateBalance } from '../../../redux/reducers/authSlice';
import style from './Payment.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const flags = {
  USD: "https://dash.expargo.com/assets/img/flags/squares/usa.svg",
  TRY: "https://dash.expargo.com/assets/img/flags/squares/tr.svg",
  AZN: "https://dash.expargo.com/assets/img/flags/squares/az.svg",
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
      fontFamily: 'Arial, sans-serif',
      padding: '10px 12px',
    },
    invalid: { color: '#9e2146' },
  },
};

const Payment = ({ onBack, onSuccess }) => {
  const dispatch = useDispatch();

  // Redux state-dən lazım olan məlumatlar
  const paymentResult = useSelector(state => state.payment.paymentResult);
  const lastPayment = useSelector(state => state.payment.lastPayment);
  const error = useSelector(state => state.payment.error);
  const loading = useSelector(state => state.payment.loading);
  const userId = useSelector(state => state.auth.user?._id);

  const stripe = useStripe();
  const elements = useElements();

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [cardName, setCardName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');  // Mesaj modalı üçün

  useEffect(() => {
    if (paymentResult && lastPayment?.balance !== undefined) {
      // Balansı redux-da update et
      dispatch(updateBalance(lastPayment.balance));
      dispatch(resetPaymentState());

      // Mesaj modalını göstər
      setMessage(paymentResult);
    }
  }, [paymentResult, lastPayment, dispatch]);

  useEffect(() => {
    if (error) {
      setMessage('');
      alert(error);
      dispatch(resetPaymentState());
    }
  }, [error, dispatch]);

  const handleCurrencyClick = (currency) => setSelectedCurrency(currency);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Zəhmət olmasa düzgün məbləğ daxil edin.");
      return;
    }

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name: cardName },
    });

    if (stripeError) {
      alert(stripeError.message);
      return;
    }

    dispatch(createPayment({
  userId,
  amount: Number(amount),
  paymentMethodId: paymentMethod.id,
  currency: selectedCurrency,
    }));
  };

  // OK basanda mesaj modalını bağla və onSuccess çağır
  const handleOkClick = () => {
    setMessage('');
    if (onSuccess) {
      onSuccess(lastPayment?.amount || Number(amount)); // Ödəniş məbləği
    }
  };

  return (
    <>
      <div className={style.modalBackdrop}>
        <div className={style.paymentModal}>
          <div className={style.header}>
            <IoIosArrowBack onClick={onBack} />
            <h2>Balans artır</h2>
          </div>
          <div className={style.currencySelector}>
            {Object.entries(flags).map(([code, url]) => (
              <div
                key={code}
                className={`${style.currencyItem} ${selectedCurrency === code ? style.active : ''}`}
                onClick={() => handleCurrencyClick(code)}
              >
                <img src={url} alt={code} />
                <span>{code}</span>
              </div>
            ))}
          </div>
          <div className={style.form}>
            <label>Kart sahibinin adı</label>
            <input
              type="text"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              placeholder="Kart sahibinin adı"
            />

            <label>Məbləğ</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Məbləğ daxil edin"
              min="0.01"
              step="0.01"
            />

            <label>Kart məlumatları</label>
            <div className={style.cardElementContainer}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Ödəniş edilir...' : 'Ödənişi təsdiqlə'}
            </button>

            {message && <p className={style.message}>{message}</p>}

            <div className={style.info}>
              <IoInformationCircleOutline />
              <span>Ödəniş məlumatlarınız təhlükəsiz saxlanılır və SSL ilə qorunur.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mesaj modalı */}
      {message && (
        <div className={style.messageModal}>
          <p>{message}</p>
          <button onClick={handleOkClick}>OK</button>
        </div>
      )}
    </>
  );
};

export default Payment;
