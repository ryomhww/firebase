import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { colors, sizes, spacing } from '../constants/theme';

const API_URL = 'https://3k1m2fm4-3000.asse.devtunnels.ms/notes';

const NotesTravel = ({ itemId }) => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null); // Menyimpan ID catatan yang sedang membuka menu

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?itemId=${itemId}`);
      if (response.ok) {
        const data = await response.json();
        setNotesList(data);
      } else {
        console.error('Failed to fetch notes:', await response.text());
        Alert.alert('Error', 'Failed to fetch notes. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      Alert.alert('Error', 'An error occurred while fetching notes.');
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSaveNote = async () => {
    if (note.trim() === '') {
      Alert.alert('Catatan Kosong', 'Silakan masukkan catatan sebelum menyimpan.');
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const newNote = { text: note, itemId, id: editingId || Date.now().toString() };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        await fetchNotes();
        setNote('');
        setEditingId(null);
      } else {
        console.error('Failed to save note:', await response.text());
        Alert.alert('Error', 'Failed to save note. Please try again.');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'An error occurred while saving the note.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
              if (response.ok) {
                setNotesList((prevNotes) => prevNotes.filter((note) => note.id !== id));
                Alert.alert('Success', 'Note deleted successfully');
              } else {
                console.error('Failed to delete note:', await response.text());
                Alert.alert('Error', 'Failed to delete note. Please try again.');
              }
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Error', 'An error occurred while deleting the note.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const editNote = (note) => {
    setNote(note.text);
    setEditingId(note.id);
  };

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      <Menu
        visible={menuVisible === item.id}
        anchor={
          <TouchableOpacity
            onPress={() => setMenuVisible(item.id)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        }
        onRequestClose={() => setMenuVisible(null)}
      >
        <MenuItem
          onPress={() => {
            setMenuVisible(null);
            editNote(item);
          }}
        >
          Edit
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            setMenuVisible(null);
            deleteNote(item.id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Travel Notes</Text>
      <FlatList
        data={notesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNoteItem}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Text style={styles.emptyText}>There are no notes yet. Add your note!</Text>
          )
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your travel notes..."
          value={note}
          onChangeText={setNote}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.addButton, loading && styles.disabledButton]}
          onPress={handleSaveNote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{editingId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    marginBottom: spacing.m,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.m,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderWidth: 1,
    borderColor: colors.gray,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
    borderRadius: sizes.radius,
    marginLeft: spacing.s,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  noteText: {
    flex: 1,
    color: colors.text,
  },
  menuButton: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  menuIcon: {
    fontSize: sizes.h2,
    color: colors.black,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: spacing.l,
  },
});

export default NotesTravel;
