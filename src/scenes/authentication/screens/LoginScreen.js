import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login as loginCall } from '../actions'

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Link,
  Button,
  HStack,
  Center
} from "native-base"
import Input from '../../../components/Input';
import { screens } from '../../../constants/screens';
import { useForm } from '../../../hooks/useForm';
import loginSchema from "../../../validators/login";
import {loginErrorMessage} from "../selectors";

const INITIAL_VALUES = {
  email: '',
  password: '',
}

const LoginScreen = ({ onLogin, navigation, loginErrorMessage }) => {
  const [formData, errors, handleFormChanges, validate] = useForm(INITIAL_VALUES, { email: '' });

  const onSubmit = async () => {
    const isValid = await validate(loginSchema);

    if(isValid){
      onLogin(formData.email, formData.password);
    }
  }

  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" py="8" w="95%" maxW="310">
        <Heading
          size="xl"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="sm"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Input
            textValue={formData.email}
            placeholder='Email'
            onChangeText={(text) => handleFormChanges(text, 'email')}
            textCapitalization={'none'}
            autoCorrection={false}
            whiteBackground
            errorMessage={errors.email}
          />
          <Input
            textValue={formData.password}
            placeholder='Password'
            onChangeText={(text) => handleFormChanges(text, 'password')}
            secureText
            textCapitalization={'none'}
            autoCorrection={false}
            whiteBackground
          />
          {
            loginErrorMessage && (
              <Text style={ { color: 'red' }}>{loginErrorMessage}</Text>
            )
          }
          <Button mt="2" colorScheme="indigo" size="lg" onPress={onSubmit}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="md"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "md",
              }}
              href="#"
              onPress={() => {navigation.navigate(screens.SignUp)}}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  loginErrorMessage: loginErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onLogin: loginCall
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
