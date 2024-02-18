<?php

namespace App\Models;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Educacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'estado',
        'nivel',
        'institucion',
        'fecha_inicio',
        'fecha_fin',
        'profile_id'

    ];

    
    public function profile(){
       return $this->belongsTo(Profile::class);
    }
}
