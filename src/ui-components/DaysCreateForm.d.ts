/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DaysCreateFormInputValues = {
    properties?: string;
    index?: number;
};
export declare type DaysCreateFormValidationValues = {
    properties?: ValidationFunction<string>;
    index?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DaysCreateFormOverridesProps = {
    DaysCreateFormGrid?: FormProps<GridProps>;
    properties?: FormProps<TextAreaFieldProps>;
    index?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DaysCreateFormProps = React.PropsWithChildren<{
    overrides?: DaysCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DaysCreateFormInputValues) => DaysCreateFormInputValues;
    onSuccess?: (fields: DaysCreateFormInputValues) => void;
    onError?: (fields: DaysCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: DaysCreateFormInputValues) => DaysCreateFormInputValues;
    onValidate?: DaysCreateFormValidationValues;
} & React.CSSProperties>;
export default function DaysCreateForm(props: DaysCreateFormProps): React.ReactElement;
