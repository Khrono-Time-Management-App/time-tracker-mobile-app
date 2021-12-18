import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import XLargeText from '../../../components/text/XLargeText';
import { TextType } from '../../../constants/textTypes';

const HeaderTitleText = ({title}) => {
  return (
    <XLargeText
      textType={TextType.Bold}
      complementaryStyle={styles.title}
    >
      {title}
    </XLargeText>
  );
};

const styles = StyleSheet.create({
  title: {
    lineHeight: 24
  }
});

HeaderTitleText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTitleText;
