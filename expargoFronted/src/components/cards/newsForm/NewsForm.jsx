// components/admin/NewsForm.jsx
import React, { useState, useEffect } from 'react';

const NewsForm = ({ onSave, editingNews, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title);
      setContent(editingNews.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingNews ? 'Xəbəri Redaktə Et' : 'Yeni Xəbər Yarat'}</h2>
      <input
        type="text"
        placeholder="Başlıq"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Məzmun"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">{editingNews ? 'Yenilə' : 'Əlavə et'}</button>
      {editingNews && <button onClick={onCancel}>Ləğv et</button>}
    </form>
  );
};

export default NewsForm;
