import React, { useState } from 'react';
import axios from 'axios';
import style from './Balance.module.scss';
import StripeWrapper from '../payment/StripeWrapper';

const Balance = ({ orders, totals, onClose, onConfirmOrder }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [balance, setBalance] = useState(150); // Backend-dən də gətirilə bilər
  const [paymentMessage, setPaymentMessage] = useState(null); // Balans artımı mesajı üçün

  const totalAmount = parseFloat(totals?.grandTotal) || 0;
  const remainingDebt = (totalAmount - balance).toFixed(2);

  const handlePaymentSuccess = (addedAmount) => {
    const newBalance = balance + addedAmount;
    setBalance(newBalance);

    // Balans artımı mesajı göstər
    setPaymentMessage(`${addedAmount.toFixed(2)} ₺ balansınıza əlavə edildi.`);

    // Ödəniş ekranını bağla
    setShowPayment(false);
  };

  const confirmOrder = async () => {
    try {
      const orderData = { orders, totalAmount };
      await axios.post('http://localhost:7777/api/orders/confirm', orderData);
      alert('✅ Sifariş təsdiqləndi!');
      onConfirmOrder && onConfirmOrder();
    } catch (error) {
      console.error(error);
      alert('❌ Sifarişi təsdiqləmək mümkün olmadı.');
    }
  };

  // Mesaj modalındakı OK basanda mesajı bağla və lazım olsa sifarişi təsdiqlə
  const handleCloseMessage = () => {
    setPaymentMessage(null);

    // Əgər balans artımı borcu tam ödəyirsə, sifarişi təsdiqlə
    if (totalAmount - balance <= 0) {
      confirmOrder();
    }
  };

  if (showPayment) {
    return (
      <StripeWrapper
        onBack={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <>
      <div className={style.modalBackdrop}>
        <div className={style.balanceModal}>
          <h2>Sifariş xülasəsi</h2>

          {orders.length === 1 ? (
            <p>
              Məhsul linki:{' '}
              <a href={orders[0].productLink} target="_blank" rel="noreferrer">
                {orders[0].productLink}
              </a>
            </p>
          ) : (
            <p>Sifarişlər ümumi xülasəsi.</p>
          )}

          <p>Toplam məbləğ: {totalAmount.toFixed(2)} ₺</p>
          <p>Cari balans: {balance.toFixed(2)} ₺</p>
          <p>
            Qalıq borc:{' '}
            {remainingDebt > 0 ? <b>{remainingDebt} ₺</b> : <b>Yoxdur</b>}
          </p>

          {remainingDebt > 0 && (
            <p>⚠️ Balansınızda kifayət qədər vəsait yoxdur. Zəhmət olmasa balans artırın.</p>
          )}

          <div className={style.buttons}>
            <button onClick={onClose}>Geri qayıt</button>
            {remainingDebt > 0 ? (
              <button onClick={() => setShowPayment(true)}>Balans artır</button>
            ) : (
              <button onClick={confirmOrder}>Sifarişi təsdiqlə</button>
            )}
          </div>
        </div>
      </div>

      {/* Balans artımı mesajı modalı */}
      {paymentMessage && (
        <div className={style.messageModal}>
          <p>{paymentMessage}</p>
          <button onClick={handleCloseMessage}>OK</button>
        </div>
      )}
    </>
  );
};

export default Balance;
