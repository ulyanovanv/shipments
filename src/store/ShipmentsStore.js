import { observable, action, decorate } from 'mobx';

class ShipmentsStore {
  shipments = [];

  shipmentDetailsId = '';

  deletedShipments = [];

  modifyShipments(shipmentId, key, value) {
    if (!value) return;

    const findObj = obj => obj.id === shipmentId;
    const shipmentBeforeChange = this.shipments.find(findObj);
    const shipmentIndex = this.shipments.findIndex(findObj);
    const shipmentAfterChange = Object.assign({}, shipmentBeforeChange, { [key]: value });

    this.shipments[shipmentIndex] = shipmentAfterChange;
  }

  deleteShipment(shipmentId) {
    const shipments = this.shipments.slice();

    const deletedShipment = shipments.find(el => el.id === shipmentId);

    const filteredShipments = shipments.filter(el => el.id !== shipmentId);

    this.shipments = filteredShipments;
    this.deletedShipments.push(deletedShipment);

    return filteredShipments;
  }

  setShipments(shipments) {
    this.shipments = shipments;
  }

  setSelectedShipmentId(id) {
    this.shipmentDetailsId = id;
  }
}

decorate(ShipmentsStore, {
  shipments: observable,
  shipmentDetailsId: observable,
  deletedShipments: observable,
  modifyShipments: action,
  deleteShipment: action,
  setShipments: action,
  setSelectedShipmentId: action,
});

export default ShipmentsStore;
