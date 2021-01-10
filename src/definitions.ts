declare module '@capacitor/core' {
  interface PluginRegistry {
    ThermalPrinter: ThermalPrinter;
  }
}

export interface ThermalPrinter {
  /**
   * List available printers
   *
   * @param {Object} data - Data object
   * @param {"bluetooth"|"usb"} data.type - Type of list: bluetooth or usb
   */
  listPrinters(data: { type: 'bluetooth' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<{
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
  }>;

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
   */
  printFormattedText(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<void>;

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
   */
  printFormattedTextAndCut(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<void>;

  /**
   * Get the printer encoding when available
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   */
  getEncoding(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<{ name: string; command?: string[]; }>;

  /**
   * Close the connection with the printer
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   */
  disconnectPrinter(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<void>;

  /**
   * Request permissions for USB printers
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   */
  requestPermissions(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<{ granted: boolean }>;

  /**
   * Convert Drawable instance to a hexadecimal string of the image data
   *
   * @param {Object[]} data - Data object
   * @param {"bluetooth"|"tcp"|"usb"} data.type - List all bluetooth or usb printers
   * @param {string|number} [data.id] - ID of printer to find (Bluetooth: address, TCP: Use address + port instead, USB: deviceId)
   * @param {string} [data.address] - If type is "tcp" then the IP Address of the printer
   * @param {number} [data.port] - If type is "tcp" then the Port of the printer
   * @param {string} data.base64 - Base64 encoded picture string to convert
   */
  bitmapToHexadecimalString(data: { type: 'bluetooth' | 'tcp' | 'usb'; id: string | number; address?: string; port?: number; }): Promise<string>;
}
