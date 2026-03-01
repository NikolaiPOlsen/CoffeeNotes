import { supabase } from './supabase';

export async function deleteNote(id: number, onDelete: () => void) {
    const { error } = await supabase

    .from('Notes')
    .delete()
    .eq('id', id)

    if (error) throw error;
    onDelete();
}

export async function editNote(id: number, newTitle: string, newMessage: string, onEdit: () => void) {
    const { error } = await supabase

    .from('Notes')
    .update({note_title: newTitle, note_message: newMessage,})
    .eq('id', id)

    if (error) throw error;
    onEdit();
}

export async function getData() {
      const { data, error } = await supabase
      .from('Notes')
      .select('*')

      if (error) throw error;
      return data;
  }