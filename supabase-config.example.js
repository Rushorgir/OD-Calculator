// Copy this file to `supabase-config.js` and fill values from your Supabase project.
// This file should NOT be committed to source control with real keys.

const SUPABASE_URL = 'https://zshadhzbvnsolqvgtjuh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaGFkaHpidm5zb2xxdmd0anVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTE5NzQsImV4cCI6MjA3MjMyNzk3NH0.C-WpUG51LlSabBfqVEn7R6WIZDUCg3yZWB_t0D8opos';

// Create the client and export a friendly name
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Optionally export for ESM or CommonJS environments
if (typeof window !== 'undefined') window.supabaseClient = supabaseClient;
