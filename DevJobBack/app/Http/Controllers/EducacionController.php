<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Educacion;
use Illuminate\Http\Request;
use App\Http\Response\ApiResponse;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class EducacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {


            // Quitar la información de la zona horaria antes de analizar la fecha
            $fecha_inicio = preg_replace('/\s\(.*\)$/', '', $request->fecha_inicio);

            // Convertir la cadena de fecha a un objeto Carbon
            $carbonFecha_inicio = Carbon::parse($fecha_inicio);


            // Quitar la información de la zona horaria antes de analizar la fecha
            $fecha_fin = preg_replace('/\s\(.*\)$/', '', $request->fecha_fin);

            // Convertir la cadena de fecha a un objeto Carbon
            $carbonFecha_fin = Carbon::parse($fecha_fin);
            $user=auth()->user()->id;
            $perfil = Profile::where('user_id', $user)->first();

            if ($perfil) {
                $educacion = Educacion::create([
                    "estado" => $request->estado,
                    "nivel" => $request->nivel,
                    "institucion" => $request->institucion,
                    "fecha_inicio" => $carbonFecha_inicio->toDateTimeString(),
                    "fecha_fin" => $carbonFecha_fin->toDateTimeString(),
                    "profile_id" => $perfil->id
                ]);
            }
            return ApiResponse::success('eduacion creada', 201, [$educacion]);
        } catch (Exception $e) {
            return ApiResponse::error('error al crear educacion' . $e->getMessage(), 401);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
