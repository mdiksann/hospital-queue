<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Polyclinic extends Model
{
    protected $fillable = ['name', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function queues()
    {
        return $this->hasMany(Queue::class);
    }
}
