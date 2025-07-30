import React, { HTMLAttributes } from "react";

export interface ButtonHeaderProps {
    className: HTMLAttributes<HTMLElement>['className'],
    isLogged: Boolean,
    icon?: React.ReactNode,
    value: String
}