import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dzmecnikrhsdedcagvzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bWVjbmlrcmhzZGVkY2FndnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NTQ2NzcsImV4cCI6MjA1OTEzMDY3N30.JMMQMbVTS7QHDPkFInynQ-MszbrH_mEFl4uEDP9E5pk';
export const supabase = createClient(supabaseUrl, supabaseKey);

