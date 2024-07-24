import { faker } from "@faker-js/faker";

import { DashboardItemEnum } from "@enums/backoffice/DashboardItemEnum";
import { GetDashboardParams, GetDashboardResponse } from "@interfaces/backoffice/DashboardInterface";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class DashboardMockApi {
  public getDashboard(params: GetDashboardParams, shouldSuccess: boolean = true): ReturnType<GetDashboardResponse> {
    return new Promise((resolve, reject) => {
      const response: GetDashboardResponse = createDashboard(params);
      returnPromise<GetDashboardResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createDashboard(_params: GetDashboardParams): GetDashboardResponse {
  const data = [];
  const dashboardEnumValueArray = Object.values(DashboardItemEnum);
  for (let i = 0; i < dashboardEnumValueArray.length; i++) {
    data.push({
      name: dashboardEnumValueArray[i],
      middle: faker.number.int({ min: 10, max: 100 }).toString(),
      left_bottom: [faker.number.int({ min: 10, max: 100 }).toString()],
      right_bottom: [faker.number.int({ min: 10, max: 100 }).toString()],
    });
  }
  return {
    data: data,
  };
}

export default new DashboardMockApi();
