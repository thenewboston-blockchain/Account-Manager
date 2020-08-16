import {Ref, StringSchema, StringSchemaConstructor} from 'yup';

declare module 'yup' {
  interface StringSchema {
    equalTo(ref: Ref, message?: string): StringSchema;
    notEqualTo(ref: Ref, message?: string): StringSchema;
  }
}

export const string: StringSchemaConstructor;
