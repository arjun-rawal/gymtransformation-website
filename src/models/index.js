// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Days } = initSchema(schema);

export {
  Days
};