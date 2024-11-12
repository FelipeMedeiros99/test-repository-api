export type UserSignupType = {
    email: string;
    password: string;
    passwordConfirmation?: string
}

export type UserDataTokenType = {
    id: number;
    email: string;
    password?: string
}