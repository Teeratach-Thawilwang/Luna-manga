import { toast } from "react-toastify";

import { CustomerReportGroupEnum } from "@enums/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/CustomerReportSourceEnum";
import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CustomerReportParams } from "@interfaces/CustomerReportInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import CustomerReportApi from "@repositories/CustomerReportApi";
import AuthService from "@services/AuthService";

class CustomerReportService {
  public report(modelId: number, group: CustomerReportGroupEnum, source: CustomerReportSourceEnum, customerId: number, message?: string) {
    const params: CustomerReportParams = {
      model_id: modelId,
      group: group,
      source: source,
      customer_id: customerId,
    };

    if (message != undefined && message.length != 0) {
      params["message"] = message;
    }

    CustomerReportApi.report(params)
      .then((_response) => {
        toast.success("ส่งรายงานสำเร็จ");
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.report(modelId, group, source, customerId, message);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new CustomerReportService();
