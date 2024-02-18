<?php

namespace App\Models;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experiencia extends Model
{
    protected $fillable = [
        'puesto',
        'empresa',
        'fecha_inicio',
        'fecha_fin',
        'profile_id'

    ];
    use HasFactory;

    
    public function profile(){
        $this->belongsTo(Profile::class);
    }
}
