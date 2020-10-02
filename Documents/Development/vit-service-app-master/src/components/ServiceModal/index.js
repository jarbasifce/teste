import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

function humanitizeTime(time) {
  let t = '';
  t += Math.floor(time / 60) % 24 > 0 ? `${Math.floor(time / 60) % 24}h ` : '';
  t += time % 60 > 0 ? `${time % 60}min ` : '';
  return t;
}

class ServiceModal extends React.Component {
  state = {
    service: {},
    visible: false,
    quantity: 1
  };

  openModal(item) {
    this.setState({
      service: {
        id: item.id,
        nome: item.nome,
        valor: Number(item.valor) * (1 - Number(item.desconto) / 100.0),
        descricao: item.descricao,
        img: item.url_image,
        duracao: item.duracao,
        desconto: item.desconto,
        store_id: item.store_id,
        storeName: item.storeName,
        ger_tempo: item.ger_tempo,
      },
      visible: true,
      quantity: 1,
    });
  }

  closeModal() {
    this.setState({ visible: false });
  }

  addQty() {
    this.setState({ quantity: Math.min(7, this.state.quantity + 1) });
  }

  removeQty() {
    this.setState({ quantity: Math.max(1, this.state.quantity - 1) });
  }

  addToCar(product) {
    const currentOrders = this.props.check({
      store_id: product.store_id,
      qtd: this.state.quantity
    });
    this.props.add({
      store: {
        id: product.store_id,
        nome: product.storeName,
        ger_tempo: product.ger_tempo,
      },
      service: {
        id: product.id,
        nome: product.nome,
        valor: product.valor,
        descricao: product.descricao,
        img: product.img,
        duracao: product.duracao,
        qtd: this.state.quantity,
        id_pedido: currentOrders.length > 0 ? currentOrders[0].id : undefined
      }
    });
    this.closeModal();
  }

  render() {
    return (
      <>
        <Modal
          style={styles.modalContainer}
          transparent
          animationType="fade"
          visible={this.state.visible}
        >
          <View style={styles.modalScreen}>
            <TouchableWithoutFeedback onPress={() => this.closeModal()}>
              <View style={styles.modalOverflow} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContentUp}>
              <View style={{ flex: 0.30, width: '100%' }}>
                <Image
                  source={{ uri: this.state.service.img }}
                  style={{ width: '100%', height: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12, }}
                />
              </View>
              <View style={{ width: '100%', flex: 0.70, alignItems: 'center', paddingTop: 12, backgroundColor: 'white', borderRadius: 16, transform: [{ translateY: -12 }] }}>
                <Text style={styles.modalItemTitleLabel}>{this.state.service.nome}</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', borderTopColor: '#f3f3f3', borderTopWidth: 1, borderBottomColor: '#f3f3f3', borderBottomWidth: 1, marginTop: 12, paddingTop: 12, marginBottom: 12, paddingBottom: 12 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    {Number(this.state.service.desconto) > 0 && <Text style={styles.modalPricingOffLabel}>{this.state.service.desconto}% OFF</Text>}
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.modalPricingLabel}>
                        R${' '}
                        {Number(this.state.service.valor)
                          .toFixed(2)
                          .replace('.', ',')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome
                      name="clock-o"
                      color="#3f3f3f"
                      size={12}
                      style={styles.modalDurationIcon}
                    />
                    <Text style={styles.modalDurationLabel}>
                      {humanitizeTime(this.state.service.duracao)}
                    </Text>
                  </View>
                </View>
                <ScrollView style={{ maxHeight: 80, marginBottom: 18, borderBottomColor: '#f3f3f3', borderBottomWidth: 1 }} contentContainerStyle={{ paddingHorizontal: 12 }}>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.modalDescriptionLabel}>
                      {this.state.service.descricao}
                    </Text>
                  </View>
                </ScrollView>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.modalQuantityTitleLabel}>Quantidade</Text>
                  <View style={styles.modalQuantityInnerContainer}>
                    <TouchableOpacity
                      onPress={() => this.removeQty()}
                      style={styles.modalQuantityButtonLeft}
                    >
                      <Text style={styles.modalQuantityButtonLabel}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalQuantityLabel}>
                      {this.state.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.addQty()}
                      style={styles.modalQuantityButtonRight}
                    >
                      <Text style={styles.modalQuantityButtonLabel}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.modalFooterContainer}>
                  <View style={styles.modalRejectButtonContainer}>
                    <TouchableOpacity
                      onPress={() => this.closeModal()}
                      style={styles.modalRejectButton}
                    >
                      <Text style={[styles.modalFooterButtonsLabel, { color: '#6C757D' }]}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalAcceptButtonContainer}>
                    <TouchableOpacity
                      style={styles.modalAcceptButton}
                      onPress={() => this.addToCar(this.state.service)}
                    >
                      <Text style={styles.modalFooterButtonsLabel}>
                        Adicionar
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default ServiceModal;
