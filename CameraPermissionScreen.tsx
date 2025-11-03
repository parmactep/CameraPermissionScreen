import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';

import { PermissionStatus, checkCameraPermission, requestCameraPermission } from '@/camera-permissions-mock';

export default function CameraPermissionScreen() {

  const [status, setStatus] = useState<PermissionStatus>('not-determined');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const init = async () => {
      setPending(true);
      try {
        const currentStatus = await checkCameraPermission();
        //setStatus(currentStatus);
      } catch (err) {
        console.warn('checkCameraPermission failed', err);
      } finally {
        setPending(false);
      }
    };
    init();
  }, []);

  const handleRequestPermission = async () => {
    try {
      setPending(true);
      const result = await requestCameraPermission();
      if (result === 'granted') {
        setStatus('granted');
      } else {
        setStatus('denied');
      }
    } catch (err) {
      console.warn('requestCameraPermission failed', err);
      Alert.alert('Error', 'Unable to request permission. Please try again.');
      setStatus('denied');
    } finally {
      setPending(false);
    }
  };

  const openAppSettings = async () => {
    try {
      const canOpenSettings = await Linking.canOpenURL('app-settings:');
      if (Platform.OS === 'ios' && canOpenSettings) {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
    } catch (err) {
      console.warn('openAppSettings failed', err);
      Alert.alert(
        'Open Settings manually',
        'Unable to open Settings. Please enable camera access manually.'
      );
    }
  };

  const renderStatus = () => {
    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Camera access denied</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRequestPermission}>
            <Text style={styles.primaryButtonText}>Reset Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (status === 'blocked') {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Camera access blocked</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={openAppSettings}>
            <Text style={styles.primaryButtonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (status === 'granted') {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Camera access granted</Text>
        </View>
      );
    }
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Needs permission to access the camera.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleRequestPermission}>
          <Text style={styles.primaryButtonText}>Allow access to the camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pending ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : renderStatus()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
