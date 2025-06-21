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

  const [showPay, setShowPay] = useState(false);
  const [message, setMessage] = useState(null);

  if (!totals || typeof totals.grandTotal === 'undefined') return null;

  const totalAmount = parseFloat(totals.grandTotal) || 0;
  const balance = user?.balance ?? 0;
  const remaining = (totalAmount - balance).toFixed(2);

  // Stripe uğurlu olduqdan sonra balansı yenilə
  const handlePaymentSuccess = async (amt) => {
    try {
      // Backend balans artırma
      await axios.patch(
        `http://localhost:7777/api/users/${user._id}/balance`,
        { amount: amt },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const newBal = balance + amt;
      dispatch(updateBalance(newBal));
      setMessage(`${amt.toFixed(2)} ₺ balansınıza əlavə edildi.`);
      setShowPay(false);
    } catch (err) {
      console.error("❌ Stripe sonrası balans artırılmadı:", err);
      setMessage("Balans artırılarkən xəta baş verdi.");
    }
  };

  // Sifarişi təsdiqlə və göndər
  const handleConfirm = async () => {
    try {
      const payload = {
        orders,
        productTotal: totals.productTotal,
        cargoTotal: totals.cargoTotal,
        bankFee: totals.bankFee,
        grandTotal: totals.grandTotal,
        currency: "TRY"
      };

      const response = await axios.post(
        "http://localhost:7777/api/orders",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      const newBalance = balance - totalAmount;
      dispatch(updateBalance(newBalance));
      setMessage("✅ Sifariş uğurla göndərildi.");
    } catch (error) {
      console.error('❌ Sifariş göndərilmədi:', error);
      setMessage("Sifariş zamanı xəta baş verdi.");
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
          <h2>Sifarişi tamamla</h2>

          <p>Toplam məbləğ: {totalAmount.toFixed(2)} ₺</p>
          <p>
            Cari balans:{" "}
            {typeof user?.balance === "number"
              ? user.balance.toFixed(2)
              : "0.00"} ₺
          </p>
          <span>
            Qalıq borc: {remaining > 0 ? `${remaining} ₺` : "Yoxdur"}
          </span>

          <h5>
            Balansınız kifayət etmirsə, balans artır düyməsinə klik edin
          </h5>

          <div className={style.buttons}>
            <button onClick={onClose}>Geri qayıt</button>

            {remaining > 0 ? (
              <button onClick={() => setShowPay(true)} className={style.btn1}>
                Balans artır
              </button>
            ) : (
              <button onClick={handleConfirm} className={style.btn2}>
                Təsdiqlə
              </button>
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
