import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { NavigateFunction } from 'react-router-dom';
import { useAuthToken } from "../services/useAuthToken";

// CueTrans Common Functions - React equivalent of ExtJS cuetrans_common_fn
export class CuetransCommonFn {
  private static instance: CuetransCommonFn;
  private baseUrl = '/JMSServlet'; // Configure your API base URL
  static getInstance(): CuetransCommonFn {
    if (!CuetransCommonFn.instance) {
      CuetransCommonFn.instance = new CuetransCommonFn();
    }
    return CuetransCommonFn.instance;
  }

  // Add a setter (optional)
  static setAuthToken(token: string) {
    sessionStorage.setItem('hdnAuthToken', token);
  }

  static getAuthToken(): string | null {
    return sessionStorage.getItem('hdnAuthToken');
  }

  // Generic service call method - matches ExtJS pattern
async callService(serviceName: string, methodName: string, params: any): Promise<any> {
  console.log(`Calling ${serviceName}.${methodName} with params:`, params);
  try {
    // 🔵 Show loading popup
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const payload = {
      methodName: methodName,
      ...params,
    };

    const token = CuetransCommonFn.getAuthToken() || '';
    const requestData = new URLSearchParams();
    requestData.append('workFlowName', serviceName);
    requestData.append('processType', 'Screen');
    requestData.append('workFlowParams', JSON.stringify(payload));
    requestData.append('AuthToken', token);

    const res = await fetch('/JMSServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: requestData,
      credentials: 'include',
    });

    const text = await res.text();

    let in_json_data;
    try {
      in_json_data = JSON.parse(text);
    } catch (err) {
      throw new Error('Invalid JSON returned from server.');
    }

    if (!this.checkError(text)) {
      return null;
    }

    if (in_json_data.hdrcache) {
      in_json_data.hdrcache.forEach((hdrcache_obj: { [x: string]: any }) => {
        for (const key in hdrcache_obj) {
          const value = hdrcache_obj[key];
          if (key === 'hdnAuthToken') {
            CuetransCommonFn.setAuthToken(value);
          }
        }
      });
    }

    // ✅ Close Swal on success
    Swal.close();
    return in_json_data;

  } catch (error) {
    // 🔴 Close Swal before showing error
    Swal.close();
    
    console.error(`Error calling ${serviceName}.${methodName}:`, error);

    // Optionally show error alert
    Swal.fire({
      icon: 'error',
      title: 'Service Error',
      text: (error as Error).message || 'Something went wrong.',
    });

    throw error;
  }
}



  private checkError(tmp_json_data: string): boolean {
    const in_json_data = JSON.parse(tmp_json_data);

    // Session Error
    if (in_json_data["strSessionError"]) {
      const errorMsg =
        in_json_data.strSessionError === "Authentication Failed"
          ? "Authentication failed. Please login again."
          : "Session timeout. Please login again.";

      Swal.fire({
        title: 'Failure',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.href = '/login'; // redirect to login
      });

      return false;
    }

    // Auth Failure
    if (in_json_data.strAuthFailed) {
      Swal.fire({
        title: 'Failure',
        text: 'Authentication failed. Please login again.',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        fetch('/JMSServlet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            workFlowName: 'Logout',
            workFlowParams: '',
          }),
        }).finally(() => {
          window.location.href = '/login'; // redirect to login
        });
      });

      return false;
    }

    // Failure Message
    if (in_json_data.strFailureMsg) {
      Swal.fire({
        title: 'Failure',
        text: in_json_data.strFailureMsg,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    // Response Message
    if (in_json_data.strResponseMsg) {
      Swal.fire({
        title: 'Failure',
        text: in_json_data.strResponseMsg,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    return true;
  }
  // Utility methods that match ExtJS common functions
  showMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can integrate with your preferred notification system here
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  formatDateTime(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString();
  }

  validateRequired(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
}

// Export singleton instance - matches ExtJS pattern
export const cuetrans_common_fn = CuetransCommonFn.getInstance();