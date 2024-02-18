<?php

namespace App\Models;

use App\Models\Educacion;
use App\Models\Experiencia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email',
        'fecha_nacimiento',
        'telefono',
        'linkedin',
        'facebook',
        'github',
        'presentacion',
        'direccion',
        'nacionalidad',
        'dni',
        'foto',

    ];
    
    public function user(){
       return $this->hasOne(User::class);
    }

    public function experiencia(){
       return $this->hasMany(Experiencia::class);
    }

    
    public function educacion(){
        return $this->hasMany(Educacion::class);
    }
}
