/* eslint-disable @typescript-eslint/no-unused-vars */

import {NumberSchema, NumberSchemaConstructor, Ref, StringSchema, StringSchemaConstructor} from 'yup';

declare module 'yup' {
  interface NumberSchema {
    callbackWithRef(ref: any, cb: (thisValue: number, refValue: any) => boolean, message: string): NumberSchema;
  }
  interface StringSchema {
    equalTo(ref: Ref, message?: string): StringSchema;
    notEqualTo(ref: Ref, message?: string): StringSchema;
  }
}

export const number: NumberSchemaConstructor;
export const string: StringSchemaConstructor;
