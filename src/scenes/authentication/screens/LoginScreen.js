import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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


const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
            textValue={email}
            placeholder='Email'
            onChangeText={setEmail}
            textCapitalization={'none'}
            autoCorrection={false}
            whiteBackground
          />
          <Input
            textValue={password}
            placeholder='Password'
            onChangeText={setPassword}
            secureText
            textCapitalization={'none'}
            autoCorrection={false}
            whiteBackground
          />
          <Button mt="2" colorScheme="indigo" size="lg">
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
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
