// 출처: https://maaani.tistory.com/158 [생각의 전환]
import React from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
export default () => {
  const [markedDates, setMarkedDates] = React.useState(null);
  const [dates, setDates] = React.useState(['2022-01-05', '2022-01-20']);
  function addDates() {
    let obj = dates.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {marked: true, dotColor: 'red'},
        }),
      {},
    );
    console.log(obj);
    setMarkedDates(obj);
  }
  return (
    <>
      <View>
        <Calendar
          onDayPress={day => {
            addDates();
          }}
          markedDates={markedDates}
        />
      </View>
    </>
  );
};
