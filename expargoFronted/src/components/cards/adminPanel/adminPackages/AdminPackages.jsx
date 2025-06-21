import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './AdminPackages.module.scss';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Lokal dəyişiklikləri saxlamaq üçün state
  const [updates, setUpdates] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:7777/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPackages(data);
      } catch (err) {
        setError('Bağlamalar yüklənmədi');
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  const handleChange = (id, field, value) => {
    setUpdates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const updateStatus = async (id) => {
    if (!updates[id]) return;

    const { status = '', trackingLink = '' } = updates[id];

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:7777/api/orders/${id}`,
        { status, trackingLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPackages(prev =>
        prev.map(pkg =>
          pkg._id === id ? { ...pkg, status, trackingLink } : pkg
        )
      );
      setUpdates(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      alert('Status yenilənmədi');
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className={style.adminPackages}>
      <h2>Bağlamalar İdarəetmə</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>İstifadəçi</th>
            <th>Link</th>
            <th>Miqdarı</th>
            <th>Status</th>
            <th>Tarix</th>
            <th>Yenilə</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, idx) => (
            <tr key={pkg._id}>
              <td>{idx + 1}</td>
              <td>{pkg.user?.name || pkg.user}</td>
              <td>
                <a href={pkg.productLink} target="_blank" rel="noopener noreferrer">
                  Məhsul
                </a>
              </td>
              <td>{pkg.quantity}</td>
              <td>
                <select
                  value={updates[pkg._id]?.status ?? pkg.status ?? ''}
                  onChange={(e) => handleChange(pkg._id, 'status', e.target.value)}
                >
                  <option value="">Seç</option>
                  <option value="Yaradıldı">Yaradıldı</option>
                  <option value="Yoldadır">Yoldadır</option>
                  <option value="Təhvil verildi">Təhvil verildi</option>
                  <option value="Çatdırıldı">Çatdırıldı</option>
                </select>
              </td>
              <td>{new Date(pkg.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => updateStatus(pkg._id)}>Yenilə</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPackages;
