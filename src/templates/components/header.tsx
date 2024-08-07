import { Image, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

import DeliveryTemplateModel from "../../models/DeliveryTemplateModel";

import { generateBarcode } from "../../helpers/barcode";

import styles from "../components/styles";

import AddressTemplateModel from "../../models/AddressTemplateModel";

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
            <Text>{data.Name}</Text>
            <Text>{data.Street}</Text>
            <Text>{`${data.ZipCode} ${data.City}, ${data.Country}`}</Text>
            <Text>email: {data.Email}</Text>
            <Text>tel: {data.Phone}</Text>
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
                            <Image src="data:image/png;base64,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" />
                            <Text>www.tqm.cz</Text>
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