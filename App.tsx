import "react-native-gesture-handler";

import React from "react";

import { AppNavigator } from "./src/navigation/app-navigator";
import { AuthProvider } from "./src/providers/auth-provider";
import { UiStateProvider } from "./src/providers/ui-state-provider";

export default function App() {
  return (
    <AuthProvider>
      <UiStateProvider>
        <AppNavigator />
      </UiStateProvider>
    </AuthProvider>
  );
}
