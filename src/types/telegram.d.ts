declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
          chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
          };
          start_param?: string;
          auth_date: number;
          hash: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        isClosingConfirmationEnabled: boolean;
        headerColor: string;
        backgroundColor: string;
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
          setParams(params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }): void;
        };
        HapticFeedback: {
          impactOccurred(
            style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft',
          ): void;
          notificationOccurred(type: 'error' | 'success' | 'warning'): void;
          selectionChanged(): void;
        };
        expand(): void;
        close(): void;
        ready(): void;
        sendData(data: string): void;
        switchInlineQuery(query: string, choose_chat_types?: string[]): void;
        openLink(url: string, options?: { try_instant_view?: boolean }): void;
        openTelegramLink(url: string): void;
        openInvoice(url: string, callback?: (status: string) => void): void;
        showPopup(
          params: {
            title?: string;
            message: string;
            buttons?: Array<{
              id?: string;
              type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
              text: string;
            }>;
          },
          callback?: (buttonId: string) => void,
        ): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(
          message: string,
          callback?: (confirmed: boolean) => void,
        ): void;
        showScanQrPopup(
          params: {
            text?: string;
          },
          callback?: (text: string) => boolean,
        ): void;
        closeScanQrPopup(): void;
        readTextFromClipboard(callback?: (text: string) => void): void;
        requestWriteAccess(callback?: (granted: boolean) => void): void;
        requestContact(
          callback?: (
            granted: boolean,
            contact?: {
              contact: {
                phone_number: string;
                first_name: string;
                last_name?: string;
                user_id?: number;
              };
            },
          ) => void,
        ): void;
        invokeCustomMethod(
          method: string,
          params: any,
          callback?: (error: string, result: any) => void,
        ): void;
      };
    };
  }
}

export {};
