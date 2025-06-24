import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Packages.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import packages from './images/packages.png';
import { IoIosArrowBack } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
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
        <div className={style.text}>
        <h2><IoIosArrowBack /> Bağlamalarım</h2>
        <IoFilter />
        </div>
<div className={style.filter}>
<span>Filtr</span> <select name="" id="">
  <option value="">Filtr seçilməyib</option>
  <option value="">Yoldadır</option>
  <option value="">Çatdırılmadadır</option>
  <option value="">Yaradildi</option>
  <option value="">Təhvil verildi</option>
</select>
</div>
        <div className={style.packContainer}>
          {orders.length === 0 ? (
            <div className={style.pack}>
              <img src={packages} alt="" />
              <p>Heç bir bağlama tapılmadı.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className={style.parcelCard}>
                <img src="https://expargo.com/assets/icon/asset6.svg" alt="" />
                <div className={style.packCard}>
                <p><strong>Sifariş №:</strong> {order.orderNumber || '—'}</p>
                <p><strong>Ədəd:</strong> {order.quantity}</p>
                <p><strong>Toplam:</strong> {order.totalPrice} ₺</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Tarix:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
