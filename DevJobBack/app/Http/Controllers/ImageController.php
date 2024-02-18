<?php

namespace App\Http\Controllers;

use App\Models\Vacante;
use Illuminate\Http\Request;
use App\Http\Response\ApiResponse;

class ImageController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $vacante = Vacante::findOrFail($id);
            $imagen = $vacante->image;
    
            $ruta = storage_path('app/public/' . $imagen);
    
            if (!file_exists($ruta)) {
                throw new \Exception('Imagen no encontrada');
            }
    
            // Obtener el tipo de contenido de la imagen
            $tipoContenido = mime_content_type($ruta);
    
            // Devolver la imagen como respuesta HTTP
            return response(file_get_contents($ruta), 200)
                ->header('Content-Type', $tipoContenido);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response('Vacante no encontrada', 404);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
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
