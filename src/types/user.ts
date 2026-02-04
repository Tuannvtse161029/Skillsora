export type User = {
    id: string;
    email: string;
    fullName: string;
    gender: string;
    birthdate: string | null;
    emailConfirm: boolean;
    phoneNumber: string | null;
    phoneConfirm: boolean;
    avatarUrl: string;
    createdBy: string;
    createdOn: string;
    updatedBy: string | null;
    updatedOn: string | null;
    roleName: string | null;
}