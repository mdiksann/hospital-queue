<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    protected $fillable = [
        'queue_number',
        'patient_name',
        'polyclinic_id',
        'status',
        'queue_date',
        'called_at',
        'finished_at'
    ];

    protected $casts = [
        'queue_date' => 'date',
        'called_at' => 'datetime',
        'finished_at' => 'datetime'
    ];

    public function polyclinic()
    {
        return $this->belongsTo(Polyclinic::class);
    }
}