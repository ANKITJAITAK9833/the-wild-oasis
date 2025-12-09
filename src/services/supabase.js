
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tasmnorjkgizktfbzqob.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc21ub3Jqa2dpemt0ZmJ6cW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTc1NDUsImV4cCI6MjA4MDgzMzU0NX0.md41E4_z5OvENQnIh9vrd5WZ5g9ROvdLOYdZNR8s6Eg"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;