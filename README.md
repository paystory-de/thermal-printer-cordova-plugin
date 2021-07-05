## Cordova Plugin for Thermal Printer's
[![npm version](https://img.shields.io/npm/v/thermal-printer-cordova-plugin.svg)](https://www.npmjs.com/package/thermal-printer-cordova-plugin) [![npm downloads](https://img.shields.io/npm/dm/thermal-printer-cordova-plugin.svg)](https://www.npmjs.com/package/thermal-printer-cordova-plugin)

---

This plugin is a wrapper for the [Android library for ESC/POS Thermal Printer](https://github.com/DantSu/ESCPOS-ThermalPrinter-Android).

### Install

#### Cordova

    $ cordova plugin add thermal-printer-cordova-plugin

#### Ionic

    $ ionic cordova plugin add thermal-printer-cordova-plugin

#### Capacitor

    $ npm install thermal-printer-cordova-plugin
    $ npx cap sync

Don't forget to add BLUETOOTH and INTERNET (for TCP) permissions and for USB printers the `android.hardware.usb.host` feature to the `AndroidManifest.xml`.

    <uses-feature android:name="android.hardware.usb.host" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.INTERNET" />

### listPrinters(data, successCallback, errorCallback)
List available printers

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;usb&quot;</code> | Type of list: bluetooth or usb |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="printFormattedText"></a>

### printFormattedText(data, successCallback, errorCallback)
Print a formatted text and feed paper

**See**: https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| [data.mmFeedPaper] | <code>number</code> | Millimeter distance feed paper at the end |
| [data.dotsFeedPaper] | <code>number</code> | Distance feed paper at the end |
| data.text | <code>string</code> | Formatted text to be printed |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="printFormattedTextAndCut"></a>

### printFormattedTextAndCut(data, successCallback, errorCallback)
Print a formatted text, feed paper and cut the paper

**See**: https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| [data.mmFeedPaper] | <code>number</code> | Millimeter distance feed paper at the end |
| [data.dotsFeedPaper] | <code>number</code> | Distance feed paper at the end |
| data.text | <code>string</code> | Formatted text to be printed |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="getEncoding"></a>

### getEncoding(data, successCallback, errorCallback)
Get the printer encoding when available

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="disconnectPrinter"></a>

### disconnectPrinter(data, successCallback, errorCallback)
Close the connection with the printer

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="requestPermissions"></a>

### requestPermissions(data, successCallback, errorCallback)
Request permissions for USB printers

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |

<a name="bitmapToHexadecimalString"></a>

### bitmapToHexadecimalString(data, successCallback, errorCallback)
Convert Drawable instance to a hexadecimal string of the image data

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> \| <code>&quot;tcp&quot;</code> \| <code>&quot;usb&quot;</code> | List all bluetooth or usb printers |
| [data.id] | <code>string</code> \| <code>number</code> | ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId) |
| [data.address] | <code>string</code> | If type is "tcp" then the IP Address of the printer |
| [data.port] | <code>number</code> | If type is "tcp" then the Port of the printer |
| data.base64 | <code>string</code> | Base64 encoded picture string to convert |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |
