// src/components/order/balance/Balance.jsx
import React, { useState } from 'react';
import StripeWrapper from '../payment/StripeWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance } from '../../../redux/reducers/authSlice';
import style from './Balance.module.scss';
import axios from 'axios';

const Balance = ({ orders, totals, onClose, onConfirmOrder }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  if (!totals || typeof totals.grandTotal === 'undefined') {
    return null;
  }

  const totalAmount = parseFloat(totals.grandTotal) || 0;
  const balance = user?.balance ?? 0;
  const remaining = (totalAmount - balance).toFixed(2);

  const [showPay, setShowPay] = useState(false);
  const [message, setMessage] = useState(null);

  // Stripe-dan sonra balans uğurla artanda çağırılır
  const handlePaymentSuccess = (amt) => {
    const newBal = balance + amt;
    dispatch(updateBalance(newBal));
    setMessage(`${amt.toFixed(2)} ₺ balansınıza əlavə edildi.`);
    setShowPay(false);
  };

  // Backend-ə balans artırmaq üçün PATCH istəyi
  const handleConfirm = async () => {
    try {
     const response = await axios.patch(
  `http://localhost:7777/api/users/${user._id}/balance`,
  { amount: Number(remaining) },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
);

      ;

      // Backenddən gələn yeni balansı redux state-də saxla
      dispatch(updateBalance(response.data.balance));
      setMessage("Sifarişiniz qəbul olundu.");
    } catch (error) {
      console.error('Balance update failed:', error);
      setMessage("Balans yenilənərkən xəta baş verdi.");
    }
  };

  const handleCloseMsg = () => {
    setMessage(null);
    if (onConfirmOrder) onConfirmOrder();
    window.location.reload();
  };

  if (showPay) {
    return (
      <StripeWrapper
        onBack={() => setShowPay(false)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <>
      <div className={style.modalBackdrop}>
        <div className={style.balanceModal}>
          <h2>Sifariş tamamla</h2>

          {/* {orders.length === 1 ? (
            <p>
              Məhsul linki:{' '}
              <a href={orders[0].productLink} target="_blank" rel="noreferrer">
                {orders[0].productLink}
              </a>
            </p>
          ) : (
            <p>Çoxlu sifariş xülasəsi</p>
          )} */}

          <p>Toplam məbləğ: {totalAmount.toFixed(2)} ₺</p>
          <p>
            Cari balans:{' '}
            {typeof user?.balance === 'number' ? user.balance.toFixed(2) : '0.00'} ₺
          </p>
          <span>Qalıq borc: {remaining > 0 ? `${remaining} ₺` : 'Yoxdur'}</span>

                 <h5>Balansınızda kifayət qədər məbləğ yoxdursa zəhmət olmasa balans artır düyməsinə basın</h5>


          <div className={style.buttons}>
            <button onClick={onClose}>Geri qayıt</button>

            {remaining > 0 ? (
              <button onClick={() => setShowPay(true)} className={style.btn1}>Balans artır</button>
            ) : (
              <button onClick={handleConfirm} className={style.btn2}>Təsdiqlə</button>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div className={style.messageModal}>
          <p>{message}</p>
          <button onClick={handleCloseMsg}>OK</button>
        </div>
      )}
    </>
  );
};

export default Balance;
