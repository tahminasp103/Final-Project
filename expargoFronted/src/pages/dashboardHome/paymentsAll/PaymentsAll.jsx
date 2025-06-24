import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsByUser } from '../../../redux/reducers/PaymentSlice';
import style from './PaymentsAll.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';

const PaymentsAll = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?._id);
  const payments = useSelector(state => state.payment.payments);
  const loading = useSelector(state => state.payment.paymentsLoading);
  const error = useSelector(state => state.payment.paymentsError);

  useEffect(() => {
    if (userId) {
      dispatch(getPaymentsByUser(userId));
    }
  }, [userId, dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;

  return (
    <div className={style.all}>
        <ExpargoMenu/>
        <div className={style.container}>
      <h2>Balans Artırma Tarixçəsi</h2>
      {payments.length === 0 ? (
        <p>Hələ ki heç bir ödəniş yoxdur.</p>
      ) : (
        <ul className={style.paymentList}>
          {payments.map((payment) => (
            <li key={payment._id} className={style.paymentItem}>
              <p><strong>Məbləğ:</strong> {payment.amount} {payment.currency}</p>
              <p><strong>Tarix:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
        </div>

    </div>
  );
};

export default PaymentsAll;
