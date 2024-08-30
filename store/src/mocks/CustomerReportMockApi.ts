import { CustomerReportParams, CustomerReportResponse } from "@interfaces/CustomerReportInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CustomerReportMockApi {
  public report(_params: CustomerReportParams, shouldSuccess: boolean = true): ReturnType<CustomerReportResponse> {
    return new Promise((resolve, reject) => {
      const response: CustomerReportResponse = {};
      returnPromise<CustomerReportResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

export default new CustomerReportMockApi();
