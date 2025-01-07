<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SocialAccountController extends Controller
{
    public function redirectToProvider($provider)
    {
        $scopes = []; 

        if ($provider === "google") {
            $scopes = ["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
        } else if ($provider === "facebook") {
            $scopes = ["email", "public_profile", "user_birthday", "user_gender", "user_hometown"];
        }
        return Socialite::driver($provider)
            ->stateless()
            ->scopes($scopes)
            ->redirect();
    }
    
    private function generateUniqueUsername($baseUsername)
    {
        $username = $baseUsername;
        $counter = 1;

        while (User::where('vc_username', $username)->exists()) {
            $username = $baseUsername . $counter;
            $counter++;
        }

        return $username;
    }
    
    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
            $email = $socialUser->getEmail(); 
            $providerId = $socialUser->getId();
            $profilePic = $socialUser->getAvatar();
    
            $user = User::where('email', $email)->first();
            $isNewUser = false;
    
            if (!$user) {
                $isNewUser = true;
                $fullName = $socialUser->getName() ?? '';
                $baseUsername = $fullName ? strtolower(str_replace(' ', '', $fullName)) : '';
                $username = $this->generateUniqueUsername($baseUsername);
    
                $birthday = null;
                $gender = null;
                $hometown = null;
    
                if ($provider === 'facebook') {
                    $birthday = isset($socialUser->user['birthday']) ? Carbon::createFromFormat('m/d/Y', $socialUser->user['birthday'])->format('Y-m-d') : null;
                    $gender = $socialUser->user['gender'] ?? null;
                    $hometown = $socialUser->user['hometown']['name'] ?? null;
                    $profilePic = $socialUser->user['picture']['data']['url'] ?? $socialUser->getAvatar();
                }
                
                $user = User::create([
                    'vc_name' => $fullName,
                    'vc_username' => $username,
                    'email' => $email,
                    'dt_birthday' => $birthday,
                    'vc_gender' => $gender,
                    'vc_hometown' => $hometown,
                    'vc_profile' => $profilePic,
                ]);
            }
    
            $socialAccount = SocialAccount::updateOrCreate(
                [
                    'vc_provider_id' => $providerId,
                    'vc_provider_name' => $provider
                ],
                [
                    'user_id' => $user->id
                ]
            );
    
            Auth::login($user);
    
            session()->regenerate();
    
            return redirect()->intended(route('dashboard'));
    
        } catch (\Exception $e) {
            Log::error("{$provider} Authentication Error: " . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return redirect()->route('login')
                ->with('error', 'Error authenticating with ' . $provider);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out from social account'
        ], 200);
    }

    // Get all social accounts for the authenticated user
    public function getUserSocialAccounts(Request $request)
    {
        $socialAccounts = SocialAccount::where('user_id', $request->user()->id)->get();
        return response()->json([
            'social_accounts' => $socialAccounts
        ], 200);
    }

    // Admin: List all social accounts
    public function index()
    {
        $socialAccounts = SocialAccount::with('user')->get();
        return response()->json(['social_accounts' => $socialAccounts], 200);
    }

    // Show specific social account
    public function show($id)
    {
        $socialAccount = SocialAccount::with('user')->find($id);

        if (!$socialAccount) {
            return response()->json(
                ["message" => "Social account not found"],
                404
            );
        }

        return response()->json(['social_account' => $socialAccount], 200);
    }

    // Unlink social account
    public function destroy(Request $request, $provider)
    {
        $socialAccount = SocialAccount::where([
            'user_id' => $request->user()->id,
            'vc_provider_name' => $provider
        ])->first();

        if (!$socialAccount) {
            return response()->json(
                ["message" => "Social account not found"],
                404
            );
        }

        $socialAccount->delete();

        return response()->json([
            "message" => "Social account unlinked successfully"
        ], 200);
    }
}