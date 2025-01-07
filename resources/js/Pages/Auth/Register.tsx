import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    vc_name: '',
    vc_username: '',
    email: '',
    vc_gender: '',
    dt_birthday: '',
    password: '',
    password_confirmation: '',
    vc_hometown: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="vc_name" value="Name" />
          <TextInput
            id="vc_name"
            name="vc_name"
            value={data.vc_name}
            className=" mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('vc_name', e.target.value)}
            required
          />
          <InputError message={errors.vc_name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="vc_username" value="Username" />
          <TextInput
            id="vc_username"
            name="vc_username"
            value={data.vc_username}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            onChange={(e) => setData('vc_username', e.target.value)}
            required
          />
          <InputError message={errors.vc_username} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="vc_gender" value="Gender" />
          <select
            id="vc_gender"
            name="vc_gender"
            value={data.vc_gender}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            onChange={(e) => setData('vc_gender', e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <InputError message={errors.vc_gender} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="dt_birthday" value="Birthday" />
          <TextInput
            id="dt_birthday"
            type="date"
            name="dt_birthday"
            value={data.dt_birthday}
            className="mt-1 block w-full"
            onChange={(e) => setData('dt_birthday', e.target.value)}
            required
          />
          <InputError message={errors.dt_birthday} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="vc_hometown" value="Hometown" />
          <TextInput
            id="vc_hometown"
            name="vc_hometown"
            value={data.vc_hometown}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            onChange={(e) => setData('vc_hometown', e.target.value)}
          />
          <InputError message={errors.vc_hometown} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full font-['SF_Pro'] py-1 px-4 text-base border-[1.5px] border-gray-800 rounded-[0.5rem] shadow-[2.5px_3px_0_#000] outline-none transition-all duration-250 ease-in-out focus:shadow-[5.5px_7px_0_#000]"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>

    </GuestLayout>
  );
}
