import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { TextType } from '../../constants/textTypes';
import typography from '../../theme/typography';

const SmallText = ({textType, complementaryStyle, children}) => {
  const textStyle = useMemo(() => {
    switch (textType) {
    case TextType.Regular:
      return typography.smallTextNormal;
    case TextType.SlightBold:
      return typography.smallTextSlightBold;
    case TextType.Bold:
      return typography.smallTextBold;
    case TextType.Thin:
      return typography.smallTextThin;
    default:
      return typography.smallTextNormal;
    }
  },[
    typography.smallTextThin,
    typography.smallTextBold,
    typography.smallTextNormal,
    typography.smallTextSlightBold
  ]);

  return (
    <Text style={[textStyle, complementaryStyle]}>{children}</Text>
  );
};

SmallText.propTypes = {
  textType: PropTypes.string.isRequired,
  complementaryStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf({})]),
  children: PropTypes.any,
};

export default SmallText;
