import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Test, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly properties?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Test, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly properties?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Test = LazyLoading extends LazyLoadingDisabled ? EagerTest : LazyTest

export declare const Test: (new (init: ModelInit<Test>) => Test) & {
  copyOf(source: Test, mutator: (draft: MutableModel<Test>) => MutableModel<Test> | void): Test;
}

type EagerDays = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Days, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly properties?: string | null;
  readonly index?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDays = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Days, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly properties?: string | null;
  readonly index?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Days = LazyLoading extends LazyLoadingDisabled ? EagerDays : LazyDays

export declare const Days: (new (init: ModelInit<Days>) => Days) & {
  copyOf(source: Days, mutator: (draft: MutableModel<Days>) => MutableModel<Days> | void): Days;
}