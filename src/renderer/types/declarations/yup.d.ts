import {Ref, NumberSchema, NumberSchemaConstructor, StringSchema, StringSchemaConstructor} from 'yup';

declare module 'yup' {
  interface NumberSchema {
    callbackWithRef(ref: any, cb: (thisValue: number, refValue: any) => boolean, message: string): NumberSchema;
    equalTo(ref: Ref, message?: string): NumberSchema;
    notEqualTo(ref: Ref, message?: string): NumberSchema;
  }
  interface StringSchema {
    callbackWithRef(ref: any, cb: (thisValue: string, refValue: any) => boolean, message: string): StringSchema;
    equalTo(ref: Ref, message?: string): StringSchema;
    notEqualTo(ref: Ref, message?: string): StringSchema;
  }
}

export const number: NumberSchemaConstructor;
export const string: StringSchemaConstructor;
