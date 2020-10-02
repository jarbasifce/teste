/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';

import { getSchedules } from '../../services/Schedule';
import { generateHours2 } from '../../util/generateSchedule';
import style from './styles';

const schedules = ({ route }) => {
  const [schedules, setSchedules] = React.useState({});
  const [workingTime, setWorkingTime] = React.useState({});
  const [day, setDay] = React.useState(0);
  const [hours, setHours] = React.useState([]);
  const [selectHours, setSelectHours] = React.useState('');
  const [selectDay, setSelectDay] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { duration, storeId, orderId } = route.params;
  const navigation = useNavigation();

  const handleHours = async (day, duration, data) => {
    setDay(day);
    setWorkingTime(() => {
      const currentDay = moment().add(day, 'day');
      const wk = schedules.working_time?.find(w => w.dia_semana == currentDay.day() && w.ativo === 1);
      if (wk) {
        if (wk.horario_a_inicio) {
          wk.horario_a_inicio = wk.horario_a_inicio.substr(0, 5);
          wk.horario_a_fim = wk.horario_a_fim.substr(0, 5);
        }
        if (wk.horario_b_inicio) {
          wk.horario_b_inicio = wk.horario_b_inicio.substr(0, 5);
          wk.horario_b_fim = wk.horario_b_fim.substr(0, 5);
        }
        return wk;
      }
      return {};
    });
    const res = generateHours2(day, duration, data);
    setHours(res);
  };

  const renderDayButton = () => {
    const buttons = [];
    const workingTimes = schedules.working_time;
    Array((schedules.config?.working_days || 6) + 1)
      .fill()
      .forEach((_, n) => {
        const currentDay = moment().add(n, 'day');
        const wk = workingTimes?.some(w => w.dia_semana == currentDay.day() && w.ativo === 1);
        const isActive = n === day;
        const isToday = moment().add(n, 'day').dayOfYear() === moment().dayOfYear();
        buttons.push(
          <TouchableOpacity
            disabled={!wk}
            onPress={() => handleHours(n, duration, schedules)}
            key={`idx_${n}`}
            style={[style.btnDay, isActive ? style.btnDayActive : null]}
          >
            <Text style={[style.TXTDayOfMonth, !wk ? { color: 'gray' } : null, isActive ? { color: 'white' } : null]}>
              {moment().add(n, 'day').format('DD')}
            </Text>
            <Text style={[style.TXTDay, !wk ? { color: 'gray' } : null, isActive ? { color: 'white' } : null]}>
              {isToday ? 'Hoje' : moment().add(n, 'day').format('ddd')}
            </Text>
          </TouchableOpacity>
        );
      });
    return buttons;
  };

  const renderHours = ({ item, index }) => (
    <Animatable.View
      animation="bounceIn"
      delay={50 * index}
      duration={150}
      useNativeDriver
      easing="ease-in"
      style={{ width: '47%' }}
    >
      <TouchableOpacity
        style={[
          style.btnHorary,
          item.ag_inicio === selectHours && selectDay === day
            ? style.btnHoraryActive
            : null,
        ]}
        onPress={() => {
          setSelectHours(item.ag_inicio);
          setSelectDay(day);
        }}
      >
        <Text
          style={
            item.ag_inicio === selectHours && selectDay === day
              ? style.btnHoraryTXTActive
              : style.btnHoraryTXT
          }
        >{`${item.ag_inicio} às ${item.ag_fim}`}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  const getSchedule = async () => {
    setIsLoading(true);
    getSchedules(storeId, duration).then(({ data }) => {
      setSchedules(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };

  const handleSubmit = () => {
    navigation.navigate('details', {
      storeId,
      orderId,
      inicio: moment(selectHours, 'HH:mm').add(day, 'days').utc(true).format(),
      fim: moment(selectHours, 'HH:mm')
        .add(duration, 'minutes')
        .format('HH:mm'),
    });
  };

  React.useEffect(() => {
    getSchedule();
  }, []);

  React.useEffect(() => {
    if (Object.keys(schedules).length !== 0) {
      handleHours(0, duration, schedules);
    }
  }, [schedules]);

  return (
    <View style={style.container}>
      <View style={style.titleConatainer}>
        <Text style={style.title}>Agendamento</Text>
      </View>
      <View style={style.content}>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 8,
          marginTop: 12,
          marginBottom: 8,
          letterSpacing: .43
        }}>QUANDO VOCÊ GOSTARIA?</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{
          minHeight: 90,
          maxHeight: 90,
        }} contentContainerStyle={{ paddingHorizontal: 8 }}>
          {renderDayButton()}
        </ScrollView>
        <View style={style.containerHours}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 8,
              marginTop: 4,
              marginBottom: 4,
              letterSpacing: .43
            }}>EM QUAL HORÁRIO?</Text>
            {
              workingTime?.horario_a_inicio &&
              <Text style={{ marginLeft: 8 }}>
                (
                <Text style={style.workingHoraryTXT}>
                  {workingTime.horario_a_inicio} às {workingTime.horario_a_fim}
                </Text>
                {workingTime?.horario_b_inicio &&
                  <Text style={style.workingHoraryTXT}>
                    {' | ' + workingTime.horario_b_inicio} às {workingTime.horario_b_fim}
                  </Text>
                })
              </Text>
            }
          </View>
          {hours.length === 0 ? (
            <View style={style.hoursContent}>
              <Text style={style.emptyHoursTXT}>
                Nenhum horário disponível neste dia
              </Text>
            </View>
          ) : (
              <FlatList
                data={hours}
                renderItem={renderHours}
                keyExtractor={(item) => item.id}
                contentContainerStyle={style.horary}
                numColumns={2}
                columnWrapperStyle={{
                  width: '100%',
                  justifyContent: 'space-evenly'
                }}
                refreshControl={
                  <RefreshControl
                    colors={['#f00']}
                    refreshing={isLoading}
                    onRefresh={getSchedule}
                  />
                }
              />
            )}
        </View>
        <View style={{
          alignItems: 'center',
          paddingTop: 8,
          borderTopColor: '#ddd',
          borderTopWidth: 1,
          marginHorizontal: 8
        }}>
          <Text>Data Escolhida</Text>
          <View style={style.selectHorary}>
            <MaterialCommunity name="calendar-month" color="#d6001b" size={30} />
            <Text style={style.selectHoraryTXT}>
              {moment(moment().add(selectDay, 'day')).format('ddd, DD [de] MMM')}
              {selectHours &&
                `, de ${selectHours} às ${moment(selectHours, 'HH:mm')
                  .add(duration, 'minutes')
                  .format('HH:mm')}`}
            </Text>
          </View>
        </View>
        <View style={style.footer}>
          <TouchableOpacity
            disabled={!selectHours}
            onPress={() => handleSubmit()}
            style={[
              style.btnSchedule,
              !selectHours ? { backgroundColor: 'gray' } : {},
            ]}
          >
            <Text style={style.txtBTN}>
              {selectHours ? 'Avançar' : 'Selecione um horário'}
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    </View >
  );
};

export default schedules;
