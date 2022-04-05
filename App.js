// 출처: https://maaani.tistory.com/158 [생각의 전환]
import React, {useState} from 'react';
import {View, Text, Button, Modal, TextInput, StyleSheet} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

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
  const [markedDates, setMarkedDates] = useState(null);
  const [dates, setDates] = useState(['2022-01-05', '2022-01-20']);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [textValue, setTextValue] = useState(null);

  function addDates(day) {
    dates.push(day.dateString);
    let obj = dates.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {marked: true, dotColor: 'red'}, // todo 추가할거만
        }),
      {},
    );
    console.log('day', day.dateString);
    console.log(obj);
    setMarkedDates(obj);
    setIsModalActive(!isModalActive);
    setSelectDate(day.dateString);
  }
  return (
    <>
      <View>
        <CalendarList
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
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
          markedDates={markedDates}></CalendarList>
        <Modal visible={isModalActive} animationType={'fade'}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{selectDate}</Text>
              <TextInput
                value={textValue}
                // value={() => dates[selectDate].memo}
                // object 내용으로 보여주기
                style={styles.input}
                onChangeText={event => {
                  setTextValue(event);
                }}
                multiline={true}
                maxLength={100}
                autoCapitalize={'none'}
                editable={true}
              />
              <Button
                style={styles.button}
                title="back"
                onPress={() => {
                  let obj = dates.reduce(
                    (c, v) =>
                      Object.assign(c, {
                        [v]: {
                          marked: true,
                          dotColor: 'red',
                          memo: v == selectDate ? textValue : '', // todo추가만
                        },
                      }),
                    {},
                  );
                  setMarkedDates(obj);
                  setIsModalActive(false);
                  setTextValue();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 200,
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
  },
});
