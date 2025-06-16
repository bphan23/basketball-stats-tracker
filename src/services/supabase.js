import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://aejduizokhrhusfahkib.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlamR1aXpva2hyaHVzZmFoa2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTI3ODYsImV4cCI6MjA2NTYyODc4Nn0.olnlyxQ3miJJfr8WJhox3re_JYtOPXJXDwEUphe0TkM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
