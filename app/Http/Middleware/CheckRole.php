<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$vc_roles): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }
        
        //Allow only one role per time
        // if (!auth()->user()->hasRole($vc_role)) {
        //     abort(403, 'Acção não autorizada.');
        // }
         
        if(!empty($vc_roles)) {
            foreach ($vc_roles as $vc_role) {
                if (auth()->user()->hasRole($vc_role)) {
                    return $next($request);
                }
            }
        }
        
        //Block message Page
        abort(403, 'Acção não autorizada.');
        
        //Redirect to home
        // return redirect()->route('home');
        
        // return $next($request);
    }
}
