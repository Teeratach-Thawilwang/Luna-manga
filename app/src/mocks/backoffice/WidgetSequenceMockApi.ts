import { faker } from "@faker-js/faker";

import { WidgetStatusEnum } from "@enums/backoffice/StatusEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import {
  GetWidgetSequenceParams,
  GetWidgetSequenceResponse,
  UpdateWidgetSequenceParams,
  UpdateWidgetSequenceResponse,
  WidgetSequenceInterface,
} from "@interfaces/backoffice/WidgetInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class WidgetSequenceMockApi {
  public index(_params: GetWidgetSequenceParams, shouldSuccess: boolean = true): ReturnType<GetWidgetSequenceResponse> {
    return new Promise((resolve, reject) => {
      const response: GetWidgetSequenceResponse = createIndex<GetWidgetSequenceResponse>();
      returnPromise<GetWidgetSequenceResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(_params: UpdateWidgetSequenceParams, shouldSuccess: boolean = true): ReturnType<UpdateWidgetSequenceResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateWidgetSequenceResponse = createIndex<UpdateWidgetSequenceResponse>();
      returnPromise<UpdateWidgetSequenceResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function createIndex<R>(): R {
  const data: WidgetSequenceInterface[] = [];

  for (let i = 1; i <= 10; i++) {
    const chapter = createWidget(i);
    data.push(chapter);
  }

  return {
    data: data,
  } as R;
}

function createWidget(i: number): WidgetSequenceInterface {
  let name = faker.word.words({ count: { min: 1, max: 5 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    sequence: i,
    name: name,
    total_banner: faker.number.int({ min: 2, max: 10 }),
    type: randomEnum<WidgetTypeEnum>(WidgetTypeEnum),
    status: randomEnum<WidgetStatusEnum>(WidgetStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new WidgetSequenceMockApi();
