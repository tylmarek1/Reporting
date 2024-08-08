import { Image, Text, View } from "@react-pdf/renderer";
import React from "react";

import { generateBarcode } from "../../helpers/barcode";
import DeliveryTemplateModel from "../../models/DeliveryTemplateModel";
import AddressTemplateModel from "../../models/AddressTemplateModel";
import styles from "./styles";


type RenderComponentProps = {
  data: DeliveryTemplateModel;
};

type AddressData = {data: AddressTemplateModel;};

const DocumentPager = () => (
    <View fixed style={[styles.tableRow, styles.nestedTableWithoutBorder_tableRow]}>
      <View style={[styles.tableCol, styles.documentPager_tableCol, styles.nestedTableWithoutBorder_tableCol]}>
        <View style={[styles.tableCell]}>
          <Text render={({ pageNumber, totalPages }) => (`Number of pages: ${pageNumber} / ${totalPages}`)} />
        </View>
      </View>
    </View>
);
const WhiteSpace = ({size}: {size: number}) => (
    <View style={{height: size}} />
);


const Address = (props: AddressData) => {
    const { data } = props
    return (
        <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol]}>
        <View style={styles.tableCell}>
            <Text>{data.name}</Text>
            <Text>{data.street}</Text>
            <Text>{`${data.zipCode} ${data.city}, ${data.country}`}</Text>
            <Text>email: {data.email}</Text>
            <Text>tel: {data.phone}</Text>
        </View>
        </View>
    );
};
const Warehouse = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View style={[styles.tableCol, styles.reportHeader_tableCol]}>
            <View style={[styles.table, styles.nestedTableWithoutBorder]}>
                <View style={[styles.tableRow, styles.nestedTableWithoutBorder_tableRow]}>
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol, styles.bold]}>
                    <View style={styles.tableCell}>
                        <Text>Warehouse:</Text>
                    </View>
                    </View>
                    <Address data={data.warehouse} />
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol, styles.reportHeader_nestedTableWithoutBorder_colReportHeaderLogo]} >
                        <View style={[styles.tableCell, styles.reportHeader_nestedTableWithoutBorder_cellReportHeaderLogo]}>
                            <Image src={`data:image/png;base64,${data.warehouseLogo}`} />
                            <Text>{data.warehouseWww}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
const DeliveryNote = (props: RenderComponentProps) => {
    const { data } = props;
    const barcode = generateBarcode(data.deliveryNoteCode);
  
    return (
        <View style={[styles.tableCol, styles.reportHeader_tableCol]}>
            <View style={[styles.table, styles.nestedTableWithoutBorder]}>
                <View style={[styles.tableRow, styles.nestedTableWithoutBorder_tableRow, styles.deliveryNote_Row]}>
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol]}>
                        <View style={[styles.tableCell]}>
                            <Text style={styles.bold}>Delivery Note:</Text>
                            <Text>{data.deliveryNoteCode}</Text>
                            <Text>{data.deliveryNoteDescription}</Text>
                        </View>
                    </View>
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol]}>
                        <View style={styles.tableCell}>
                        {barcode && (
                            <View style={[styles.tableCol, styles.deliveryAddress_colBarcode, styles.nestedTableWithoutBorder_tableCol]}>
                                <View style={[styles.tableCell, styles.deliveryAddress_cellBarcode]}>
                                    <Image src={barcode} />
                                </View>
                            </View>
                        )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
const Customer = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View style={[styles.tableCol, styles.reportHeader_tableCol]}>
            <View style={[styles.table, styles.nestedTableWithoutBorder]}>
                <View style={[styles.tableRow, styles.nestedTableWithoutBorder_tableRow]}>
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol, styles.bold]}>
                        <View style={styles.tableCell}>
                            <Text>Customer:</Text>
                        </View>
                    </View>
                    <Address data={data.customer} />
                </View>
            </View>
        </View>
    );
};
const Recipient = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View style={[styles.tableCol, styles.reportHeader_tableCol]}>
            <View style={[styles.table, styles.nestedTableWithoutBorder]}>
                <View style={[styles.tableRow, styles.nestedTableWithoutBorder_tableRow]}>
                    <View style={[styles.tableCol, styles.nestedTableWithoutBorder_tableCol, styles.bold]}>
                        <View style={styles.tableCell}>
                            <Text>Recipient:</Text>
                        </View>
                    </View>
                    <Address data={data.recipient} />
                </View>
            </View>
        </View>
    );
};



export {DocumentPager, WhiteSpace, Warehouse, DeliveryNote, Customer, Recipient}