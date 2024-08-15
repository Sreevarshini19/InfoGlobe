import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Homehead from "./homehead";
import axios from 'axios';
import './notes.css';

const Notes = () => {
  const location = useLocation();
  const { email } = location.state || {};
  console.log("Current email in Notes:", email); // Debugging line

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (email) { // Only fetch notes if email is available
      fetchNotes();
    } else {
      console.log("Email is not available. Notes will not be fetched.");
    }
  }, [email]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/notes/?email=${email}`);
      console.log("Fetched notes:", response);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;
  console.log(formattedDateTime); // Output: 2024-08-04 03:24:15
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/takenote`, {
        title,
        email,
        note,
       formattedDateTime
      });
      setTitle('');
      setNote('');
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
        console.log(noteId)
      await axios.delete(`http://localhost:3000/note/${noteId}/${email}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return ''; // Return empty string for invalid date
    }
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Homehead />
      {}
      {email && <p>Email: {email}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <textarea
          rows="10"
          placeholder="Enter your note"
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
          name="note"
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className="notegrid">
        {console.log(notes)}{
        notes.length > 0 ? (
          notes.map((note) => (
            <div className="noteitem" key={note.ID}>
              <div className="notetitle">
                {note.TITLE}
                <button onClick={() => handleDelete(note.ID)}>X</button>
              </div>
              {console.log(note.ID,note.CONTENT,formatDate(note.CREATED),note.TITLE,note.EMAIL)}
              <div className="notetext">{note.CONTENT}</div>
              <div className="notedate">{formatDate(note.CREATED)}</div>
              
            </div>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </>
  );
};

export default Notes;
