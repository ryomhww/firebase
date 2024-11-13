import React, { createContext, useContext, useState } from 'react';

// Membuat FavoriteContext
const FavoriteContext = createContext();

// FavoriteProvider untuk menyediakan state favorit ke seluruh aplikasi
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({}); // Menyimpan data favorit dalam bentuk object

  // Fungsi untuk menambahkan item ke favorit
  const addFavorite = (item) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [item.id]: item, // Menambahkan item baru ke dalam favorit
    }));
  };

  // Fungsi untuk menghapus item dari favorit
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[id]; // Menghapus item berdasarkan id
      return newFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook untuk menggunakan FavoriteContext
export const useFavorites = () => {
  return useContext(FavoriteContext);
};
