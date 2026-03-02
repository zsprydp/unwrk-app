import { supabase, isSupabaseConfigured } from './supabase';

export async function pushSession(session, userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;

  const { data, error } = await supabase.from('sessions').insert({
    user_id: userId,
    task_description: session.taskDescription || '',
    start_time: session.startTime,
    end_time: session.endTime,
    duration: session.duration,
    completed: session.completed,
    mode: session.mode,
  });

  if (error) console.warn('Sync pushSession error:', error.message);
  return data;
}

export async function pushSettings(settings, userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, settings }, { onConflict: 'id' });

  if (error) console.warn('Sync pushSettings error:', error.message);
  return data;
}

export async function pullSettings(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') console.warn('Sync pullSettings error:', error.message);
    return null;
  }
  return data?.settings || null;
}

export async function pullSessions(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return [];

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('start_time', { ascending: false })
    .limit(100);

  if (error) {
    console.warn('Sync pullSessions error:', error.message);
    return [];
  }
  return data || [];
}
