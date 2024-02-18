<?php

namespace App\Models;

use App\Models\User;
use App\Models\Salario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vacante extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'image',
        'description',
        'date',
        'empresa',
        'categoria_id',
        'salario_id',
        'user_id'
    ];


    public function salario()
    {
        return $this->belongsTo(Salario::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function user()
{
    return $this->belongsToMany(User::class);
}
}
