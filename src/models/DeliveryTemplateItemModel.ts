export default interface DeliveryTemplateItemModel {
  contract: string;
  orderCode: string;
  sscc: string;

  itemCode: string;
  itemExternalProductCode: string;
  batchCode: string;

  productionDate: string;
  expirationDate: string;

  itemDescription: string;
  numberOfUnits: number;
  quantityPerUnit: number;
  totalQuantity: number;
}
