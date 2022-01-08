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
import {activities} from '../selectors';
import { Button, Select, CheckIcon } from 'native-base';
import {addActivity} from '../actions';
import {Categories} from "../../../constants/categories";

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
  startDateTime: new Date(),
  endDateTime: new Date(),
  description: '',
  category: '',
};

const ActivityDetail = ({addActivity}) => {
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
      <Input
        textValue={formData.description}
        placeholder='Description'
        onChangeText={(text) => handleFormChanges(text, 'description')}
        textCapitalization={'none'}
        autoCorrection={false}
        whiteBackground
        errorMessage={errors.name}
      />
      <DateContainer>
        <SmallText textType={TextType.Regular}>Start Date</SmallText>
        <DateTimePicker
          value={formData.startDateTime}
          display='default'
          mode='datetime'
          is24Hour
          onChange={(event, date) => handleDateChange(event, date, 'startDateTime')}
        />
      </DateContainer>
      <DateContainer>
        <SmallText textType={TextType.Regular}>End Date</SmallText>
        <DateTimePicker
          value={formData.endDateTime}
          display='default'
          mode='datetime'
          is24Hour
          onChange={(event, date) => handleDateChange(event, date, 'endDateTime')}
        />
      </DateContainer>
        <Select
            selectedValue={formData.category}
            accessibilityLabel="Choose Category"
            placeholder="Choose Category"
            _selectedItem={{
                endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => handleFormChanges(itemValue, 'category')}
        >
            <Select.Item label={Categories.fitness} value={Categories.fitness} />
            <Select.Item label={Categories.education} value={Categories.education} />
            <Select.Item label={Categories.sleep} value={Categories.sleep} />
            <Select.Item label={Categories.work} value={Categories.work} />
            <Select.Item label={Categories.leisure} value={Categories.leisure} />
        </Select>
      <Button marginTop={4} onPress={() => addActivity(formData)}>
        Add Activity
      </Button>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  activities: activities(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addActivity: addActivity
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
