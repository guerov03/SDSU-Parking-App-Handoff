import { createClient } from "@supabase/supabase-js";

export default async function SupabaseTest() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(url, anon);

  const { data, error } = await supabase.from("lots").select("*").limit(5);

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Test</h1>

      <h2>Environment Variables</h2>
      <pre>{JSON.stringify({ urlPresent: !!url, anonPresent: !!anon }, null, 2)}</pre>

      <h2>Query Result</h2>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}
