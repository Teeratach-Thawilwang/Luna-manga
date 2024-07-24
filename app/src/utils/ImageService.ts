import { faker } from "@faker-js/faker";

import { Area } from "react-easy-crop";

export async function cropImage(imageUrl: string, croppedAreaPixels: Area, type: string): Promise<Blob> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageUrl;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob."));
        }
      }, type);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}

export function createFileObjectFromBlob(blob: Blob, fileName: string): File {
  let name = `${faker.string.uuid()}.png`;
  if (fileName != undefined && fileName == null) {
    name = fileName;
  }
  return new File([blob], name, { type: blob.type });
}
