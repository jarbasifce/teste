import React from 'react';
import { ScrollView, Text } from 'react-native';

import style from './styles';

const Terms = () => {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Política de privacidade </Text>
      <Text style={style.paragraph}>
        O Vit Service é um App inovador, que zela pela segurança e privacidade
        dos dados pessoais de seus usuários.
      </Text>
      <Text style={style.paragraph}>
        Ao realizar o download e utilizar o aplicativo para fazer seus pedidos,
        você automaticamente estará concordando com a nossa política de
        privacidade.
      </Text>
      <Text style={style.paragraph}>
        1 – Os dados que foram utilizados pelo usuário para realizar o registro
        no Vit Service App serão utilizados para realizar pedidos no aplicativo.
        Caso seja identificado uma série de trotes por parte de um determinado
        usuário, os dados serão repassados para providências por parte das
        lojas.
      </Text>
      <Text style={style.paragraph}>
        2 – O usuário estará sujeito ao cancelamento do seu pedido por parte das
        lojas e do administrador do sistema, seja por problemas técnicos ou
        operacionais para conclusão do pedido.
      </Text>
      <Text style={style.paragraph}>
        3 – O Vit Service App não garante ou assegura o cumprimento de qualquer
        promoção, ofertas ou anúncios realizados pelas lojas e profissionais no
        aplicativo.
      </Text>
      <Text style={style.paragraph}>
        4 – O Vit Service App não é responsável por problemas ou danos aos
        clientes, seja devido ao atendimento não satisfatório ou prejuízos que
        os usuários venham sofrer ao adquirir dentro da plataforma. O aplicativo
        atua como um intermediário entre as lojas e os clientes. As lojas são
        responsáveis por o bom atendimento, qualidade dos produtos e serviços,
        pagamentos e entrega.
      </Text>
      <Text style={style.paragraph}>
        Caso discorde da nossa política de privacidade, você pode remover o
        aplicativo do seu smartphone.
      </Text>
    </ScrollView>
  );
};

export default Terms;
