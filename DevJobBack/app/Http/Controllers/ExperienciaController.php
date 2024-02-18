<?php

namespace App\Http\Controllers;

use App\Http\Response\ApiResponse;
use App\Models\Experiencia;
use Exception;
use Illuminate\Http\Request;

class ExperienciaController extends Controller
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
        try{
            $request->validate([
                "fecha_inicio"=> "date",
                "fecha_fin"=>"date"
            ]);
            
           $experiencia= Experiencia::create([
            
            
            "profile_id"=>1,
                "puesto"=>$request->puesto,
                "empresa"=>$request->empresa,
                "fecha_inicio"=>$request->fecha_inicio,
                "fecha_fin"=>$request->fecha_fin,  
            ]);

         return   ApiResponse::success("Experiencia laboral creada",201,[$experiencia]);
        }

        catch(Exception $e){

           return ApiResponse::error("Error al crear experiencia".$e->getMessage(),400);
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
