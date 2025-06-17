import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!profile) return <div>Yüklənir...</div>;

  return (
    <div>
      <h1>Profil məlumatları</h1>
      <p>Ad: {profile.name}</p>
      <p>Soyad: {profile.surname}</p>
      {/* digər məlumatlar */}
    </div>
  );
}

export default ProfilePage;
