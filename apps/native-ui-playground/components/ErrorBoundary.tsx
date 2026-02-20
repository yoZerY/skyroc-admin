import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@skyroc/native-ui';
import type { ErrorBoundaryProps } from 'expo-router';

/** Presentational fallback UI matching expo-router's ErrorBoundaryProps */
const ErrorFallback = (props: ErrorBoundaryProps) => {
  const { error, retry } = props;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text selectable style={styles.title}>Something went wrong</Text>

        <TextInput
          allowFontScaling
          editable={false}
          multiline
          scrollEnabled
          style={styles.errorInput}
          value={`Error: ${error.message}${__DEV__ && error.stack ? `\n\n${error.stack}` : ''}`}
        />

        <View style={styles.spacer} />

        <Pressable
          onPress={retry}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

interface ErrorBoundaryClassProps {
  /** Content to render when no error */
  children: ReactNode;
}

interface ErrorBoundaryClassState {
  error: Error | null;
}

/** Class-based error boundary for use with Stack layout prop */
class ErrorBoundaryClass extends Component<ErrorBoundaryClassProps, ErrorBoundaryClassState> {
  constructor(props: ErrorBoundaryClassProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryClassState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleRetry = async () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorFallback error={error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  buttonPressed: {
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'stretch',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  content: {
    flex: 1,
    gap: 8
  },
  errorInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: StyleSheet.hairlineWidth,
    color: 'white',
    fontSize: 14,
    fontFamily: Platform.select({ android: 'monospace', default: 'Courier', ios: 'Courier New' }),
    maxHeight: 200,
    paddingVertical: 8
  },
  spacer: {
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  }
});

export { ErrorBoundaryClass, ErrorFallback };
