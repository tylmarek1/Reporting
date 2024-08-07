import DeliveryTemplateItemModel from "./DeliveryTemplateItemModel";
import DeliveryTemplateUnitModel from "./DeliveryTemplateUnitModel";
import AddressTemplateModel from "./AddressTemplateModel";

export default interface DeliveryTemplateModel {
  //header
  //warehouse
  warehouse: AddressTemplateModel;
  //customer
  customer: AddressTemplateModel;
  //recipient (delivery address)
  recipient: AddressTemplateModel;
  // delivery note
  deliveryNoteCode: string;
  deliveryNoteDescription: string;
  //data
  items: DeliveryTemplateItemModel[];
  //footer
  //totals
  totalQuantity: number;
  totalQuantityOfUnits: number;
  totalQuantityOfUsedUnits: number;
  //pallets
  units: DeliveryTemplateUnitModel[];
  //createdby
  createdName: string;
  createdDate: string;
}
