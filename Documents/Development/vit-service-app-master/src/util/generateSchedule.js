/* eslint-disable prettier/prettier */
import moment from 'moment';

const formatTime = 'HH:mm:ss';

function padNumber(number) {
  if (number < 10)
    return `0${number}`
  return number;
}

function currentTime(compareDate, week_day, currentDay) {
  let cur = moment().set('second', 0);

  while (cur.get('minutes') % 15) cur = cur.add(1, 'minute');
  const today_week_day = moment();
  if ((today_week_day.day() !== week_day) || (today_week_day.week() !== currentDay.week())) {
    console.log('return compare date');
    return compareDate;
  }

  return (compareDate > cur) ? compareDate : cur;
}

export const generateHours2 = (index, duration, data) => {
  const hours = [];
  if (!data.working_time) return hours;

  const interval_pivot = 15; // em quanto tempo o sistema fica pulando e checando
  const current_week_day = Number(moment().add(index, 'days').format('d'));
  const current_week_date = moment().add(index, 'days');
  const current_work_time = data.working_time.find(work => work.dia_semana === current_week_day);
  if (!current_work_time) return hours;

  let currentInterval = {
    current_interval: 'a',
    start: moment(current_work_time.horario_a_inicio, formatTime),
    end: moment(current_work_time.horario_a_fim, formatTime),
    current: currentTime(moment(current_work_time.horario_a_inicio, formatTime), current_week_day, current_week_date),
  };

  // Filtra todos os pedidos que estão ocupando o dia da semana
  let occupied_week_day = data.occupied_times.map(oc => ({
    dia_semana: oc.dia_semana,
    start: moment(oc.ag_inicio, formatTime),
    end: moment(oc.ag_fim, formatTime),
  })).filter(oc => {
    return oc.dia_semana == current_week_day && (
      (oc.start >= currentInterval.start && oc.start <= currentInterval.end) ||
      (oc.end >= currentInterval.start && oc.end <= currentInterval.end) ||
      (oc.start <= currentInterval.start && oc.end >= currentInterval.end)
    )
  });

  console.log(data.occupied_times);

  // Enquanto o pivo de tempo for menor que o tempo final
  const loop = () => {
    while (currentInterval.current < currentInterval.end) {
      const time_end = moment(currentInterval.current).add(duration, "minutes");
      if (time_end <= currentInterval.end) {

        // Checa se esse intervalo está ocupado por algum outro horário
        const is_occupied = occupied_week_day.some((oc) => {
          return (oc.start >= currentInterval.current && oc.start < time_end) ||
            (oc.end > currentInterval.current && oc.end < time_end) ||
            (oc.start <= currentInterval.current && oc.end >= time_end);
        });

        // Se não tiver ocupado, adiciona na array de horários livres
        if (!is_occupied) {
          hours.push({
            id: Math.random().toString(36).substring(7),
            ag_inicio: moment(currentInterval.current).utc(true).format("HH:mm"),
            ag_fim: moment(time_end).utc(true).format("HH:mm")
          });
        }
      }

      // Soma 15 (internal_pivot) minutos ao current (pivo) do intervalo
      currentInterval.current = moment(currentInterval.current).add(interval_pivot, "minutes");
    }
  }

  loop();
  // Se não tiver o horário de b, para a execução
  if (current_work_time.horario_b_inicio) {
    // Atualiza o novo intervalo
    currentInterval = {
      current_interval: 'b',
      start: moment(current_work_time.horario_b_inicio, formatTime),
      end: moment(current_work_time.horario_b_fim, formatTime),
      current: currentTime(moment(current_work_time.horario_b_inicio, formatTime), current_week_day, current_week_date),
    }
    // Busca os horários ocupados que estão em B
    occupied_week_day = occupied_week_day = data.occupied_times.map(oc => ({
      dia_semana: oc.dia_semana,
      start: moment(oc.ag_inicio, formatTime),
      end: moment(oc.ag_fim, formatTime),
    })).filter(oc => {
      return oc.dia_semana == current_week_day && (
        (oc.start >= currentInterval.start && oc.start <= currentInterval.end) ||
        (oc.end >= currentInterval.start && oc.end <= currentInterval.end) ||
        (oc.start <= currentInterval.start && oc.end >= currentInterval.end)
      )
    });
    loop();
  }
  return hours;
}
