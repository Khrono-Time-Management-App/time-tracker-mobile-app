import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { TextType } from '../../constants/textTypes';
import typography from '../../theme/typography';

const MediumText = ({textType, complementaryStyle, children}) => {

  const textStyle = useMemo(() => {
    switch (textType) {
    case TextType.Regular:
      return typography.mediumTextNormal;
    case TextType.Bold:
      return typography.mediumTextBold;
    case TextType.SlightBold:
      return typography.mediumTextSlightBold;
    case TextType.Thin:
      return typography.mediumTextThin;
    default:
      return typography.mediumTextNormal;
    }
  },[
    typography.mediumTextThin,
    typography.mediumTextSlightBold,
    typography.mediumTextBold,
    typography.mediumTextNormal
  ]);

  return (
    <Text style={[textStyle, complementaryStyle]}>{children}</Text>
  );
};

MediumText.propTypes = {
  textType: PropTypes.string.isRequired,
  complementaryStyle: PropTypes.any,
  children: PropTypes.any,
};

export default MediumText;
