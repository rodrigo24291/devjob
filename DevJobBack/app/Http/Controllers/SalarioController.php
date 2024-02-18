<?php

namespace App\Http\Controllers;

use App\Http\Response\ApiResponse;
use App\Models\Salario;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class SalarioController extends Controller
{
    public function index()
    {

        try{

            $categoria=Salario::all();
            return ApiResponse::success('succes',200,$categoria);
        }
        catch(ModelNotFoundException $e){
            return ApiResponse::error('error',401,$e->getMessage());
        }
    }
    public function verifi(){
        
    }

}
