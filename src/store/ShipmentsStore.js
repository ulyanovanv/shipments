import { observable, action, decorate } from "mobx";

class ShipmentsStore {
  shipments = [];
  shipmentDetailsId = "";
  deletedShipments = [];

  modifyShipments(shipmentId, key, value) {
    if (!value) return;

    const findObj = obj => obj.id === shipmentId;
    let shipmentBeforeChange = this.shipments.find(findObj);
    let shipmentIndex = this.shipments.findIndex(findObj);
    let shipmentAfterChange = Object.assign({}, shipmentBeforeChange, {[key]: value});

    this.shipments[shipmentIndex] = shipmentAfterChange;
  }

  deleteShipment(shipmentId) {
    let shipments = this.shipments.slice();

    let deletedShipment = shipments.find(el => {
      return el.id === shipmentId;
    });

    let filteredShipments = shipments.filter(el => {
      return el.id !== shipmentId;
    });

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
  modifyShipments: action,
  setShipments: action,
  shipmentDetailsId: observable,
  setSelectedShipmentId: action,
  deleteShipment: action
});

export default ShipmentsStore;