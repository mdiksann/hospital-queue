<?php

namespace App\Http\Controllers;

use App\Models\Polyclinic;
use Illuminate\Http\Request;

class PolyclinicController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Polyclinic::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100'
        ]);

        $polyclinic = Polyclinic::create([
            'name' => $request->name
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Polyclinic created',
            'data' => $polyclinic
        ]);
    }

    public function update(Request $request, Polyclinic $polyclinic)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'is_active' => 'boolean'
        ]);

        $polyclinic->update($request->only('name', 'is_active'));

        return response()->json([
            'success' => true,
            'message' => 'Polyclinic updated',
            'data' => $polyclinic
        ]);
    }

    public function destroy(Polyclinic $polyclinic)
    {
        $polyclinic->delete();

        return response()->json([
            'success' => true,
            'message' => 'Polyclinic deleted'
        ]);
    }

    public function getActivePolyclinics()
    {
        return response()->json([
            'success' => true,
            'data' => Polyclinic::where('is_active', true)
                ->orderBy('name')
                ->get()
        ]);
    }
}
