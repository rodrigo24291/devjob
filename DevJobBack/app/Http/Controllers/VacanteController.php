<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Vacante;
use Illuminate\Http\Request;
use App\Http\Response\ApiResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class VacanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=auth()->user()->id;
        
        try{
           $vacantes=Vacante::where('user_id',$user)->with('salario','categoria')->get();
        return ApiResponse::success('enviando vacantes',200,$vacantes);
        }
        catch(Exception $e){
            return ApiResponse::error('error',400,$e->getMessage());
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
        try {

            $request->validate([
                'title' => 'required|string',
                'empresa' => 'required|string',
                'description' => 'required|string',
                'time' => 'required',
                'image' => 'required'
            ]);

                // Quitar la información de la zona horaria antes de analizar la fecha
        $timeWithoutTimeZone = preg_replace('/\s\(.*\)$/', '', $request->time);

        // Convertir la cadena de fecha a un objeto Carbon
        $carbonFecha = Carbon::parse($timeWithoutTimeZone);

        $imageName = $request->file('image')->store('images', 'public');

        $user=auth()->user()->id;
        

            $vacante = Vacante::Create([
                'title' => $request->title,
                'salario_id' => $request->salario_id,
                'categoria_id' => $request->categoria_id,
                'empresa' => $request->empresa,
                'description' => $request->description,
                'date' => $carbonFecha->toDateTimeString(), 
                'image' => $imageName,
                'user_id'=>$user]);
                
                return ApiResponse::success('vacante creada',201,[$vacante]);
        } catch (ValidationException $e) {
            return ApiResponse::error('error en la validacion', 401,$e->getMessage());
        }

        catch(ModelNotFoundException $e){
            return ApiResponse::error('error al crear la vacante', 401,$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    
    try {

        $vacante = Vacante::with('salario', 'categoria')->findOrFail($id);

        // Tu lógica normal aquí
        return ApiResponse::success('vacante mostrada', 201, [$vacante]);
    } catch (ModelNotFoundException $e) {

        return ApiResponse::error('La vacante no fue encontrada', 404,$e->getMessage());
    } catch (Exception $e) {
        // Otro manejo de excepciones
        return ApiResponse::error('Error al crear la vacante', 401, $e->getMessage());
    }
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vacante $vacante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vacante $vacante)
    {

        try {
           $request->validate([
                'title' => 'required|string',
                'empresa' => 'required|string',
                'description' => 'required|string',
                'time' => 'required',
            ]);

            
    $ruta = storage_path('app/public/' . $request->image);
    $imageName='';

if($request->image && !file_exists($ruta) ){
    if(file_exists($ruta)){
        Storage::delete('public/' . $request->image);

    }

        $timeWithoutTimeZone = preg_replace('/\s\(.*\)$/', '', $request->time);

        // Convertir la cadena de fecha a un objeto Carbon
        $carbonFecha = Carbon::parse($timeWithoutTimeZone);

        $imageName = $request->file('image')->store('images', 'public');
}
            $vacante->update([
                'title' => $request->title,
                'salario_id' => $request->salario_id,
                'categoria_id' => $request->categoria_id,
                'empresa' => $request->empresa,
                'description' => $request->description,
                'date' => $carbonFecha->toDateTimeString(), 
                'image' => $imageName ? $imageName : $request->image,
                'user_id'=>1]);
                $vacante->save();
                return ApiResponse::success('vacante creada',201,[$vacante]);
        } catch (ValidationException $e) {
            return ApiResponse::error('error en la validacion', 401,$e->getMessage());
        }

        catch(ModelNotFoundException $e){
            return ApiResponse::error('error al crear la vacante', 401,$e->getMessage());
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacante $vacante)
    {
        try{

            $vacante->delete();
            return ApiResponse::success('Vacante eliminada',200,[]);
        }
        catch(Exception $e){
            return ApiResponse::error('No se puedo eliminar',500, $e->getMessage());
        }
    }
}
