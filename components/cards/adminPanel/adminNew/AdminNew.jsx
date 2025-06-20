import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNews, createNews, updateNews, deleteNews
} from '../../../../redux/reducers/NewsSlice';
import NewsForm from '../../newsForm/NewsForm';

const AdminNews = () => {
  const dispatch = useDispatch();
  const { newsList, loading, error } = useSelector(state => state.news);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleSave = (data) => {
    if (editingNews) {
      dispatch(updateNews({ id: editingNews._id, newsData: data }));
      setEditingNews(null);
    } else {
      dispatch(createNews(data));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Xəbəri silmək istədiyinizə əminsiniz?')) {
      dispatch(deleteNews(id));
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">📰 Xəbərlər</h2>
      <NewsForm onSave={handleSave} editingNews={editingNews} onCancel={() => setEditingNews(null)} />
      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error?.message || error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Başlıq</th>
              <th className="border px-4 py-2">Məzmun</th>
              <th className="border px-4 py-2">Şəkil</th>
              <th className="border px-4 py-2">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map(news => (
              <tr key={news._id}>
                <td className="border px-4 py-2">{news.title}</td>
                <td className="border px-4 py-2">{news.content}</td>
                <td className="border px-4 py-2">
                  {news.image ? <img src={news.image} alt="news" className="w-20 h-20 object-cover" /> : 'Yoxdur'}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button onClick={() => setEditingNews(news)} className="bg-yellow-400 px-3 py-1 rounded">Redaktə</button>
                  <button onClick={() => handleDelete(news._id)} className="bg-red-500 text-white px-3 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminNews;
