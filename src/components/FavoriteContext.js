import React, { createContext, useContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const db = SQLite.openDatabase(
    {
      name: 'FavoritesDB',
      location: 'default',
    },
    () => {
      console.log('Database opened');
    },
    (error) => {
      console.error('Error opening database:', error);
    }
  );

  useEffect(() => {
    const initDatabase = () => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY,
            data TEXT
          );`,
          [],
          () => {
            console.log('Table created or already exists');
          },
          (error) => {
            console.error('Error creating table:', error);
          }
        );
      });
    };

    initDatabase();
  }, []);

  useEffect(() => {
    const loadFavorites = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM favorites;',
          [],
          (tx, results) => {
            const loadedFavorites = {};
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              loadedFavorites[row.id] = JSON.parse(row.data);
            }
            setFavorites(loadedFavorites);
          },
          (error) => {
            console.error('Failed to load favorites from database:', error);
          }
        );
      });
    };

    loadFavorites();
  }, []);

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [item.id]: item,
    }));

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO favorites (id, data) VALUES (?, ?);',
        [item.id, JSON.stringify(item)],
        () => {
          console.log('Favorite added');
        },
        (error) => {
          console.error('Error adding favorite:', error);
        }
      );
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[id];
      return newFavorites;
    });

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM favorites WHERE id = ?;',
        [id],
        () => {
          console.log('Favorite removed');
        },
        (error) => {
          console.error('Error removing favorite:', error);
        }
      );
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
