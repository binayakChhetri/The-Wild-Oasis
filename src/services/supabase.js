import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rlyvbamrzezyevictace.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJseXZiYW1yemV6eWV2aWN0YWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NjQ5MTAsImV4cCI6MjA0MjI0MDkxMH0.PCw7itjI7awFkQ5_OgyMKankRkXPsxA2GQWm67v13mg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
