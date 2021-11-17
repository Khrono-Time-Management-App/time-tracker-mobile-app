import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { TextType } from '../../constants/textTypes';
import typography from '../../theme/typography';

const XSmallText = ({textType, complementaryStyle, children}) => {
  const textStyle = useMemo(() => {
    switch (textType) {
    case TextType.Regular:
      return typography.xSmallTextNormal;
    case TextType.SlightBold:
      return typography.xSmallTextSlightBold;
    case TextType.Bold:
      return typography.xSmallTextBold;
    case TextType.Thin:
      return typography.xSmallTextThin;
    default:
      return typography.xSmallTextNormal;
    }
  },[
    typography.xSmallTextThin,
    typography.xSmallTextNormal,
    typography.xSmallTextSlightBold,
    typography.xSmallTextBold
  ]);

  return (
    <Text style={[textStyle, complementaryStyle]}>{children}</Text>
  );
};

XSmallText.propTypes = {
  textType: PropTypes.string.isRequired,
  complementaryStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf({})]),
  children: PropTypes.any,
};

export default XSmallText;
