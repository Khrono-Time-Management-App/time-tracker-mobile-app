import * as React from "react";
import { Dimensions, Animated, Pressable } from "react-native";
import { TabView } from "react-native-tab-view";
import { NativeBaseProvider, Box } from "native-base";

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample({ renderScene, initialRoutes }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(initialRoutes);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color = index === i ? "#1f2937" : "#a1a1aa";
          const borderColor = index === i ? "cyan.500" : "coolGray.200";

          return (
            <Box
              key={route.key}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </NativeBaseProvider>
  );
}
