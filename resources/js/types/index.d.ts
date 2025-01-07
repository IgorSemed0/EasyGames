import { Config } from 'ziggy-js';

export interface User {
    id: number;
    vc_name: string;
    vc_username: string;
    email: string;
    vc_gender: 'male' | 'female' | 'other';
    dt_birthday: string | null;
    vc_hometown: string | null;
    vc_profile: string | null;
    vc_role: string;
    it_mamba_coins: number;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
