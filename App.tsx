import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './src/lib/supabase';

type Status = 'checking' | 'ok' | 'error';

export default function App() {
  const [status, setStatus] = useState<Status>('checking');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        setStatus('ok');
      } catch (e) {
        setStatus('error');
        setDetail(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vocab</Text>
      <Text style={styles.subtitle}>
        Reading vocabulary for urban designers
      </Text>
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Supabase</Text>
        <Text
          style={[
            styles.statusValue,
            status === 'ok' && styles.statusOk,
            status === 'error' && styles.statusError,
          ]}
        >
          {status === 'checking' && 'Connecting…'}
          {status === 'ok' && 'Connected'}
          {status === 'error' && `Error: ${detail}`}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  statusBox: {
    alignItems: 'center',
    gap: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statusValue: {
    fontSize: 16,
    color: '#333',
  },
  statusOk: {
    color: '#15803d',
    fontWeight: '600',
  },
  statusError: {
    color: '#b91c1c',
    fontSize: 14,
    textAlign: 'center',
  },
});
