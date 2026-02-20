import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase.from("notes").select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNote = async (req, res) => {
  try {
    const { content, user_id } = req.body;

    const { data, error } = await supabase
      .from("notes")
      .insert([{ content, user_id }])
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const { data, error } = await supabase
      .from("notes")
      .update({ content })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

