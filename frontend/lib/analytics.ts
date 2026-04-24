import { supabase } from '@/lib/supabase';

export async function logEvent(
  userId: string,
  eventName: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await supabase.from('analytics_events').insert({
    user_id: userId,
    event_name: eventName,
    metadata: metadata ?? null,
  });
}
