<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\EducacionController;
use App\Http\Controllers\ExperienciaController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalarioController;
use App\Http\Controllers\VacanteController;
use App\Http\Response\ApiResponse;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('vacantes', VacanteController::class)->except([
        "show"
    ]);
    Route::apiResource('perfil',ProfileController::class);
    
Route::apiResource('educacion',EducacionController::class);

    Route::get('/verificar-token', function () {
       
        $user = auth()->user();

        if ($user) {

            return ApiResponse::success('Token valido',200,[$user]);
        } else {
            return ApiResponse::error('token invalido',400,[]);
        }
    });
   
});
// routes/web.php
Route::apiResource('experiencia',ExperienciaController::class);

Route::get('/image/{image}',[ImageController::class,'show']);
Route::get('vacantes/{id}',[VacanteController::class,'show']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/busqueda',[CvController::class,'busqueda']);
Route::get('/busqueda',[CvController::class,'ultimasvacantes']);
Route::get('/usa',[AuthController::class,'user']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/verify-email/{token}',[AuthController::class,'verify'])->name('verify-email')->middleware('signed');;
Route::get('/categoria',[CategoriaController::class,'index']);
Route::get('/salario',[SalarioController::class,'index']);
