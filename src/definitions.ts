export interface Printer {
    // Bluetooth
    address?: string;
    bondState?: number;
    name?: string;
    type?: number;
    features?: string[];

    // USB
    productName?: string;
    manufacturerName?: string;
    deviceId?: number;
    serialNumber?: string;
    vendorId?: number;
}

export interface PrinterToUse {
    type: 'bluetooth' | 'tcp' | 'usb';
    id: string | number;
    address?: string;
    port?: number;
    mmFeedPaper?: number;
    dotsFeedPaper?: number;
    printerDpi?: number;
    printerWidthMM?: number;
    printerNbrCharactersPerLine?: number;
    charsetEncoding?: {
        charsetName: string,
        charsetId: number
    };
}

export interface PrintFormattedText extends PrinterToUse {
    text: string;
}

export interface BitmapToHexadecimalString extends PrinterToUse {
    base64: string;
}

export interface RequestPermissionsResult {
    granted: boolean;
    BLUETOOTH?: boolean;
    BLUETOOTH_ADMIN?: boolean;
    BLUETOOTH_CONNECT?: boolean;
    BLUETOOTH_SCAN?: boolean;
}

export interface GetEncodingResult {
    name: string;
    command?: string[];
}

export interface ErrorResult {
    error?: string;
}

export interface ThermalPrinterPlugin {
  /**
   * List available printers
   *
   * @param {Object} data - Data object
   * @param {"bluetooth"|"usb"} data.type - Type of list: bluetooth or usb
   * @param {function} success
   * @param {function} error
   */
  listPrinters(data: { type: 'bluetooth' | 'usb'; }, success: (value: Printer[]) => any, error: (value: ErrorResult) => void): void;

  /**
   * Print a formatted text and feed paper
   * @see https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {number} [data.mmFeedPaper] - Millimeter distance feed paper at the end
   * @param {number} [data.dotsFeedPaper] - Distance feed paper at the end
   * @param {string} data.text - Formatted text to be printed
   * @param {function} success
   * @param {function} error
   */
  printFormattedText(data: PrintFormattedText, success: () => void, error: (value: ErrorResult) => void): void;

  /**
   * Print a formatted text, feed paper and cut the paper
   * @see https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {number} [data.mmFeedPaper] - Millimeter distance feed paper at the end
   * @param {number} [data.dotsFeedPaper] - Distance feed paper at the end
   * @param {string} data.text - Formatted text to be printed
   * @param {function} success
   * @param {function} error
   */
  printFormattedTextAndCut(data: PrintFormattedText, success: () => void, error: (value: ErrorResult) => void): void;

  /**
   * Get the printer encoding when available
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {function} success
   * @param {function} error
   */
  getEncoding(data: PrinterToUse, success: (value: GetEncodingResult) => any, error: (value: ErrorResult) => void): void;

  /**
   * Close the connection with the printer
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {function} success
   * @param {function} error
   */
  disconnectPrinter(data: PrinterToUse, success: () => void, error: (value: ErrorResult) => void): void;

  /**
   * Request permissions for USB printers
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {function} success
   * @param {function} error
   */
  requestPermissions(data: PrinterToUse, success: (value: RequestPermissionsResult) => any, error: (value: ErrorResult) => void): void;

   /**
   * Request permissions for Bluetooth
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"} data.type - List all bluetooth printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {function} success
   * @param {function} error
   */
  requestBTPermissions(data: PrinterToUse, success: (value: RequestPermissionsResult) => any, error: (value: ErrorResult) => void): void;

  /**
   * Convert Drawable instance to a hexadecimal string of the image data
   * Note: Supports only 255px height 
   * 
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {string} data.base64 - Base64 encoded picture string to convert
   * @param {function} success
   * @param {function} error
   */
  bitmapToHexadecimalString(data: BitmapToHexadecimalString, success: (value: string) => any, error: (value: ErrorResult) => void): void;
}
