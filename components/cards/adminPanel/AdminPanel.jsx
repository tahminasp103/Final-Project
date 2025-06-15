import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchNews, createNews, updateNews, deleteNews
} from '../../../redux/reducers/NewsSlice';
import {
  fetchBranches, createBranch, updateBranch, deleteBranch
} from '../../../redux/reducers/BranchSlice';
import {
  fetchPrices, addPrice, updatePrice, deletePrice, clearPriceError
} from '../../../redux/reducers/priceSlice';

import NewsForm from '../newsForm/NewsForm';
import BranchForm from '../branchForm/BranchForm';
import BranchList from '../branchList/BranchList';

import PriceForm from '../priceForm/PriceForm';
import PriceList from '../priceList/PriceList';

const AdminPanel = () => {
  const dispatch = useDispatch();

  // News
  const { newsList, loading: newsLoading, error: newsError } = useSelector(state => state.news);
  const [editingNews, setEditingNews] = useState(null);

  // Branches
  const { branch: branchList, loading: branchLoading, error: branchError } = useSelector(state => state.branch);
  const [editingBranch, setEditingBranch] = useState(null);

  // Prices
  const { prices, loading: priceLoading, error: priceError } = useSelector(state => state.prices);
  const [editingPrice, setEditingPrice] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchBranches());
    dispatch(fetchPrices());
  }, [dispatch]);

  // News handlers
  const handleSaveNews = (newsData) => {
    if (editingNews) {
      dispatch(updateNews({ id: editingNews._id, newsData }));
      setEditingNews(null);
    } else {
      dispatch(createNews(newsData));
    }
  };
  const handleDeleteNews = (id) => {
    if (window.confirm('Xəbəri silmək istədiyinizə əminsiniz?')) {
      dispatch(deleteNews(id));
    }
  };
  const handleEditNews = (newsItem) => setEditingNews(newsItem);
  const cancelEditNews = () => setEditingNews(null);

  // Branch handlers
  const handleSaveBranch = (branchData) => {
    if (editingBranch) {
      dispatch(updateBranch({ id: editingBranch._id, branchData }));
      setEditingBranch(null);
    } else {
      dispatch(createBranch(branchData));
    }
  };
  const handleDeleteBranch = (id) => {
    if (window.confirm('Filialı silmək istədiyinizə əminsiniz?')) {
      dispatch(deleteBranch(id));
    }
  };
  const handleEditBranch = (branch) => setEditingBranch(branch);
  const cancelEditBranch = () => setEditingBranch(null);

  // Price handlers
  const handleSavePrice = (priceData) => {
    if (editingPrice) {
      dispatch(updatePrice({ id: editingPrice._id, ...priceData }));
      setEditingPrice(null);
    } else {
      dispatch(addPrice(priceData));
    }
  };
  const handleDeletePrice = (id) => {
    if (window.confirm('Qiyməti silmək istədiyinizə əminsiniz?')) {
      dispatch(deletePrice(id));
      if (editingPrice && editingPrice._id === id) {
        setEditingPrice(null);
      }
    }
  };
  const handleEditPrice = (price) => setEditingPrice(price);
  const cancelEditPrice = () => setEditingPrice(null);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin Panel</h1>

      {/* News Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📰 Xəbərlər</h2>
        <NewsForm onSave={handleSaveNews} editingNews={editingNews} onCancel={cancelEditNews} />
        {newsLoading && <p>Yüklənir...</p>}
        {newsError && <p className="text-red-500">{newsError?.message || newsError}</p>}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Başlıq</th>
                <th className="border px-4 py-2 text-left">Məzmun</th>
                <th className="border px-4 py-2 text-left">Şəkil</th>
                <th className="border px-4 py-2 text-left">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{news.title}</td>
                  <td className="border px-4 py-2">{news.content}</td>
                  <td className="border px-4 py-2">
                    {news.image ? (
                      <img src={news.image} alt="news" className="w-20 h-20 object-cover rounded" />
                    ) : (
                      <span>Şəkil yoxdur</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button onClick={() => handleEditNews(news)} className="bg-yellow-400 text-black px-3 py-1 rounded">Redaktə</button>
                    <button onClick={() => handleDeleteNews(news._id)} className="bg-red-500 text-white px-3 py-1 rounded">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Branch Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🏢 Filiallar</h2>
        <BranchForm onSave={handleSaveBranch} editingBranch={editingBranch} onCancel={cancelEditBranch} />
        {branchLoading && <p>Filiallar yüklənir...</p>}
        {branchError && <p className="text-red-500">{branchError?.message || branchError}</p>}
        <BranchList branches={branchList} onEdit={handleEditBranch} onDelete={handleDeleteBranch} />
      </section>

      {/* Price Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">💰 Qiymətlər</h2>
        <PriceForm onSave={handleSavePrice} editingPrice={editingPrice} onCancel={cancelEditPrice} />
        {priceLoading && <p>Qiymətlər yüklənir...</p>}
        {priceError && <p className="text-red-500">{priceError?.message || priceError}</p>}
        <PriceList prices={prices} onEdit={handleEditPrice} onDelete={handleDeletePrice} />
      </section>
    </div>
  );
};

export default AdminPanel;
