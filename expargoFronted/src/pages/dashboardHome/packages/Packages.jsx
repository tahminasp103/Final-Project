import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Packages.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import packages from './images/packages.png';
import { IoIosArrowBack } from "react-icons/io";

const Packages = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(
          'http://localhost:7777/api/orders/my-orders',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error('❌ Bağlamalar alınmadı:', err);
      }
    })();
  }, []);

  return (
    <div className={style.packages}>
      <ExpargoMenu />
      <div className={style.container}>
        <h2><IoIosArrowBack /> Bağlamalarım</h2>
        <div className={style.packContainer}>
          {orders.length === 0 ? (
            <div className={style.pack}>
              <img src={packages} alt="" />
              <p>Heç bir bağlama tapılmadı.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className={style.parcelCard}>
                <p><strong>Sifariş №:</strong> {order.orderNumber || '—'}</p>
                <p>
                  <strong>Link:</strong>{' '}
                  <a href={order.productLink} target="_blank" rel="noreferrer">
                    Məhsula keçid
                  </a>
                </p>
                <p><strong>Ədəd:</strong> {order.quantity}</p>
                <p><strong>Qiymət:</strong> {order.productPrice} ₺</p>
                <p><strong>Toplam:</strong> {order.totalPrice} ₺</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Tarix:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
