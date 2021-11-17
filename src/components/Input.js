import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../theme/colors';
import SmallText from './text/SmallText';
import XSmallText from './text/XSmallText';
import { TextType } from '../constants/textTypes';

const Input = ({
  placeholder,
  onChangeText,
  textValue,
  textCapitalization,
  secureText,
  autoCorrection,
  boldPlaceholder,
  keyboardType = 'default',
  whiteBackground,
  errorMessage = '',
  makeSecureTextToggleable = false,
  initialSecureTextValue = false,
}) => {
  const [toggleSecureText, setToggleSecureText] = useState(initialSecureTextValue);

  return (
    <Animatable.View
      animation={errorMessage ? 'shake' : null}
    >
      <SmallText
        textType={boldPlaceholder ? TextType.Bold : TextType.Regular}
        complementaryStyle={errorMessage ? styles.textError : styles.text}>
        {placeholder}
      </SmallText>
      <View style={[
        styles.textInputContainer,
        whiteBackground ? styles.backgroundWhite : null,
        errorMessage ? styles.inputContainerError : null,
      ]}>
        <TextInput
          style={styles.textInput}
          value={textValue}
          onChangeText={onChangeText}
          autoCapitalize={textCapitalization}
          autoCorrect={autoCorrection}
          keyboardType={keyboardType}
          secureTextEntry={secureText ? true : toggleSecureText}
        />
        {
          makeSecureTextToggleable ?
            <TouchableOpacity
              onPress={() => {setToggleSecureText(!toggleSecureText);}}
            >
              <Icon name={toggleSecureText ? 'eye' : 'eye-slash'} size={16}/>
            </TouchableOpacity>
            :
            null
        }
      </View>
      {errorMessage ?
        <XSmallText
          textType={TextType.Thin}
          complementaryStyle={styles.errorMessage}>
          {errorMessage}
        </XSmallText>
        :
        null
      }
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: Colors.VeryLightGrey,
    borderRadius: 10,
    borderColor: Colors.LightGrey,
    borderWidth: 1
  },
  textInput: {
    width: '80%',
    height: '100%',
  },
  text: {
    color: Colors.TextGrey,
    marginBottom: 8
  },
  errorMessage: {
    color: Colors.Red,
    marginTop: 8
  },
  textError: {
    color: Colors.Red,
    marginBottom: 8
  },
  inputContainerError: {
    borderColor: Colors.Red
  },
  backgroundWhite: {
    backgroundColor: Colors.White
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  textValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textCapitalization: PropTypes.string,
  errorMessage: PropTypes.string,
  secureText: PropTypes.bool,
  autoCorrection: PropTypes.bool,
  boldPlaceholder: PropTypes.bool,
  whiteBackground: PropTypes.bool,
  makeSecureTextToggleable: PropTypes.bool,
  keyboardType: PropTypes.string,
  initialSecureTextValue: PropTypes.bool
};

export default Input;
