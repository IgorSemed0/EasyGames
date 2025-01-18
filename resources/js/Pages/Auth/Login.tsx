import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"
export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="login" value="Email or Username" />

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        value={data.login}
                        className="mt-1 block w-full font-['SF_Pro'] py-2 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('login', e.target.value)}
                    />

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full font-['SF_Pro'] py-2 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <div>
                         <button
                             type="button"
                             // onClick={() => handleSocialLogin('google')}
                             className="flex items-center justify-center py-2 px-10 bg-gray-50 hover:bg-gray-200 focus:ring-gray-500 text-black rounded-2xl"
                         >
                             <FcGoogle size={20} /> Login com Google
                         </button>
             
                         <button
                             type="button"
                             // onClick={() => handleSocialLogin('facebook')}
                             className="flex items-center justify-center py-2 px-10 bg-gray-50 hover:bg-gray-200 focus:ring-gray-500 text-black rounded-2xl"
                         >
                             <FaFacebookF size={20} className="text-blue-500" /> Login com Facebook
                         </button>
                     </div>
                     
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
