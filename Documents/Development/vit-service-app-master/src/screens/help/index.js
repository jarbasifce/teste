import React from 'react';
import { Text, ScrollView } from 'react-native';

import style from './styles';

const Help = () => {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Aproveite a vida! </Text>
      <Text style={style.paragraph}>
        Com o App Vit Service você faz seu pedido do jeito mais simples e
        rápido. Faça seu pedido pelo celular e escolha como deseja receber seu
        pedido. As funções foram projetadas de forma intuitiva, visando te
        ajudar no processo a seguir.
      </Text>
      <Text style={style.paragraph}>Como pedir pelo Vit Service?</Text>
      <Text style={style.paragraph}>
        1 – Selecione a categoria de serviços que deseja realizar o pedido, em
        seguida escolha o estabelecimento que estiver disponível.
      </Text>
      <Text style={style.paragraph}>
        2 – Navegue pelos serviços ofertados pelas lojas e selecione os itens
        que irão compor sua cestinha de compras.
      </Text>
      <Text style={style.paragraph}>
        3 – Ao clicar na cestinha de compras, realize o agendamento dos seus
        serviços solicitados, escolha a forma de pagamento e como deseja ser
        atendido (balcão ou delivery).
      </Text>
      <Text style={style.paragraph}>
        4 – Verifique todas as informações do seu pedido e confirme o pedido.
      </Text>
      <Text style={style.paragraph}>
        5 – Acompanhe seu pedido em Meus pedidos ou consulte sua agenda.
      </Text>
    </ScrollView>
  );
};

export default Help;
