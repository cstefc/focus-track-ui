import {TextField} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

export interface ZodTextFieldProps<T extends FieldValues> {
    translation_scope: string;
    item: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError;
    minRows?: number;
}

export function ZodTextField<T extends FieldValues>({
                                                        minRows,
                                                        translation_scope,
                                                        item,
                                                        register,
                                                        errors
                                                    }: ZodTextFieldProps<T>) {
    const {t} = useTranslation(translation_scope);
    return (
        <TextField
            onClick={(e) => {
                e.stopPropagation()
            }}
            onKeyDown={(e) => {
                e.stopPropagation()
            }}
            margin="dense"
            label={t(`forms.${item as string}Label`)}
            placeholder={t(`forms.${item as string}Placeholder`)}
            {...register(item)}
            error={!!errors}
            helperText={errors?.message}
            multiline={Boolean(minRows)}
            minRows={minRows || 1}
            maxRows={minRows? minRows + 2 : 1}
            fullWidth
        />
    );
}
