// 출처: https://maaani.tistory.com/158 [생각의 전환]
import React from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export default () => {
  const [markedDates, setMarkedDates] = React.useState(null);
  const [dates, setDates] = React.useState(['2022-01-05', '2022-01-20']);
  function addDates(day) {
    dates.push(day.dateString);
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
          // style={[styles.calendar, {height: 300}]}
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: 'red',
              },
              dayTextAtIndex6: {
                color: 'blue',
              },
            },
          }}
          // markingType={'multi-dot'}
          onDayPress={day => {
            addDates(day);
          }}
          markedDates={markedDates}
        />
      </View>
    </>
  );
};
