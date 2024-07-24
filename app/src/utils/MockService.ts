import { ResponseErrorInterface } from "@interfaces/ResponseErrorInterface";

type ReturnType<T> = Promise<T>;
type ResolveType<T> = (value: Promise<T>) => void;

export function returnPromise<ResponseType>(
  response: ResponseType,
  shouldSuccess: boolean = true,
  resolve: ResolveType<ResponseType>,
  reject: (reason?: any) => void,
  rejectObject: ResponseErrorInterface = {
    error: "Expect failed.",
    message: "Failed",
    messages: [{ field1: "error detail." }, { field2: "error detail." }],
  },
) {
  setTimeout(
    () => {
      if (shouldSuccess) {
        resolve(response as ReturnType<ResponseType>);
      }

      reject({ data: rejectObject });
    },
    import.meta.env.VITE_MOCK_API_RESPONSE_TIME,
  );
}
