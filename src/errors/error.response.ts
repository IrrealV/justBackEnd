import { Response } from "express";

export class Error {
  static response(status: number, title: string, message: string) {
    return {
      title: title,
      status: status,
      message: message,
    };
  }
}
