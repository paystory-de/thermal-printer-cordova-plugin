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

```xml
<uses-feature android:name="android.hardware.usb.host" />
<uses-permission android:maxSdkVersion="30" android:name="android.permission.BLUETOOTH" />
<uses-permission android:maxSdkVersion="30" android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
```

Run this for getting Bluetooth access permission if needed

```javascript
ThermalPrinter.requestBTPermissions({type: 'bluetooth'}, function(result){ console.log(result) }, function(error){ console.log(error) });
```

### Examples

#### Notice for TypeScript-Developers

You can easily import and use the ThermalPrinter plugin in your TypeScript-Projects.

```typescript
import { ThermalPrinterPlugin } from 'thermal-printer-cordova-plugin/src';

declare let ThermalPrinter: ThermalPrinterPlugin;
```

And then use the following examples in your code.

#### Print via Bluetooth

Printing via Bluetooth is as easy as possible.

```javascript
ThermalPrinter.printFormattedText({
    type: 'bluetooth',
    id: 'first', // You can also use the identifier directly i. e. 00:11:22:33:44:55 (address) or name
    text: '[C]<u><font size='big'>Hello World</font></u>' // new lines with "\n"
}, function() {
    console.log('Successfully printed!');
}, function(error) {
    console.error('Printing error', error);
});
```

**Notice:** If not working please ensure that you have the printer connected. (Settings -> Bluetooth -> Pairing)
If you have other issues maybe you have not granted the `android.permission.BLUETOOTH` permission.

#### Print via TCP

Printing via TCP is as easy as possible.

```javascript
ThermalPrinter.printFormattedText({
    type: 'tcp',
    address: '192.168.1.123',
    port: 9100,
    id: 'tcp-printer-001', // Use an unique identifier for each printer i. e. address:port or name
    text: '[C]<u><font size='big'>Hello World</font></u>' // new lines with "\n"
}, function() {
    console.log('Successfully printed!');
}, function(error) {
    console.error('Printing error', error);
});
```

**Notice:** If not working please ensure that your device can ping the printer. And the printer must be a POSPrinter!
Also ensure that you're using the correct port. 9100 is default for the thermal printers.

#### Print via USB (incl. listPrinters and requestPermissions)

1. First we get our printer because we don't know the printer's ID.
2. Then we request permissions for printing. This is needed because Android will not allow us to access all devices.
3. And finally we can print with our device.

```javascript
ThermalPrinter.listPrinters({type: 'usb'}, function(printers) {
    if (printers.length > 0) {
        var printer = printers[0];
        ThermalPrinter.requestPermissions(printer, function() {
            // Permission granted - We can print!
            ThermalPrinter.printFormattedText({
                type: 'usb',
                id: printer.id,
                text: '[C]<u><font size='big'>Hello World</font></u>' // new lines with "\n"
            }, function() {
                console.log('Successfully printed!');
            }, function(error) {
                console.error('Printing error', error);
            });
        }, function(error) {
            console.error('Permission denied - We can\'t print!');
        });
    } else {
        console.error('No printers found!');
    }
}, function(error) {
    console.error('Ups, we cant list the printers!', error);
});
```

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
| [data.mmFeedPaper] | <code>number</code><code>optional</code> | Millimeter distance feed paper at the end |
| [data.dotsFeedPaper] | <code>number</code><code>optional</code> | Distance feed paper at the end |
| [data.printerDpi] | <code>number</code><code>optional</code> | Printer DPI |
| [data.printerWidthMM] | <code>number</code><code>optional</code> | Paper Width in mm |
| [data.printerNbrCharactersPerLine] | <code>number</code><code>optional</code> | Number of characters per line |
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
| [data.mmFeedPaper] | <code>number</code><code>optional</code> | Millimeter distance feed paper at the end |
| [data.dotsFeedPaper] | <code>number</code><code>optional</code> | Distance feed paper at the end |
| [data.printerDpi] | <code>number</code><code>optional</code> | Printer DPI |
| [data.printerWidthMM] | <code>number</code><code>optional</code> | Paper Width in mm |
| [data.printerNbrCharactersPerLine] | <code>number</code><code>optional</code> | Number of characters per line |
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


<a name="requestBTPermissions"></a>

### requestBTPermissions(data, successCallback, errorCallback)
Request permissions for bluetooth

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Data object |
| data.type | <code>&quot;bluetooth&quot;</code> | List all bluetooth or usb printers |
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
| [data.mmFeedPaper] | <code>number</code><code>optional</code> | Millimeter distance feed paper at the end |
| [data.dotsFeedPaper] | <code>number</code><code>optional</code> | Distance feed paper at the end |
| [data.printerDpi] | <code>number</code><code>optional</code> | Printer DPI |
| [data.printerWidthMM] | <code>number</code><code>optional</code> | Paper Width in mm |
| data.base64 | <code>string</code> | Base64 encoded picture string to convert |
| successCallback | <code>function</code> | Result on success |
| errorCallback | <code>function</code> | Result on failure |
