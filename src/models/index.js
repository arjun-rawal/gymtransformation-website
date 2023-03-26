// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Test, Days } = initSchema(schema);

export {
  Test,
  Days
};