import { Font, StyleSheet } from "@react-pdf/renderer";

import path from "path";

const TimesNewRoman = path.resolve(__dirname, "../../assets/fonts/TimesNewRoman/times-new-roman.ttf");
const TimesNewRomanBold = path.resolve(__dirname, "../../assets/fonts/TimesNewRoman/times-new-roman-bold.ttf");

const fontFamilyName = "TimesNewRoman";

Font.register({
  family: fontFamilyName,
  fonts: [
    { src: TimesNewRoman, fontWeight: 400 },
    { src: TimesNewRomanBold, fontWeight: 700 },
  ],
  format: "truetype",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: fontFamilyName,
    fontSize: 9,
    lineHeight: 1.1,
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "#ffffff",
  },

  table: {
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderTopStyle: "solid",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    borderLeftWidth: 1,
    borderLeftColor: "#000000",
    borderLeftStyle: "solid",
  },

  tableCol: {
    flexGrow: 1,
    borderRightWidth: 1,
    borderRightColor: "#000000",
    borderRightStyle: "solid",
    padding: 3,
  },

  tableCell: {
    /**
     * minWidth = 0 je z důvodu aby nedocházelo k přetečení obsahu při dlouhých textech.
     */
    minWidth: 0,
    wordWrap: "break-word",
  },


  nestedTableWithoutBorder: {
    /**
     * Záporný margin je tady z toho důvodu, že tabulka je uvnitř buňky která má nastavéný ve výchozím stavu padding.
     * Záporným marginem dojde k vyresetování paddingu na vnější buňce.
     */
    margin: -3,
    lineHeight: 1.4,
    borderWidth: 0,
  },

  nestedTableWithoutBorder_tableRow: {
    borderWidth: 0,
  },

  nestedTableWithoutBorder_tableCol: {
    flexGrow: 0,
    borderWidth: 0,
  },

  /**
   * Definice sloupců pro data START.
   */

  colDate: {
    alignItems: "center",
  },

  col1: {
    flex: 1,
  },
  col3: {
    flex: 3,
  },

  /**
   * Definice sloupců pro data END.
   */
  /**
   * Definice sloupců pro Pallet START.
   */

  colPalletSide: {
    minWidth: "25%",
    maxWidth: "25%",
  },
  colPalletMiddle: {
    minWidth: "50%",
    maxWidth: "50%",
  },
  colPalletLarge: {
    minWidth: "75%",
    maxWidth: "75%"
  },

  /**
   * Definice sloupců pro Pallet END.
   */

  /**
   * Úpravy pro konkrétní sekce START
   */


  reportHeader_tableCol: {
    flex: 1,
  },

  reportHeader_nestedTableWithoutBorder: {
    flex: 1,
  },

  reportHeader_nestedTableWithoutBorder_tableCol: {
    flexGrow: 0,
  },

  reportHeader_nestedTableWithoutBorder_colReportHeaderLogo: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    textAlign: "center",
  },

  reportHeader_nestedTableWithoutBorder_cellReportHeaderLogo: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 55,
  },

  deliveryAddress_colBarcode: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
  },

  deliveryNote_Row: {
    justifyContent: "space-between",
  },

  deliveryAddress_cellBarcode: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 130,
  },

  documentPager_tableCol: {
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderTopStyle: "solid",
  },

  dataHeader_tableCol: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },

  dataHeader_tableCell: {
    alignItems: "center",
  },

  data_tableCol: {
    justifyContent: "center",
  },

  dataSum_tableCol: {
    justifyContent: "center",
  },

  signature_tableCol: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  /**
   * Úpravy pro konkrétní sekce END
   */

  /**
   * Helpers START
   */

  noBorderRight: {
    borderRightWidth: 0,
  },

  noBorderBottom: {
    borderBottomWidth: 0,
  },

  alignRight: {
    justifyContent: "flex-end",
  },

  alignItemsEnd: {
    alignItems: "flex-end",
  },

  textAlignCenter: {
    alignItems: "center",
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
  },


  /**
   * Helpers END
   */
});

export default styles;
