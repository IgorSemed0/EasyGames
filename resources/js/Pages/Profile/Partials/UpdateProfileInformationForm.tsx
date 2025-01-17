import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';


export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            vc_name: user.vc_name,
            vc_username: user.vc_username,
            email: user.email,
            vc_gender: user.vc_gender,
            dt_birthday: user.dt_birthday,
            vc_hometown: user.vc_hometown,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="vc_name" value="Name" />
                    <TextInput
                        id="vc_name"
                        className="mt-1 block w-full"
                        value={data.vc_name}
                        onChange={(e) => setData('vc_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.vc_name} />
                </div>

                <div>
                    <InputLabel htmlFor="vc_username" value="Username" />
                    <TextInput
                        id="vc_username"
                        className="mt-1 block w-full"
                        value={data.vc_username}
                        onChange={(e) => setData('vc_username', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.vc_username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="vc_gender" value="Gender" />
                    <select
                        id="vc_gender"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                        value={data.vc_gender}
                        onChange={(e) => setData('vc_gender', e.target.value)}
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <InputError className="mt-2" message={errors.vc_gender} />
                </div>

                <div>
                    <InputLabel htmlFor="dt_birthday" value="Birthday" />
                    <TextInput
                        id="dt_birthday"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.dt_birthday}
                        onChange={(e) => setData('dt_birthday', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.dt_birthday} />
                </div>

                <div>
                    <InputLabel htmlFor="vc_hometown" value="Hometown" />
                    <TextInput
                        id="vc_hometown"
                        className="mt-1 block w-full"
                        value={data.vc_hometown}
                        onChange={(e) => setData('vc_hometown', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.vc_hometown} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}