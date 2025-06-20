import React from 'react';
import AdminNews from './adminNew/AdminNew';
import AdminBranch from './adminBranch/AdminBranch';
import AdminPrice from './adminPrice/AdminPrice' ;
import AdminFaq from './adminFaq/AdminFaq';

const AdminPanel = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛠 Admin Panel</h1>
      <AdminNews />
      <AdminBranch />
      <AdminPrice />
      <AdminFaq/>
    </div>
  );
};

export default AdminPanel;
