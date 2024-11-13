import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // This hides the header
        animation: 'slide_from_right', // This gives the slide animation
        gestureEnabled: true, // This enables the swipe back gesture
        gestureDirection: 'horizontal',
      }}
    />
  );
}