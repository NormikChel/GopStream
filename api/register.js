// api/auth/register.js
import { supabase } from '../../lib/supabase'; // Подключение к Supabase

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, брателло' });
  }

  const { username, password } = req.body;

  // Здесь логика регистрации через Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password }]) // Пароль нужно хэшировать перед этим!
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ user: data[0] });
}
