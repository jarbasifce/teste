import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CarShopContext = React.createContext({});

/**
 * Gera UUID's
 */
function genUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

/**
 * Limita um número, ao intervalo [min >= value <= max]
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function limitar(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

/**
 * Soma ou pega o tempo maior do serviço
 * @param {String} configuracao
 * @param {Number} acc
 * @param {Object} ser
 */
function gerTempo(configuracao, acc, ser) {
  switch (configuracao) {
    case '0':
      return acc + ser.qtd * ser.duracao;
    case '1':
      return Math.max(acc, ser.duracao);
  }
  return acc;
}

const CarProvider = ({ children }) => {
  const [carShop, setCarShop] = React.useState({});
  const [currentServices, setCurrentServices] = React.useState(Number);

  /**
   * Serializa os dados do carrinho e salva no async storage
   */
  const loadFromMemory = async () => {
    const existingCarStorage = await AsyncStorage.getItem(
      '@vitservice:shoppingCart',
    );
    if (existingCarStorage) {
      const carStorage = JSON.parse(existingCarStorage);
      setCarShop(carStorage);
    }
  };

  /**
   * De-serializa os dados async storage e carrega o carrinho da memória
   */
  const saveToMemory = async () => {
    await AsyncStorage.setItem(
      '@vitservice:shoppingCart',
      JSON.stringify(carShop),
    );
  };

  /**
   * Reconta a quantidade de serviços nos pedidos
   */
  const updateCurrentServices = () => {
    let accum = 0;
    if (carShop) {
      Object.keys(carShop).forEach((key) => {
        carShop[key]?.pedidos?.forEach(
          (pedido) => (accum += pedido.total_servicos),
        );
      });
    }
    setCurrentServices(accum);
  };

  /**
   * Adiciona um serviço ao pedido
   * @param {Object} Pedido
   * @param {Object} Pedido.store
   * @param {String} Pedido.store.id
   * @param {String} Pedido.store.nome
   * @param {String} Pedido.store.ger_tempo
   * @param {Object} Pedido.service
   * @param {String} Pedido.service.id
   * @param {String} Pedido.service.nome
   * @param {Number} Pedido.service.valor
   * @param {String} Pedido.service.img
   * @param {Number} Pedido.service.qtd
   * @param {Number} Pedido.service.duracao
   * @param {String} [Pedido.service.id_pedido]
   */
  const insertService = ({ store, service }) => {
    try {
      // Se a loja não existe no carrinho, crie
      if (!carShop.hasOwnProperty(store.id)) {
        carShop[store.id] = {
          nome_loja: store.nome,
          ger_tempo: store.ger_tempo,
          pedidos: [],
        };
      }

      let pedido = null;
      let hasPedido = false;

      // Se for informado o id_pedido, adicionar item no pedido
      if (service.id_pedido) {
        // Checa se o pedido já existe
        pedido = carShop[store.id].pedidos.find(
          (p) => p.id_pedido === service.id_pedido,
        );
      }

      // Se não tiver pedido, cria
      if (!pedido) {
        pedido = {
          id_pedido: service.id_pedido || genUUID(),
          total_valor: 0,
          total_duracao: 0,
          total_servicos: 0,
          servicos: [],
        };
      } else {
        hasPedido = true;
      }

      // Checa se existe o serviço no pedido
      const busca_servico = pedido.servicos.find(
        (s) => s.service_id === service.id,
      );

      if (busca_servico) {
        busca_servico.qtd = limitar(busca_servico.qtd + service.qtd, 1, 7);
      } else {
        pedido.servicos.push({
          service_id: service.id,
          nome: service.nome,
          qtd: limitar(service.qtd, 1, 7),
          valor: Number(service.valor),
          duracao: Number(service.duracao),
          img: service.img,
        });
      }

      // Recalcula os totais do pedido
      pedido.total_valor = pedido.servicos.reduce(
        (acc, ser) => acc + ser.valor * ser.qtd,
        0,
      );
      pedido.total_duracao = pedido.servicos.reduce(
        (acc, ser) => gerTempo(carShop[store.id].ger_tempo, acc, ser),
        0,
      );
      pedido.total_servicos = pedido.servicos.reduce(
        (acc, ser) => acc + ser.qtd,
        0,
      );

      // Salva o pedido
      if (!hasPedido) {
        carShop[store.id].pedidos.push(pedido);
      }

      setCarShop({ ...carShop });
    } catch (error) {
      throw new Error(
        `Não foi possível adicionar um serviço\nMotivo:\n${error}`,
      );
    }
  };

  /**
   * Busca locais para agrupar o serviço aos pedidos
   * @param {Object} Pedido
   * @param {Object} Pedido.store
   * @param {String} Pedido.store.id
   * @param {Object} Pedido.service
   * @param {Number} Pedido.service.qtd
   */
  const findMerge = ({ store_id, qtd }) => {
    let pedidos_disponiveis = [];
    if (carShop.hasOwnProperty(store_id)) {
      pedidos_disponiveis = carShop[store_id].pedidos.map((p, i) => {
        if (p.total_servicos + qtd <= 7) {
          return { id: p.id_pedido };
        }
      });
    }
    return pedidos_disponiveis;
  };

  /**
   * Remove o serviço do pedido
   * @param {Object} service
   * @param {String} service.store_id
   * @param {String} service.id_pedido
   * @param {String} service.id_servico
   */
  const removeService = ({ service_id, store_id, id_pedido }) => {
    const pedido_atual = carShop[store_id].pedidos.find(
      (p) => p.id_pedido === id_pedido,
    );

    pedido_atual.servicos = pedido_atual.servicos.filter(
      (s) => s.service_id !== service_id,
    );

    pedido_atual.total_valor = pedido_atual.servicos.reduce(
      (acc, ser) => acc + ser.valor * ser.qtd,
      0,
    );
    pedido_atual.total_duracao = pedido_atual.servicos.reduce(
      (acc, ser) => gerTempo(carShop[store_id].ger_tempo, acc, ser),
      0,
    );
    pedido_atual.total_servicos = pedido_atual.servicos.reduce(
      (acc, ser) => acc + ser.qtd,
      0,
    );

    if (pedido_atual.servicos.length === 0) {
      carShop[store_id].pedidos = carShop[store_id].pedidos.filter(
        (p) => p.id_pedido !== pedido_atual.id_pedido,
      );
    }
    if (carShop[store_id].pedidos.length === 0) delete carShop[store_id];

    setCarShop({ ...carShop });
  };

  /**
   * Remove o pedido do carrinho
   * @param {Object} dados
   * @param {String} dados.store_id
   * @param {String} dados.id_pedido
   */
  const removePedido = ({ store_id, id_pedido }) => {
    carShop[store_id].pedidos = carShop[store_id].pedidos.filter((p) => {
      if (Array.isArray(id_pedido)) {
        return !id_pedido.includes(p.id_pedido);
      }
      return p.id_pedido != id_pedido;
    });

    if (carShop[store_id].pedidos.length === 0)
      delete carShop[store_id].servicos;
    setCarShop({ ...carShop });
  };

  const mergePedidos = ({ store_id, id_pedido_a, id_pedido_b }) => {
    if (carShop.hasOwnProperty(store_id)) {
      const pedido_a = carShop[store_id].pedidos.find(
        (p) => p.id_pedido === id_pedido_a,
      );
      const pedido_b = carShop[store_id].pedidos.find(
        (p) => p.id_pedido === id_pedido_b,
      );
      removePedido({ store_id, id_pedido: [id_pedido_a, id_pedido_b] });
      const uuid = genUUID();

      pedido_a.servicos.forEach((s) => {
        insertService({
          store: {
            id: store_id,
          },
          service: {
            ...s,
            id: s.service_id,
            id_pedido: uuid,
          },
        });
      });
      pedido_b.servicos.forEach((s) => {
        insertService({
          store: {
            id: store_id,
          },
          service: {
            ...s,
            id: s.service_id,
            id_pedido: uuid,
          },
        });
      });
    }
  };

  /**
   * Muda as quantidades de serviços do carrinho +/-
   * @param {String} type
   * @param {Object} dados
   * @param {String} dados.store_id
   * @param {String} dados.service_id
   * @param {String} dados.id_pedido
   */
  const changeQtd = (type, { store_id, id_pedido, service_id }) => {
    const pedido_atual = carShop[store_id].pedidos.find(
      (p) => p.id_pedido === id_pedido,
    );

    const serviceUpdate = pedido_atual.servicos.find(
      (s) => s.service_id === service_id,
    );

    if (type === '-' && serviceUpdate.qtd > 1) {
      serviceUpdate.qtd -= 1;
    } else if (type === '+' && serviceUpdate.qtd < 7) {
      serviceUpdate.qtd += 1;
    }

    pedido_atual.total_valor = pedido_atual.servicos.reduce(
      (acc, ser) => acc + ser.valor * ser.qtd,
      0,
    );
    pedido_atual.total_duracao = pedido_atual.servicos.reduce(
      (acc, ser) => gerTempo(carShop[store_id].ger_tempo, acc, ser),
      0,
    );
    pedido_atual.total_servicos = pedido_atual.servicos.reduce(
      (acc, ser) => acc + ser.qtd,
      0,
    );

    setCarShop({ ...carShop });
  };

  /**
   * Retorna o pedido
   * @param {Object} dados
   * @param {String} dados.store_id
   * @param {String} dados.id_pedido
   */
  const getPedido = ({ store_id, id_pedido }) => {
    if (carShop.hasOwnProperty(store_id)) {
      return carShop[store_id].find((p) => p.id_pedido === id_pedido);
    }
    return null;
  };

  /**
   * Remove Carrinho do AsyncStorage
   */
  const cleanMemory = async () => {
    await AsyncStorage.removeItem('@vitservice:shoppingCart');
  };

  /**
   * Limpa carrinho removendo todos os pedidos
   */
  const cleanCar = async () => {
    setCarShop({});
    cleanMemory();
  };

  React.useEffect(() => {
    loadFromMemory();
  }, []);

  React.useEffect(() => {
    updateCurrentServices();
    saveToMemory();
  }, [carShop]);

  return (
    <CarShopContext.Provider
      value={{
        carShop,
        currentServices,
        insertService,
        removeService,
        removePedido,
        findMerge,
        mergePedidos,
        getPedido,
        changeQtd,
        cleanCar,
      }}
    >
      {children}
    </CarShopContext.Provider>
  );
};

export default CarProvider;
