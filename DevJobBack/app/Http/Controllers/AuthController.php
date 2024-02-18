<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Vacante;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\VerificationEmail;
use App\Http\Response\ApiResponse;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                "name" => "required|string",
                "email" => "required|email|unique:users,email",
                "rol" => "required",
                "password" => "required|min:6"
            ]);
    
            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "rol" => $request->rol,
                "password" => bcrypt($request->password),
            ]);
            $profile = Profile::create([
                "user_id" => $user->id,
                "email" => $request->email,
            ]);


           $token=$user->createToken('token')->plainTextToken;
            return ApiResponse::success('Usuario Creado Exitosamente', 201,['user'=>$user,
        "token"=>$token,"perfil"=>$profile
        ]);
        } catch (ValidationException $e) {
            return ApiResponse::error("Error en la validación:".$e->getMessage(), 422);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error("Error en la creación del usuario:".$e->getMessage(), 422);
        }
    }

    public function verify(Request $request, $token)
{
   

    $user = User::where('verification_token', $token)->first();

    if (!$user) {
        abort(404, 'User not found');
    }

    // Marca el correo electrónico como verificado
    $user->update(['email_verified_at' => now(), 'verification_token' => null]);

 
    return ApiResponse::success('Email validado','200',['token'=>$user->createToken('token')->plainTextToken]); 
}

public function user(){
    $users = DB::table('users')->get();
return response()->json($users);
}

public function login(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user(); // Agrega el punto y coma aquí
            return ApiResponse::success('Usuario autenticado correctamente', 200,[
                'user' => $user,
                'token' => $user->createToken('token')->plainTextToken,
            ]);
        } else {
            // Autenticación fallida
            return ApiResponse::error('Contraseña o usuario inválido', 401);
        }
    } catch (ValidationException $e) {
        return ApiResponse::error("Error en la validación: " . $e->getMessage(), 422);
    }
}


}
