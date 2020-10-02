import React, { useEffect, useState } from 'react';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import style from './style';
import { listSchedulesByUser } from '../../services/Schedule';
import { generateAgenda, markedDate } from '../../util/generateAgenda';

const agenda = () => {
  const [agenda, setAgenda] = useState({});
  const [marked, setMarked] = useState({});

  const navigation = useNavigation();

  LocaleConfig.locales['pt-br'] = {
    // eslint-disable-next-line prettier/prettier
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    // eslint-disable-next-line prettier/prettier
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    // eslint-disable-next-line prettier/prettier
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    // eslint-disable-next-line prettier/prettier
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'pt-br';

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={style.item}
        onPress={() => {
          navigation.navigate('OrdemDetails', { orderID: item.id });
        }}
      >
        <View style={style.scheduleInfo}>
          <Text style={style.itemSchedule}>{item.schedule}</Text>
          <Text style={style.itemService}>{item.service}</Text>
          <Text style={style.itemName} numberOfLines={1}>
            {item.storeName}
          </Text>
        </View>
        <Image source={{ uri: item.url_logo }} style={style.imageStore} />
      </TouchableOpacity>
    );
  };

  const renderEmpytDate = () => {
    return (
      <View style={style.empytContainer}>
        <Text style={style.empytTxt}>Não há nada agendado para este dia</Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchAgenda = async () => {
      listSchedulesByUser().then(({ data }) => {
        setAgenda(generateAgenda(data));
      });
    };

    fetchAgenda();
  }, []);

  useEffect(() => {
    setMarked(markedDate(agenda));
  }, [agenda]);

  return (
    <View style={style.container}>
      <Agenda
        items={agenda}
        selected={Date}
        markedDates={marked}
        renderItem={renderItem}
        renderEmptyData={renderEmpytDate}
        theme={{
          selectedDayBackgroundColor: 'red',
          selectedDotColor: 'red',
          agendaDayTextColor: 'red',
          agendaDayNumColor: 'red',
          agendaTodayColor: 'red',
          agendaKnobColor: 'red',
        }}
      />
    </View>
  );
};

export default agenda;
