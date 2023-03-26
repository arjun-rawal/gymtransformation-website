/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TestCreateFormInputValues = {
    index?: number;
    properties?: string;
};
export declare type TestCreateFormValidationValues = {
    index?: ValidationFunction<number>;
    properties?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestCreateFormOverridesProps = {
    TestCreateFormGrid?: FormProps<GridProps>;
    index?: FormProps<TextFieldProps>;
    properties?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TestCreateFormProps = React.PropsWithChildren<{
    overrides?: TestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestCreateFormInputValues) => TestCreateFormInputValues;
    onSuccess?: (fields: TestCreateFormInputValues) => void;
    onError?: (fields: TestCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: TestCreateFormInputValues) => TestCreateFormInputValues;
    onValidate?: TestCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestCreateForm(props: TestCreateFormProps): React.ReactElement;
