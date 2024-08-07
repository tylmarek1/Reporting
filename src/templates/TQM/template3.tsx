import ReactPDF, { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

import DeliveryTemplateModel from "../../models/DeliveryTemplateModel";
import styles from "../components/styles";
import { DocumentPager, WhiteSpace, Warehouse, DeliveryNote, Customer, Recipient} from '../components/header';
import { UnitTable, TotalUnitRow, TotalUsedUnitRow, CreatedBy, Truck, Received } from '../components/footer';
import { DataHeader, DataNormal, DataDate, DataNumber} from "../components/data";

interface PDFProps {
  data: DeliveryTemplateModel;
}

type RenderComponentProps = {
  data: DeliveryTemplateModel;
};

const DataHeaderRow = () => (
  <View fixed style={[styles.tableRow, styles.table]}>
    <DataHeader flexV={1} item="Item"/>
    <DataHeader flexV={3} item="Item Description"/>
  </View>
);

const DataBody = (props: RenderComponentProps) => {
  const { data } = props;
  const { items } = data;

  return (
    <Fragment>
      {items.map(item => (
        <View wrap={false} key={`dataItemRow_${item.orderCode}`} style={styles.tableRow}>
          <DataNormal flexV={1} item={item.itemCode} />
          <DataNormal flexV={3} item={item.itemDescription} />
        </View>
      ))}
    </Fragment>
  );
};

const Header = (props: RenderComponentProps) => {
  const { data } = props;

  return (
    <View style={[styles.table]}>
      <View style={[styles.tableRow]}>
          <Warehouse data={data} />
          <DeliveryNote data={data} />
      </View>
      <View style={[styles.tableRow]}>
          <Customer data={data} />
          <Recipient data={data} />
      </View>
    </View>
  );
};

const Footer = (props: RenderComponentProps) => {
  const { data } = props;

  return (
      <View wrap={false} style={styles.table}>
          <View style={styles.tableRow}>
              <CreatedBy data={data} />
              <Truck data={data} />
              <Received data={data} />
          </View>
      </View>
  );
};

const PDF = (props: PDFProps) => {
  const { data } = props;

  return (
    <Document>
      <Page wrap size="A4" orientation="landscape" style={styles.page}>
        <Header data={data} />
        <DocumentPager />
        <DataHeaderRow />
        <DataBody data={data} />
        <WhiteSpace size={20}/>
        <UnitTable data={data} />
        <TotalUnitRow data={data} />
        <WhiteSpace size={20}/>
        <Footer data={data} />
      </Page>
    </Document>
  );
};

export default async (data: DeliveryTemplateModel) => {
  const result = await ReactPDF.renderToStream(<PDF data={{ ...data }} />);
  return result;
};
