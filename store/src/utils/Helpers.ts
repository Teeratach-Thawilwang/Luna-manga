import { OrderByEnum } from "@enums/OrderByEnum";

export function randomArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomEnum<T>(enums: any): T {
  const rand = Math.floor(Math.random() * Object.keys(enums).length);
  return enums[Object.keys(enums)[rand]];
}

export function transfromDateString(dateString: string) {
  return new Date(String(dateString)).toLocaleDateString(import.meta.env.VITE_TIME_ZONE, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function transfromDateTimeString(dateString: string) {
  return new Date(String(dateString)).toLocaleDateString(import.meta.env.VITE_TIME_ZONE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function transformNumber(numb: number) {
  if (numb >= 1000000) {
    const roundedNum = Math.round(numb / 100000) / 10;
    return `${roundedNum}M`;
  } else if (numb >= 1000) {
    const roundedNum = Math.round(numb / 100) / 10;
    return `${roundedNum}K`;
  } else {
    return numb.toString();
  }
}

export function transformStatus(status: string): string {
  switch (status) {
    case "ongoing":
      return "Ongoing";
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "finished":
      return "Finished";
    default:
      return "";
  }
}

export function transformFirstCapital(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function transformEnumToWord(text: string): string {
  const texts = text.split("_");
  const capitalText = texts.map((item) => transformFirstCapital(item));
  return capitalText.join(" ");
}

export function transformBgColorStatus(status: string): string {
  switch (status) {
    case "ongoing":
      return "#3BA639";
    case "active":
      return "#3BA639";
    case "inactive":
      return "#ADADAD";
    case "finished":
      return "#EAB308";
    default:
      return "#000000";
  }
}

function sortByString(array: any[], key: string, orderBy: OrderByEnum) {
  return array.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (orderBy === OrderByEnum.ASC) {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}

function sortByNumber(array: any[], key: string, orderBy: OrderByEnum) {
  return array.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (orderBy === OrderByEnum.ASC) {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

export function sortBy(objectArray: any[], key: string, orderBy: OrderByEnum) {
  if (typeof objectArray[0][key] === "string") {
    return sortByString(objectArray, key, orderBy);
  } else if (typeof objectArray[0][key] === "number") {
    return sortByNumber(objectArray, key, orderBy);
  } else {
    return objectArray;
  }
}

export function navigateTo(url: string, isReload: boolean = false) {
  window.history.pushState({}, "", url);
  window.dispatchEvent(new Event("popstate"));

  if (isReload) {
    window.location.reload();
  }
}

export function navigateToLoginBackoffice() {
  navigateTo("/backoffice/login");
}

export function reloadPage() {
  window.location.reload();
}

export function toFormData(params: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      formData.append(key, value);
    }
  }
  return formData;
}

export function loadFont(fontUrl: string) {
  if (!document.querySelector(`link[href="${fontUrl}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }
}

export function loadFontForNovel() {
  loadFont("https://fonts.googleapis.com/css2?family=Srisakdi:wght@400;700&display=swap");
  loadFont("https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap");
  loadFont("https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap");
  loadFont("https://fonts.googleapis.com/css2?family=Thasadith:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  loadFont(
    "https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
  );
  loadFont(
    "https://fonts.googleapis.com/css2?family=Fahkwang:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
  );
  loadFont(
    "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
  );
  loadFont(
    "https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
  );
}
