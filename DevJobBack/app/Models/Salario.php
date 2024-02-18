<?php

namespace App\Models;

use App\Models\Vacante;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salario extends Model
{
    use HasFactory;

    public function vacante(){
        return $this->hasMany(Vacante::class);
    }
}
