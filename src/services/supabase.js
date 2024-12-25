
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ensdctanfssdtelodftl.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuc2RjdGFuZnNzZHRlbG9kZnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDQ0NTAsImV4cCI6MjA1MDEyMDQ1MH0.JQmSpfV-Z6zoKT9i2xS44dUcwYt5UPzb0M8G5ZS3U8I';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;