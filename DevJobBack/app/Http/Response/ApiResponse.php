<?php

namespace App\Http\Response;

class ApiResponse{

    public static function success($message="Success",$statucode=200,$data=[]){

        return response()->json(["message"=>$message,
        "statucode"=>$statucode,
        "data"=>$data,
        "error"=>false],
        $statucode);
    }

    public static function error($message="error",$statucode=401,$data=[]){

        return response()->json(["message"=>$message,
        "statucode"=>$statucode,
        "data"=>$data,
        "error"=>true],
        $statucode);
    }
}