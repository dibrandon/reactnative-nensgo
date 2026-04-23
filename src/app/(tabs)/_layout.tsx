import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import { nensGoColors } from "@/shared/theme/tokens";

export default function TabLayout() {
  const { accessState, startProtectedAction } = useAuthSession();

  return (
    <Tabs
      initialRouteName="explore"
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: nensGoColors.background,
        },
        tabBarActiveTintColor: nensGoColors.primaryStrong,
        tabBarInactiveTintColor: nensGoColors.tabInactive,
        tabBarStyle: {
          backgroundColor: nensGoColors.surface,
          borderTopColor: nensGoColors.border,
          height: 84,
          paddingBottom: 12,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        listeners={{
          tabPress: (event) => {
            if (accessState === "ready") {
              return;
            }

            event.preventDefault();
            void startProtectedAction({
              type: "open_favorites",
              returnTo: "/favorites",
            });
          },
        }}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Cuenta",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
