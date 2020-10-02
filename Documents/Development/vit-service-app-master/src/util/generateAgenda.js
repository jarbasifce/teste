/* eslint-disable prettier/prettier */
import moment from 'moment';

export const generateAgenda = (data) => {
  const result = data.reduce((agenda, current) => {
    const dayFormat = moment(current.agendamento_inicio).format('YYYY-MM-DD');
    agenda[dayFormat] = agenda[dayFormat] || [];
    agenda[dayFormat].push({
      id: current.id,
      schedule: `${moment(current.agendamento_inicio).format('HH:mm')} - ${moment(current.agendamento_fim).format('HH:mm')}`,
      storeName: current.store.nome,
      service: current.services.map((service) => service.nome).join(' - '),
      url_logo: current.store.url_logo,
    });
    return agenda;
  }, Object.create(null));

  return result;
};

export const markedDate = (agenda) => {
  const result = {};
  Object.keys(agenda).map((key) => result[key] = { marked: true, selectedColor: 'red' });
  return result;
}