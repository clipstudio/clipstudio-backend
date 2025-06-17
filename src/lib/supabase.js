import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tspvibuuaiauihvelnzb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHZpYnV1YWlhdWlodmVsbnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTA0NzUsImV4cCI6MjA2NDU2NjQ3NX0.ZrJmLj_qxN05bpUEK1BuPl59xteRWvUpB2f_zaaFEg4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);