import { observable, action, decorate } from "mobx";

class ShipmentsStore {
  shipments = [];
  shipmentDetailsId = "";

  modifyShipments(shipmentId, key, value) {
    if (!value) return;

    const findObj = obj => obj.id === shipmentId;
    let shipmentBeforeChange = this.shipments.find(findObj);
    let shipmentIndex = this.shipments.findIndex(findObj);
    let shipmentAfterChange = Object.assign({}, shipmentBeforeChange, {[key]: value});

    this.shipments[shipmentIndex] = shipmentAfterChange;
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
});

export default ShipmentsStore;