import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getOnGoingActivityFromLocalStorage,
  removeOnGoingActivityToLocalStorage,
  setOnGoingActivityToLocalStorage,
} from "../../../utils/asyncStorageMethods";
import {
  Center,
  HStack,
  Heading,
  Button,
  Box,
  CheckIcon,
  Select,
  VStack,
} from "native-base";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../components/Input";
import { Categories } from "../../../constants/categories";
import activitySchema from "../../../validators/activity";
import { addActivity } from "../actions";

const INITIAL_VALUES = {
  name: "",
  description: "",
  category: "",
};

const INITIAL_TIMER_VALUES = {
  hour: "",
  minutes: "",
  seconds: "",
};

export const millisecondsToTime = (duration) => {
  console.log('duration ------> ', duration)

  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return [hours, minutes, seconds];
};

const ActivityTimer = ({ addActivity }) => {
  const [onGoingActivity, setOnGoingActivity] = useState();
  const [formData, errors, handleFormChanges, validate, _] = useForm(
    INITIAL_VALUES,
    INITIAL_VALUES
  );
  const [timerValue, setTimerValue] = useState(INITIAL_TIMER_VALUES);

  useEffect(() => {
    (async () => {
      const activity = await getOnGoingActivityFromLocalStorage();
      setOnGoingActivity(activity);

      if (activity && activity.startDateTime) {
        const [hours, minutes, seconds] = millisecondsToTime(
          new Date().getTime() - new Date(activity.startDateTime).getTime()
        );

        setTimerValue({
          hour: hours,
          minutes,
          seconds,
        });
      }
    })();
  }, []);

  const handleStartActivity = async () => {
    const isValid = await validate(activitySchema);

    if (isValid) {
      const activity = {
        ...formData,
        startDateTime: new Date(),
      };
      setOnGoingActivity(activity);
      await setOnGoingActivityToLocalStorage(activity);
    }
  };

  const handleStopActivity = async () => {
    //send onGoingActivity to the BE
    await addActivity({
      ...onGoingActivity,
      endDateTime: new Date(),
    });
    await removeOnGoingActivityToLocalStorage();
    setOnGoingActivity();
    setTimerValue(INITIAL_TIMER_VALUES);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (onGoingActivity) {
        const [hours, minutes, seconds] = millisecondsToTime(
          new Date().getTime() -
            new Date(onGoingActivity.startDateTime).getTime()
        );

        setTimerValue({
          hour: hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [onGoingActivity]);

  return (
    <Center flex={1} px="3">
      {!onGoingActivity && (
        <Box safeArea>
          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Start your activity now!
          </Heading>

          <VStack space={3} mt="5">
            <Input
              textValue={formData.name}
              placeholder="Name"
              onChangeText={(text) => handleFormChanges(text, "name")}
              textCapitalization={"none"}
              autoCorrection={false}
              whiteBackground
              errorMessage={errors.name}
            />
            <Input
              textValue={formData.description}
              placeholder="Description"
              onChangeText={(text) => handleFormChanges(text, "description")}
              textCapitalization={"none"}
              autoCorrection={false}
              whiteBackground
              errorMessage={errors.name}
            />

            <Select
              selectedValue={formData.category}
              accessibilityLabel="Choose Category"
              placeholder="Choose Category"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) =>
                handleFormChanges(itemValue, "category")
              }
            >
              <Select.Item
                label={Categories.fitness}
                value={Categories.fitness}
              />
              <Select.Item
                label={Categories.education}
                value={Categories.education}
              />
              <Select.Item label={Categories.sleep} value={Categories.sleep} />
              <Select.Item label={Categories.work} value={Categories.work} />
              <Select.Item
                label={Categories.leisure}
                value={Categories.leisure}
              />
            </Select>
          </VStack>

          <HStack>
            <Button
              mt="2"
              mr="2"
              colorScheme="green"
              size="lg"
              onPress={handleStartActivity}
            >
              START
            </Button>
          </HStack>
        </Box>
      )}
      {onGoingActivity && (
        <Box>
          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Your ongoing activity: {onGoingActivity.name}
          </Heading>

          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            {timerValue.hour} {timerValue.minutes} {timerValue.seconds}
          </Heading>

          <HStack>
            <Button
              mt="2"
              mr="2"
              colorScheme="red"
              size="lg"
              onPress={handleStopActivity}
            >
              STOP
            </Button>
          </HStack>
        </Box>
      )}
    </Center>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addActivity: addActivity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTimer);
