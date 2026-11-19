import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const hasSupabase = Boolean(supabase);

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signInWithGoogle() {
  if (!supabase) throw new Error('Supabase no está configurado');
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname },
  });
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut();
}

export async function listUserPlants(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from('user_plants')
    .select('plant_id,status,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveUserPlant(userId, plantId, status = 'healthy') {
  if (!supabase || !userId) throw new Error('Necesitas iniciar sesión para guardar una planta');
  const { data, error } = await supabase
    .from('user_plants')
    .upsert({ user_id: userId, plant_id: plantId, status }, { onConflict: 'user_id,plant_id' })
    .select('plant_id,status,created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserPlant(userId, plantId, status) {
  if (!supabase || !userId) throw new Error('Necesitas iniciar sesión');
  const { data, error } = await supabase
    .from('user_plants')
    .update({ status })
    .eq('user_id', userId)
    .eq('plant_id', plantId)
    .select('plant_id,status,created_at')
    .single();
  if (error) throw error;
  return data;
}
