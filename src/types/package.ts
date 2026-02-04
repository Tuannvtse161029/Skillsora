import { IPageRequest } from "../interfaces/general";

export type LearningPackageDto = {
    id: string;
    name?: string;
    description?: string;
    features?: string;
    price?: number;
    discountPrice?: number;
    discountPercent?: number;
    finalPrice?: number;
    durationDay?: number;
    createdBy?: string;
    createdOn?: Date;
    updatedBy?: string;
    updatedOn?: Date;
};

export type GetPagedPackageRequest = IPageRequest & {

}

export type CreatePackageRequest = {
    name?: string;
    description?: string;
    features?: string;
    price: number;
    discountPrice?: number;
    discountPercent?: number;
    durationDay?: number;
};

export type UpdatePackageRequest = {
    name: string;
    description?: string;
    features?: string;
    price: number;
    discountPrice?: number;
    discountPercent?: number;
    durationDay?: number;
};
