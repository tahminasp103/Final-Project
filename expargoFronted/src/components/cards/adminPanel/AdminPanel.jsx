// src/components/admin/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Branch imports
import {
  fetchBranches,
  createBranch,
  updateBranch,
  deleteBranch
} from '../../../redux/reducers/BranchSlice';
import Form from '../form/Form';
import BranchList from '../branchList/BranchList';

// News imports
import {
  fetchNews,
  createNews,
  updateNews,
  deleteNews
} from '../../../redux/reducers/NewsSlice';
import NewsForm from '../news/NewsForm';
import NewsList from '../news/NewsList';

const AdminPanel = () => {
  const dispatch = useDispatch();

  // Branch states
  const { branches, loading: branchesLoading, error: branchesError } = useSelector(state => state.branches);
  const [editingBranch, setEditingBranch] = useState(null);

  // News states
  const { newsList, loading: newsLoading, error: newsError } = useSelector(state => state.news);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchNews());
  }, [dispatch]);

  // Branch handlers
  const handleBranchSave = (branchData) => {
    if (editingBranch) {
      dispatch(updateBranch({ id: editingBranch._id, branchData }));
    } else {
      dispatch(createBranch(branchData));
    }
    setEditingBranch(null);
  };

  const handleBranchEdit = (branch) => setEditingBranch(branch);

  const handleBranchDelete = (id) => {
    if (window.confirm('Bu filialı silmək istəyirsiniz?')) {
      dispatch(deleteBranch(id));
    }
  };

  // News handlers
  const handleNewsSave = (newsData) => {
    if (editingNews) {
      dispatch(updateNews({ id: editingNews._id, newsData }));
    } else {
      dispatch(createNews(newsData));
    }
    setEditingNews(null);
  };

  const handleNewsEdit = (news) => setEditingNews(news);

  const handleNewsDelete = (id) => {
    if (window.confirm('Bu xəbəri silmək istəyirsiniz?')) {
      dispatch(deleteNews(id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛠️ Admin Panel</h1>

      {/* --- Branch Management --- */}
      <section style={{ marginBottom: '40px' }}>
        <h2>📍 Filiallar</h2>
        {branchesLoading && <p>Yüklənir...</p>}
        {branchesError && <p style={{ color: 'red' }}>{branchesError}</p>}

        <Form
          onSave={handleBranchSave}
          editingBranch={editingBranch}
          onCancel={() => setEditingBranch(null)}
        />

        <BranchList
          branches={branches}
          onEdit={handleBranchEdit}
          onDelete={handleBranchDelete}
        />
      </section>

      {/* --- News Management --- */}
      <section>
        <h2>📰 Xəbərlər</h2>
        {newsLoading && <p>Yüklənir...</p>}
        {newsError && <p style={{ color: 'red' }}>{newsError}</p>}

        <NewsForm
          onSave={handleNewsSave}
          editingNews={editingNews}
          onCancel={() => setEditingNews(null)}
        />

        <NewsList
          newsList={newsList}
          onEdit={handleNewsEdit}
          onDelete={handleNewsDelete}
        />
      </section>
    </div>
  );
};

export default AdminPanel;
