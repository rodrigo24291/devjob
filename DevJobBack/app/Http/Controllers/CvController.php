<?php

namespace App\Http\Controllers;

use App\Http\Response\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use App\Models\Vacante;

class CvController extends Controller
{
    public function enviarcv(Request $request){

    }

    public function ultimasvacantes(){

        try{
    $vacantes=Vacante::latest()->with('salario')->with('categoria')->take(5)->get();
    
return    ApiResponse::success('ultimas vacantes',200,$vacantes);
        }

        catch(Exception $e){
            return ApiResponse::error('Error al enviar las vacante',400,$e->getMessage());
        }
    }

    public function busqueda(Request $request){
        try{
            $busqueda= $request->input('termino');
            $categoria= $request->input('categoria');
            $salario= $request->input('salario');
           
            $vacantes= Vacante::where('title','like',"%".$busqueda."%")->
            where('categoria_id',$categoria)->
            where('salario_id',$salario)->with('salario')->with('categoria')
            ->get();
            return ApiResponse::success('VACANTES CARGADAS',200,$vacantes);
        }

        catch(Exception $e){
            return ApiResponse::error('error',400,$e->getMessage());
        }
    }
}
