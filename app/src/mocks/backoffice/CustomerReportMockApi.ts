import { faker } from "@faker-js/faker";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CustomerReportGroupEnum } from "@enums/backoffice/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/backoffice/CustomerReportSourceEnum";
import {
  ChapterDetailReportInterface,
  CommentDetailReportInterface,
  CustomerReportListInterface,
  GetCustomerReportListParams,
  GetCustomerReportListResponse,
  GetCustomerReportParams,
  GetCustomerReportResponse,
  PostDetailReportInterface,
  StoryDetailReportInterface,
  UpdateCustomerReportParams,
  UpdateCustomerReportResponse,
} from "@interfaces/backoffice/CustomerReportInterface";
import { randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class CustomerReportMockApi {
  public index(params: GetCustomerReportListParams, shouldSuccess: boolean = true): ReturnType<GetCustomerReportListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: GetCustomerReportListResponse = indexResponse(params);
      returnPromise<GetCustomerReportListResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetCustomerReportParams, shouldSuccess: boolean = true): ReturnType<GetCustomerReportResponse> {
    return new Promise((resolve, reject) => {
      const response: GetCustomerReportResponse = showResponse(params);
      returnPromise<GetCustomerReportResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateCustomerReportParams, shouldSuccess: boolean = true): ReturnType<UpdateCustomerReportResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateCustomerReportResponse = updateResponse(params);
      returnPromise<UpdateCustomerReportResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetCustomerReportListParams): GetCustomerReportListResponse {
  const page = params.page;
  const data: CustomerReportListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createCustomerReportIndex(i, params.group ?? null, params.source ?? null, params.is_accept ?? null);
    data.push(chapter);
  }

  return {
    data: data,
    current: page,
    next: page + 1,
    previous: page - 1 > 0 ? page - 1 : null,
    last: null,
    total: null,
  };
}

function createCustomerReportIndex(
  i: number,
  group: CustomerReportGroupEnum | null,
  source: CustomerReportSourceEnum | null,
  isAccept: boolean | null,
): CustomerReportListInterface {
  return {
    id: i,
    group: group ?? randomEnum<CustomerReportGroupEnum>(CustomerReportGroupEnum),
    source: source ?? randomEnum<CustomerReportSourceEnum>(CustomerReportSourceEnum),
    customer_id: faker.number.int({ min: 1, max: 100 }),
    is_accept: isAccept ?? randomEnum<boolean>([true, false]),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showResponse(params: GetCustomerReportParams): GetCustomerReportResponse {
  const source = randomEnum<CustomerReportSourceEnum>(CustomerReportSourceEnum);
  return {
    id: params.id,
    group: randomEnum<CustomerReportGroupEnum>(CustomerReportGroupEnum),
    source: source,
    data: createCustomerReportData(source),
    message: faker.word.words({ count: { min: 2, max: 10 } }),
    reporter: createReporter(),
    is_accept: randomEnum<boolean>([true, false]),
    accept_by: "Admin",
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function updateResponse(params: UpdateCustomerReportParams): UpdateCustomerReportResponse {
  const source = randomEnum<CustomerReportSourceEnum>(CustomerReportSourceEnum);
  return {
    id: params.id,
    group: randomEnum<CustomerReportGroupEnum>(CustomerReportGroupEnum),
    source: source,
    data: createCustomerReportData(source),
    message: faker.word.words({ count: { min: 2, max: 10 } }),
    reporter: createReporter(),
    is_accept: params.is_accept,
    accept_by: "Admin",
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createReporter() {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    email: faker.internet.email(),
    nick_name: faker.person.middleName(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createCustomerReportData(source: CustomerReportSourceEnum) {
  switch (source) {
    case CustomerReportSourceEnum.STORY:
      return createReportSourceStory();
    case CustomerReportSourceEnum.CHAPTER:
      return createReportSourceChapter();
    case CustomerReportSourceEnum.POST:
      return createReportSourcePost();
    case CustomerReportSourceEnum.COMMENT:
      return createReportSourceComment();
  }
}

function createReportSourceStory(): StoryDetailReportInterface {
  const name = faker.word.words({ count: { min: 2, max: 5 } });
  const slug = name.replaceAll(" ", "-");
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    slug: slug,
    name: name,
    type: randomEnum<CategoryTypeEnum>(CategoryTypeEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createReportSourceChapter(): ChapterDetailReportInterface {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    name: faker.word.words({ count: { min: 2, max: 5 } }),
    chapter_number: faker.number.int({ min: 1, max: 1000 }),
    story: createReportSourceStory(),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createReportSourcePost(): PostDetailReportInterface {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    commenter: createReporter(),
    message: faker.word.words({ count: { min: 2, max: 20 } }),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createReportSourceComment(): CommentDetailReportInterface {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    chapter: createReportSourceChapter(),
    commenter: createReporter(),
    message: faker.word.words({ count: { min: 2, max: 20 } }),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

export default new CustomerReportMockApi();
