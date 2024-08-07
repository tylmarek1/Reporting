import { Image, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

import { formatNumber } from "../../utils/number";

import styles from "../components/styles";


const DataHeader: React.FC<{ flexV: number; item: string }> = ({ flexV, item }) => (
    <View style={[styles.tableCol, styles.dataHeader_tableCol, {flex: flexV}]}>
        <View style={[styles.tableCell, styles.dataHeader_tableCell]}>
            <Text>{item}</Text>
        </View>
    </View>
);

const DataNormal: React.FC<{ flexV: number; item: string }> = ({ flexV, item }) => (
    <View style={[styles.tableCol, styles.data_tableCol, {flex: flexV}]}>
        <View style={styles.tableCell}>
            <Text>{item}</Text>
        </View>
    </View>
);
const DataDate: React.FC<{ flexV: number; item: string }> = ({ flexV, item }) => (
    <View style={[styles.tableCol, styles.data_tableCol, styles.colDate, {flex: flexV}]}>
        <View style={styles.tableCell}>
            <Text>{item}</Text>
        </View>
    </View>
);
const DataNumber: React.FC<{ flexV: number; item: number }> = ({ flexV, item }) => (
    <View style={[styles.tableCol, styles.col1, styles.data_tableCol, styles.alignItemsEnd, {flex: flexV}]}>
        <View style={styles.tableCell}>
            <Text>{formatNumber(item)}</Text>
        </View>
    </View>
);


export { DataHeader, DataNormal, DataDate, DataNumber}