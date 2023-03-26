/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Days } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DaysUpdateFormInputValues = {
    properties?: string;
    index?: number;
};
export declare type DaysUpdateFormValidationValues = {
    properties?: ValidationFunction<string>;
    index?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DaysUpdateFormOverridesProps = {
    DaysUpdateFormGrid?: FormProps<GridProps>;
    properties?: FormProps<TextAreaFieldProps>;
    index?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DaysUpdateFormProps = React.PropsWithChildren<{
    overrides?: DaysUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    days?: Days;
    onSubmit?: (fields: DaysUpdateFormInputValues) => DaysUpdateFormInputValues;
    onSuccess?: (fields: DaysUpdateFormInputValues) => void;
    onError?: (fields: DaysUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: DaysUpdateFormInputValues) => DaysUpdateFormInputValues;
    onValidate?: DaysUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DaysUpdateForm(props: DaysUpdateFormProps): React.ReactElement;
