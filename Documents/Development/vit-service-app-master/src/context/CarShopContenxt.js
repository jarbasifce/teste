/* eslint-disable no-unused-expressions */
/* eslint-disable no-prototype-builtins */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CarShopContext = React.createContext({});

const CarProvider = ({ children }) => {
  const [carShop, setCarShop] = React.useState({});
  const [currentServices, setCurrentServices] = React.useState(Number);

  const updateCurrentServices = () => {
    let accum = 0;
    if (carShop) {
      Object.keys(carShop).forEach((key) => {
        carShop[key]?.servicos?.forEach((servico) => {
          servico?.items?.forEach((item) => {
            accum += (item || { qtd: 0 }).qtd;
          });
        });
      });
    }
    setCurrentServices(accum);
  };

  const carShopStore = async () => {
    const existingCarStorage = await AsyncStorage.getItem('carShop');
    const carStorage = JSON.parse(existingCarStorage);
    if (carStorage) {
      setCarShop(carStorage);
    }
  };

  const updateCarStorage = async () => {
    await AsyncStorage.setItem('carShop', JSON.stringify(carShop));
  };

  React.useEffect(() => {
    carShopStore();
  }, []);

  React.useEffect(() => {
    updateCurrentServices();
    updateCarStorage();
  }, [carShop]);

  const addService = (item) => {
    if (carShop.hasOwnProperty(item.store_id)) {
      if (carShop[item.store_id].hasOwnProperty('servicos')) {
        const serviceUpdate = carShop[item.store_id].servicos.find((el) => {
          return el.id === item.services_id;
        });
        if (serviceUpdate) {
          const product = serviceUpdate.items.find(
            (pro) => pro.id === item.product.id,
          );
          if (product) {
            product.qtd = Math.min(7, (product.qtd += item.product.qtd));
            product.price = product.qtd * product.unit_price;
            serviceUpdate.total += item.product.qtd * item.product.unit_price;
            serviceUpdate.total_duration += item.product.duracao;
            setCarShop({ ...carShop });
          } else {
            serviceUpdate.items.push({
              id: item.product.id,
              nome: item.product.nome,
              duracao: item.product.duracao,
              unit_price: item.product.unit_price,
              qtd: item.product.qtd,
              price: item.product.qtd * item.product.unit_price,
            });
            serviceUpdate.total += item.product.qtd * item.product.unit_price;

            if (carShop[item.store_id].ger_tempo === '1') {
              serviceUpdate.total_duration = Math.max(
                serviceUpdate.total_duration,
                item.product.duracao,
              );
            } else {
              serviceUpdate.total_duration += item.product.duracao;
            }
            setCarShop({ ...carShop });
          }
        } else {
          carShop[item.store_id].servicos.push({
            id: item.services_id,
            total: item.product.qtd * item.product.unit_price,
            total_duration: item.product.duracao,
            ger_tempo: item.ger_tempo,
            address_id: null,
            items: [
              {
                id: item.product.id,
                nome: item.product.nome,
                duracao: item.product.duracao,
                unit_price: item.product.unit_price,
                qtd: item.product.qtd,
                price: item.product.qtd * item.product.unit_price,
              },
            ],
          });
          setCarShop({ ...carShop });
        }
      } else {
        carShop[item.store_id].servicos = [
          {
            id: item.services_id,
            total: item.product.qtd * item.product.unit_price,
            total_duration: item.product.duracao,
            ger_tempo: item.ger_tempo,
            address_id: null,
            items: [
              {
                id: item.product.id,
                nome: item.product.nome,
                duracao: item.product.duracao,
                unit_price: item.product.unit_price,
                qtd: item.product.qtd,
                price: item.product.qtd * item.product.unit_price,
              },
            ],
          },
        ];
        setCarShop({ ...carShop });
      }
    } else {
      setCarShop({
        ...carShop,
        [item.store_id]: {
          name: item.name,
          servicos: [
            {
              id: item.services_id,
              total: item.product.qtd * item.product.unit_price,
              total_duration: item.product.duracao,
              ger_tempo: item.ger_tempo,
              address_id: null,
              items: [
                {
                  id: item.product.id,
                  nome: item.product.nome,
                  duracao: item.product.duracao,
                  unit_price: item.product.unit_price,
                  qtd: item.product.qtd,
                  price: item.product.qtd * item.product.unit_price,
                },
              ],
            },
          ],
        },
      });
    }
  };

  const removeService = (item) => {
    const currentService = carShop[item.store_id].servicos.find(
      (service) => service.id === item.service_id,
    );

    const serviceDelete = currentService.items.find(
      (ser) => ser.id === item.product_id,
    );
    currentService.total -= serviceDelete.price;
    currentService.total_duration -= serviceDelete.duracao;

    currentService.items = currentService.items.filter(
      (ser) => ser.id !== item.product_id,
    );

    if (currentService.items.length === 0) {
      carShop[item.store_id].servicos = carShop[item.store_id].servicos.filter(
        (servico) => servico.id !== currentService.id,
      );
    }

    if (carShop[item.store_id].servicos.length === 0) {
      delete carShop[item.store_id];
    }
    setCarShop({ ...carShop });
  };

  const removePedido = (item) => {
    carShop[item.store_id].servicos = carShop[item.store_id].servicos.filter(
      (el) => el.id !== item.service.id,
    );
    if (carShop[item.store_id].servicos.length === 0) {
      delete carShop[item.store_id].servicos;
    }
    setCarShop({ ...carShop });
  };

  const changeQtd = (type, item) => {
    const currentService = carShop[item.store_id].servicos.find(
      (service) => service.id === item.service_id,
    );

    const serviceUpdate = currentService.items.find(
      (ser) => ser.id === item.product_id,
    );

    if (type === '-' && serviceUpdate.qtd > 1) {
      serviceUpdate.qtd -= 1;
      serviceUpdate.price = serviceUpdate.qtd * serviceUpdate.unit_price;
      currentService.total -= serviceUpdate.unit_price;
      // currentService.total_duration -= serviceUpdate.duracao;
    } else if (type === '+' && serviceUpdate.qtd < 7) {
      serviceUpdate.qtd += 1;
      serviceUpdate.price = serviceUpdate.qtd * serviceUpdate.unit_price;
      currentService.total += serviceUpdate.unit_price;
      // currentService.total_duration += serviceUpdate.duracao;
    }

    setCarShop({ ...carShop });
  };

  const removeStore = (storeId) => {
    delete carShop[storeId];
    setCarShop({ ...carShop });
  };

  return (
    <CarShopContext.Provider
      value={{
        carShop,
        addService,
        currentServices,
        removeService,
        removePedido,
        removeStore,
        changeQtd,
      }}
    >
      {children}
    </CarShopContext.Provider>
  );
};

export default CarProvider;
