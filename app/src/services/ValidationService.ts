import { FileSizeEnum } from "@enums/FileSizeEnum";
import { ValidateReturnInterface } from "@interfaces/ValidatationReturnInterface";

class ValidationService {
  public validatePassword(password: string): ValidateReturnInterface {
    if (password.length < 8) {
      return { isSuccess: false, errorMessage: "รหัสผ่านต้องมีตัวอักษรตั้งแต่ 8 ตัวขึ้นไป" };
    }

    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexDigit = /\d/;
    if (!regexLowercase.test(password) || !regexUppercase.test(password) || !regexDigit.test(password)) {
      return { isSuccess: false, errorMessage: "รหัสผ่านต้องมีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข" };
    }

    return { isSuccess: true, errorMessage: "" };
  }

  public validatePasswordAndConfirmPassword(password: string, confirmPassword: string): ValidateReturnInterface {
    if (password != confirmPassword) {
      return { isSuccess: false, errorMessage: "รหัสผ่านและยืนยันรหัสผ่าน ต้องเป็นรหัสผ่านเดียวกัน" };
    }

    if (password == null || password.length < 8) {
      return { isSuccess: false, errorMessage: "รหัสผ่านต้องมีตัวอักษรตั้งแต่ 8 ตัวขึ้นไป" };
    }

    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexDigit = /\d/;
    if (!regexLowercase.test(password) || !regexUppercase.test(password) || !regexDigit.test(password)) {
      return { isSuccess: false, errorMessage: "รหัสผ่านต้องมีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข" };
    }

    return { isSuccess: true, errorMessage: "" };
  }

  public validateEmail(email: string): ValidateReturnInterface {
    if (email.length == 0) {
      return { isSuccess: false, errorMessage: "โปรดระบุอีเมล" };
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(email)) {
      return { isSuccess: false, errorMessage: "อีเมลมีรูปแบบไม่ถูกต้อง" };
    }

    return { isSuccess: true, errorMessage: "" };
  }

  public validateName(name: string, leftText: string = ""): ValidateReturnInterface {
    if (name.length < 2) {
      return { isSuccess: false, errorMessage: leftText + "ต้องมีตัวอักษรอย่างน้อย 2 ตัวอักษร" };
    }

    const regexName = /^[a-zA-Zก-๏เ-ใ]+$/;
    if (!regexName.test(name)) {
      return { isSuccess: false, errorMessage: leftText + "ตัวอักษรภาษาไทยหรืออังกฤษเท่านั้น" };
    }

    return { isSuccess: true, errorMessage: "" };
  }

  public validateFileSize(file: File, sizeMB: number = 2): boolean {
    if (file.size > FileSizeEnum.SIZE_1_MB * sizeMB) {
      return false;
    }
    return true;
  }

  public validateFileType(file: File, typeArray: string[]): boolean {
    const isValidType = typeArray.some((type) => file.type == type);
    if (!isValidType) {
      return false;
    }
    return true;
  }

  public validateURL(url: string): ValidateReturnInterface {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i", // fragment locator
    );

    if (!pattern.test(url)) {
      return { isSuccess: false, errorMessage: "Url Pattern ไม่ถูกต้อง" };
    }

    return { isSuccess: true, errorMessage: "" };
  }
}

export default new ValidationService();
