import { Image, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

import DeliveryTemplateModel from "../../models/DeliveryTemplateModel";

import { WhiteSpace } from './header';
import { formatNumber } from "../../utils/number";
import styles from "../components/styles";
import { DataHeader, DataNormal, DataDate, DataNumber} from "../components/data";
import { Razitko } from "./image";

type RenderComponentProps = {
  data: DeliveryTemplateModel;
};

const UnitTableHeader = () => {
    return (
    <View fixed style={styles.tableRow}>
        <DataHeader flexV={1} item="Pallet"/>
        <DataHeader flexV={2} item="Pallet Description"/>
        <DataHeader flexV={1} item="Total"/>
    </View>
    );
};

const UnitTableBody = (props: RenderComponentProps) => {
    const { data } = props;
    const { units } = data
    if (!units) {
        return null; // or some fallback UI
    }
    return (
        <Fragment>
        {units.map(unit => (
          <View wrap={false} key={`dataItemRow_${unit.unitCode}`} style={styles.tableRow}>
            <DataNormal flexV={1} item={unit.unitCode}/>
            <DataNormal flexV={2} item={unit.unitDescription}/>
            <DataNumber flexV={1} item={unit.total}/>
          </View>
        ))}
        </Fragment>
    );
};

const UnitTable = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View style={styles.table}>
            <UnitTableHeader />
            <UnitTableBody data={data} />
        </View>
    );
};

const TotalRow: React.FC<{ value: number; itemV: string }> = ({ value, itemV }) => (
    <View wrap={false} style={[styles.tableRow, styles.bold]}>
        <View style={[styles.tableCol, styles.data_tableCol, styles.noBorderRight ,{flex: 1}]}>
            <View style={styles.tableCell}>
                <Text>{itemV}</Text>
            </View>
        </View>
        <DataNormal flexV={2} item="" />
        <DataNumber flexV={1} item={value} />
    </View>
);

const TotalUnitRow = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <TotalRow value={data.totalQuantityOfUnits} itemV="Total number of pallet(s):"/>
    );
};

const TotalUsedUnitRow = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <TotalRow value={data.totalQuantityOfUsedUnits} itemV="Total of used pallet(s):"/>
    );
};

const CreatedBy = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View wrap={false} style={[styles.tableCol]}>
            <Text style={styles.bold}>Created by:</Text>
            <Text>Name: {data.createdName}</Text>
            <Text>Date: {data.createdDate}</Text>
            <Text>Stamp:</Text>
            <Razitko />
            <Text>Signature:</Text>
        </View>
    );
};

const Truck = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View wrap={false} style={[styles.tableCol]}>
            <Text style={styles.bold}>Truck/Trailer:</Text>
            <Text>Licences</Text>
            <Text> </Text>
            <Text>Cargo Seal nb.::</Text>
            <WhiteSpace size={50}/>
            <Text>Driver's Signature:</Text>
        </View>
    );
};

const Received = (props: RenderComponentProps) => {
    const { data } = props;
  
    return (
        <View wrap={false} style={[styles.tableCol]}>
            <Text style={styles.bold}>Received and checked by:</Text>
            <Text>Name:</Text>
            <Text>Date:</Text>
            <Text>Stamp:</Text>
            <WhiteSpace size={50}/>
            <Text>Signature:</Text>
        </View>
    );
};


export {UnitTable, TotalUnitRow, TotalUsedUnitRow, CreatedBy, Truck, Received}