export type CheckOutRequest = {
    successReturnUrl: string;
    canceledReturnUrl: string;
    packageId: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
    isCreateInvoice: boolean;
}

export type CheckOutInfo = {
    checkOutUrl?: string;
    qrCode?: string
}

export type UpdatePaymentOrderRequest = {
    code: string;
    id: string;
    status: string;
    cancel: boolean;
    orderCode: string;
};
