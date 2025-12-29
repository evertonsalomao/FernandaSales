
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://fotllghuviufmehxnmtk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdGxsZ2h1dml1Zm1laHhubXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NjAwMTYsImV4cCI6MjA4MjUzNjAxNn0.85xzeA5AlqgC-N5Tvoqb0oOcVJVuJGTkHT1FXELnE8c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchSiteContent = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'main_content')
      .maybeSingle();

    if (error) {
      console.error('Erro ao buscar conteúdo:', error);
      return null;
    }
    return data?.value || null;
  } catch (err) {
    console.error('Catch fetchSiteContent:', err);
    return null;
  }
};

export const saveSiteContent = async (content: any) => {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: 'main_content', value: content }, { onConflict: 'key' });

  if (error) {
    throw error;
  }
};
