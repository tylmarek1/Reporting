import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { formatNumber } from "../../utils/number";

import styles from "./styles";


const DataHeader: React.FC<{ flexV: number; item: string }> = ({ flexV, item }) => (
    <View style={[styles.tableCol, styles.dataHeader_tableCol, {flex: flexV}]}>
        <View style={[styles.tableCell, styles.dataHeader_tableCell]}>
            <Text>{item}</Text>
        </View>
    </View>
);

const breakLongString = (text: string, maxLineLength: number): string[] => {
    const result: string[] = [];
    const totalLength = text.length;
    const isLetterOrNumber = (char: string) => /[a-zA-Z0-9]/.test(char);
    
    for (let i = 0; i < totalLength; i += maxLineLength) {
        let segment = text.substring(i, i + maxLineLength);
        
        // Check if we should append a hyphen
        if (segment.length === maxLineLength && i + maxLineLength < totalLength) {
            // Check the last character of the current segment
            const lastChar = segment[segment.length - 1];
            // Check the first character of the next segment
            const nextChar = text[i + maxLineLength];
            
            // Append hyphen if both characters are letters or numbers
            if (isLetterOrNumber(lastChar) && isLetterOrNumber(nextChar)) {
                segment += '-';
            }
        }
        
        result.push(segment);
    }
    
    return result;
};

const DataNormal: React.FC<{ flexV: number; item: string; breakeLength: number }> = ({ flexV, item, breakeLength }) => (
    <View style={[styles.tableCol, styles.data_tableCol, { flex: flexV }]}>
        <View style={styles.tableCell}>
            {breakLongString(item, breakeLength).map((line, i) => (
                <Text key={i}>{line}</Text>
            ))}
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