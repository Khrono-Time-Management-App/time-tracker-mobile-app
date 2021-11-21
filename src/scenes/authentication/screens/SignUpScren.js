import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createAccount as createAccountCall } from '../actions'

import {
  Box,
  Heading,
  VStack,
  Link,
  Button,
  HStack,
  Center
} from "native-base"

import Input from '../../../components/Input';
import { screens } from '../../../constants/screens';
import { useForm } from '../../../hooks/useForm';
import signupSchema from "../../../validators/signup";

const INITIAL_VALUES = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: '',
}

const SignUpScreen = ({ onCreateAccount, navigation }) => {
  const [form, errors, handleFormChanges, validate] = useForm(INITIAL_VALUES, INITIAL_VALUES);

  const onSubmit = async () => {
    const isValid = await validate(signupSchema);

    if(isValid) {
      onCreateAccount(form);
      navigation.navigate(screens.Login);
    }
  };

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
          Sign up to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Input
            textValue={form.email}
            placeholder='Email'
            onChangeText={(text) => handleFormChanges(text, 'email')}
            textCapitalization={'none'}
            autoCorrection={false}
            errorMessage={errors.email}
            whiteBackground
          />
          <Input
            textValue={form.password}
            placeholder='Password'
            onChangeText={(text) => handleFormChanges(text, 'password')}
            secureText
            textCapitalization={'none'}
            autoCorrection={false}
            errorMessage={errors.password}
            whiteBackground
          />
          <Input
            textValue={form.firstName}
            placeholder='First Name'
            onChangeText={(text) => handleFormChanges(text, 'firstName')}
            textCapitalization={'none'}
            autoCorrection={false}
            errorMessage={errors.firstName}
            whiteBackground
          />
          <Input
            textValue={form.lastName}
            placeholder='Last Name'
            onChangeText={(text) => handleFormChanges(text, 'lastName')}
            textCapitalization={'none'}
            autoCorrection={false}
            errorMessage={errors.lastName}
            whiteBackground
          />
          <Button mt="2" colorScheme="indigo" size="lg" onPress={onSubmit}>
            Create Account
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "md",
              }}
              href="#"
              onPress={() => {navigation.navigate(screens.Login)}}
            >
              Sign In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onCreateAccount: createAccountCall
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
