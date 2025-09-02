// Copy this file to `supabase-config.js` and fill values from your Supabase project.
// WARNING: Never commit real keys to the repository. Keep `supabase-config.js` out of
// source control (it's included in .gitignore). Rotate keys immediately if they
// were accidentally committed.

const SUPABASE_URL = 'https://your-project.supabase.co'; // replace with your project URL
const SUPABASE_ANON_KEY = 'public-anon-key'; // replace with your anon/public key

// Create the client and export a friendly name
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expose client to window in browser environments
if (typeof window !== 'undefined') window.supabaseClient = supabaseClient;
