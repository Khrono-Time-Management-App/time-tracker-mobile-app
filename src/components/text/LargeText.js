import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { TextType } from '../../constants/textTypes';
import typography from '../../theme/typography';

const LargeText = ({textType, complementaryStyle, children}) => {
  const textStyle = useMemo(() => {
    switch (textType) {
    case TextType.Regular:
      return typography.largeTextNormal;
    case TextType.Bold:
      return typography.largeTextBold;
    case TextType.SlightBold:
      return typography.largeTextSlightBold;
    case TextType.Thin:
      return typography.largeTextThin;
    default:
      return typography.largeTextNormal;
    }
  },[
    typography.largeTextThin,
    typography.largeTextNormal,
    typography.largeTextSlightBold,
    typography.largeTextBold
  ]);

  return (
    <Text style={[textStyle, complementaryStyle]}>{children}</Text>
  );
};

LargeText.propTypes = {
  textType: PropTypes.string.isRequired,
  complementaryStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf({})]),
  children: PropTypes.any,
};

export default LargeText;
