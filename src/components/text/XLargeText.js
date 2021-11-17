import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { TextType } from '../../constants/textTypes';
import typography from '../../theme/typography';

const XLargeText = ({textType, complementaryStyle, children}) => {
  const textStyle = useMemo(() => {
    switch (textType) {
    case TextType.Regular:
      return typography.xLargeTextNormal;
    case TextType.SlightBold:
      return typography.xLargeTextSlightBold;
    case TextType.Bold:
      return typography.xLargeTextBold;
    case TextType.Thin:
      return typography.xLargeTextThin;
    default:
      return typography.xLargeTextNormal;
    }
  },[
    typography.xLargeTextThin,
    typography.xLargeTextNormal,
    typography.xLargeTextBold,
    typography.xLargeTextSlightBold
  ]);

  return (
    <Text style={[textStyle, complementaryStyle]}>{children}</Text>
  );
};

XLargeText.propTypes = {
  textType: PropTypes.string.isRequired,
  complementaryStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf({})]),
  children: PropTypes.any,
};

export default XLargeText;
