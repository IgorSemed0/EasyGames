<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        //Google
        Event::listen(function (
            \SocialiteProviders\Manager\SocialiteWasCalled $event
        ) {
            $event->extendSocialite(
                "google",
                \SocialiteProviders\Google\Provider::class
            );
        });

        //Facebook
        Event::listen(function (
            \SocialiteProviders\Manager\SocialiteWasCalled $event
        ) {
            $event->extendSocialite(
                "facebook",
                \SocialiteProviders\Facebook\Provider::class
            );
        });
    }

}
