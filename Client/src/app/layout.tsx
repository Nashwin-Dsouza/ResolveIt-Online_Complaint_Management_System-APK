// src/app/layout.tsx
import './globals.css'; // Import Tailwind or global styles
import type { Metadata } from 'next';
import NetworkPermissionHandler from '../components/NetworkPermissionHandler';
import DeviceInitializer from '../components/DeviceInitializer';

export const metadata: Metadata = {
  title: 'ResolveIt',
  description: 'Online Complaint Management System',
  icons: {
    icon: '/images/resolveit.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <NetworkPermissionHandler showPermissionDialog={true}>
          <DeviceInitializer />
          {children}
        </NetworkPermissionHandler>
      </body>
    </html>
  );
}