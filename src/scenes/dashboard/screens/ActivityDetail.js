import React from 'react';
import {
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import Input from '../../../components/Input';
import { useForm } from '../../../hooks/useForm';
import SmallText from '../../../components/text/SmallText';
import { TextType } from '../../../constants/textTypes';

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 24px 16px;
`;

const DateContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

const INITIAL_VALUES = {
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  category: '',
};

const ActivityDetail = ({}) => {
  const [formData, errors, handleFormChanges, _, handleDateChange] = useForm(INITIAL_VALUES, { email: '' });

  return (
    <Wrapper>
      <Input
        textValue={formData.name}
        placeholder='Name'
        onChangeText={(text) => handleFormChanges(text, 'name')}
        textCapitalization={'none'}
        autoCorrection={false}
        whiteBackground
        errorMessage={errors.name}
      />
      <DateContainer>
        <SmallText textType={TextType.Regular}>Start Date</SmallText>
        <DateTimePicker
          value={formData.startDate}
          display='default'
          mode='datetime'
          is24Hour
          onChange={(event, date) => handleDateChange(event, date, 'startDate')}
        />
      </DateContainer>
      <DateContainer>
        <SmallText textType={TextType.Regular}>End Date</SmallText>
        <DateTimePicker
          value={formData.endDate}
          display='default'
          mode='datetime'
          is24Hour
          onChange={(event, date) => handleDateChange(event, date, 'endDate')}
        />
      </DateContainer>
      <Input
        textValue={formData.category}
        placeholder='Category'
        onChangeText={(text) => handleFormChanges(text, 'category')}
        textCapitalization={'none'}
        autoCorrection={false}
        whiteBackground
        errorMessage={errors.category}
      />
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
