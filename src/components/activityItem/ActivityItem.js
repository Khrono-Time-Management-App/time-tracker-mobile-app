import * as React from 'react';
import fitnessImage from '../../../assets/categoriesPicture/sportImage.jpeg'
import educationImage from '../../../assets/categoriesPicture/educationImage.jpeg'
import sleepImage from '../../../assets/categoriesPicture/sleepImage.jpeg'
import workImage from '../../../assets/categoriesPicture/workImage.jpeg'
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
} from 'native-base';

const ActivityItem = (activity) => {
  console.log('activity ---> ', activity)
  const {name, activityDescription, category, startDateTime} = activity.item;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fitness':
        return fitnessImage;
      case 'education':
        return educationImage;
      case 'sleep':
        return sleepImage;
      case 'work':
        return workImage;
      default:
        break
    }
  }

  const getActivityCardColors = (category) => {
    switch (category) {
      case 'fitness':
        return {backgroundColor: "primary.600", buttonColor: "primary.400"}
      case 'education':
        return {backgroundColor: "#fcba03", buttonColor: "#cf9c11"};
      case 'sleep':
        return {backgroundColor: "#cf3d11", buttonColor: "#f55b2c"};
      case 'work':
        return {backgroundColor: "#46d11b",buttonColor: "#5bf52c"};
      default:
        break
    }
  }

  const {backgroundColor, buttonColor} = getActivityCardColors(category)

  return (
    <NativeBaseProvider>
      <Box
        bg={backgroundColor}
        py="4"
        px="3"
        rounded="md"
        alignSelf="center"
        width={375}
        maxWidth="100%"
        margin={2}
      >
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <Text fontSize="sm" color="white">
                {startDateTime}
              </Text>
              <Text color="white" fontSize="lg">
                {name}
              </Text>
              <Text color="white" fontSize="md">
                {activityDescription}
              </Text>
            </VStack>
            <Pressable
              rounded="md"
              bg={buttonColor}
              alignSelf="flex-start"
              marginTop={2}
              py="3"
              px="2"
            >
              <Text
                textTransform="uppercase"
                fontSize="sm"
                fontWeight="bold"
                color="white"
              >
                Remind me
              </Text>
            </Pressable>
          </Box>
          <Image
            source={{
              uri: getCategoryIcon(category),
            }}
            height="100"
            rounded="full"
            background={'white'}
            width="100"
          />
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default ActivityItem;