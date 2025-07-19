import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resolveit.app',
  appName: 'ResolveIt',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      androidxExtrasVariables: {
        androidxCoreVersion: '1.8.0'
      }
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    Storage: {
      group: 'com.resolveit.app.storage'
    }
  }
};

export default config;
