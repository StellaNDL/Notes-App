import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const API_URL = "http://localhost:5000/api/notes";

  // Replace with your current logged-in user's ID from frontend
  const userId = localStorage.getItem("user_id"); // assuming you saved it after login

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // Filter notes for current user only
      const userNotes = data.filter((note) => note.user_id === userId);
      setNotes(userNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!newNote) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote, user_id: userId }),
      });

      const data = await res.json();
      setNotes([data, ...notes]);
      setNewNote("");
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Update note
  const updateNote = async (id) => {
    const updatedContent = prompt("Edit your note:");
    if (!updatedContent) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updatedContent }),
      });

      const data = await res.json();
      setNotes(notes.map((note) => (note.id === id ? data : note)));
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-stone-700 mb-4">My Notes</h1>

        {/* Add note */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note..."
            className="flex-1 px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-stone-700 text-white rounded-xl hover:bg-stone-800 transition"
          >
            Add
          </button>
        </div>

        {/* Notes list */}
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center"
            >
              <span>{note.content}</span>
              <div className="space-x-2">
                <button
                  onClick={() => updateNote(note.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


