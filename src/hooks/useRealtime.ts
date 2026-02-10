/**
 * useRealtime Hook
 * Hook for subscribing to real-time updates from Supabase
 */

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Hook for real-time subscriptions
 */
export function useRealtime<T>(
  table: string,
  filter?: string,
  callback?: (payload: any) => void
) {
  const [data, setData] = useState<T[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return;
    }

    // Create channel
    const newChannel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
          filter,
        },
        (payload) => {
          if (callback) {
            callback(payload);
          }
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [table, filter, callback]);

  return { data, channel };
}

