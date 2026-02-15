import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@skyroc/native-ui';

const ButtonSnackDemo = () => {
  const [loading, setLoading] = useState(false);

  function handleLoadingPress() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={styles.sectionTitle}>Variants</Text>
          <View style={styles.section}>
            <Button variant="solid" onPress={() => Alert.alert('Solid')}>Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </View>

          <Text style={styles.sectionTitle}>Colors</Text>
          <View style={styles.section}>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="destructive">Destructive</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
          </View>

          <Text style={styles.sectionTitle}>Sizes</Text>
          <View style={styles.section}>
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </View>

          <Text style={styles.sectionTitle}>States</Text>
          <View style={styles.section}>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onPress={handleLoadingPress}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = {
  sectionTitle: { fontSize: 16, fontWeight: '600' as const, marginTop: 16, marginBottom: 8 },
  section: { gap: 8 }
};

export default ButtonSnackDemo;
