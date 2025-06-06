// src/components/admin/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, createBranch, updateBranch, deleteBranch } from '../../../redux/reducers/BranchSlice';
import Form from '../form/Form';
import BranchList from '../branchList/BranchList';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector(state => state.branches);
  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const onSave = (branchData) => {
    if (editingBranch) {
      dispatch(updateBranch({ id: editingBranch._id, branchData }));
    } else {
      dispatch(createBranch(branchData));
    }
    setEditingBranch(null);
  };

  const onEdit = (branch) => {
    setEditingBranch(branch);
  };

  const onDelete = (id) => {
    if (window.confirm('Bu filialı silmək istəyirsiniz?')) {
      dispatch(deleteBranch(id));
    }
  };

  return (
    <div>
      <h1>Admin Panel - Filiallar</h1>
      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Form onSave={onSave} editingBranch={editingBranch} onCancel={() => setEditingBranch(null)} />

      <BranchList branches={branches} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default AdminPanel;
