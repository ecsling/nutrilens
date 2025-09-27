import { SettingsProvider } from '../src/context/SettingsContext';
import RootNavigator from '../src/navigation/RootNavigator';

export default function Index() {
  return (
    <SettingsProvider>
      <RootNavigator />
    </SettingsProvider>
  );
}