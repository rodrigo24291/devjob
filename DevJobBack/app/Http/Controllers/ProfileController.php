<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Http\Response\ApiResponse;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
$perfilActualizado = Profile::where('user_id',auth()->user()->id)->with('experiencia','educacion')->first();
            return  ApiResponse::success('Perfil Cargado', 200, [$perfilActualizado]);
        } catch (Exception $e) {
            return ApiResponse::error('error' . $e->getMessage(), 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // Buscar el perfil basado en el user_id
            $perfil = Profile::where('user_id', $id)->first();
    
            // Verificar si el perfil existe
            if (!$perfil) {
                return ApiResponse::error("Perfil no encontrado para el usuario con ID: $id", 404);
            }
    
            return ApiResponse::success('Perfil encontrado', 200, [$perfil]);
        } catch (Exception $e) {
            return ApiResponse::error("Error al encontrar el perfil: " . $e->getMessage());
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $perfil = Profile::where('user_id', $id)->first();
    
            if (!$perfil) {
                return ApiResponse::error("Perfil no encontrado para el usuario con ID: $id", 404);
            }
            $timeWithoutTimeZone = preg_replace('/\s\(.*\)$/', '', $request->fecha_nacimiento);

            // Convertir la cadena de fecha a un objeto Carbon
            $carbonFecha = Carbon::parse($timeWithoutTimeZone);
            $perfil->update([
                'facebook' => $request->input('facebook'),
                'github' => $request->input('github'),
                'linkedin' => $request->input('linkedin'),
                'presentacion' => $request->input('presentacion'),
                'nacionalidad' => $request->input('nacionalidad'),
                'telefono' => $request->input('telefono'),
                'direccion' => $request->input('direccion'),
                'dni' => $request->input('dni'),
                'fecha_nacimiento' => $carbonFecha->toDateTimeString(),
                'foto' => $request->input('foto'),
            ]);
            $perfilActualizado = Profile::findOrFail($perfil->id);
    
            return ApiResponse::success("Actualización de los datos personales exitosa", 200, $perfilActualizado);
        } catch (Exception $e) {
            return ApiResponse::error("Error al actualizar el perfil: " . $e->getMessage());
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
