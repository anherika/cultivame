import { supabase } from './supabase';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function identifyPlant(file) {
  if (!supabase) return null;
  const dataUrl = await fileToDataUrl(file);
  const { data, error } = await supabase.functions.invoke('identify-plant', {
    body: { image: dataUrl },
  });
  if (error) throw error;
  return data;
}
