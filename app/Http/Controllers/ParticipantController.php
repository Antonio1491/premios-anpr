<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $participants = Participant::latest()->paginate(10);

        return Inertia::render('Participants/Index', [
            'participants' => $participants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Participants/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Información general
            'email' => 'required|email|unique:participants,email',
            'category' => 'required|string',

            // Información del participante o representante
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'city_country' => 'nullable|string|max:255',
            'secondary_email' => 'nullable|email',
            'phone' => 'nullable|string|max:50',
            'linkedin' => 'nullable|url|max:255',

            // Descripción del proyecto
            'project_title' => 'required|string|max:255',
            'project_description' => 'nullable|string',
            'project_results' => 'nullable|string',
            'project_uniqueness' => 'nullable|string',

            // Material de apoyo
            'support_links' => 'nullable|array',
            'support_links.*' => 'nullable|url',
            'complementary_files' => 'nullable|array|max:5',
            'complementary_files.*' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,xls,xlsx|max:10240',
            'photos' => 'nullable|array|max:5',
            'photos.*' => 'nullable|image|max:5120',

            // Referencia o contacto
            'reference_name' => 'nullable|string|max:255',
            'reference_role' => 'nullable|string|max:255',
            'reference_organization' => 'nullable|string|max:255',
            'reference_email' => 'nullable|email',
        ]);

        // Procesar archivos complementarios
        $complementaryFiles = [];
        if ($request->hasFile('complementary_files')) {
            foreach ($request->file('complementary_files') as $file) {
                $path = $file->store('participants/files', 'public');
                $complementaryFiles[] = [
                    'original_name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(),
                ];
            }
        }

        // Procesar fotos
        $photos = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('participants/photos', 'public');
                $photos[] = [
                    'original_name' => $photo->getClientOriginalName(),
                    'path' => $path,
                    'size' => $photo->getSize(),
                ];
            }
        }

        // Crear el participante
        Participant::create([
            ...$validated,
            'complementary_files' => $complementaryFiles,
            'photos' => $photos,
        ]);

        return redirect()->route('participants.create')
            ->with('success', 'Registro enviado exitosamente. Gracias por participar en los Premios ANPR.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant): Response
    {
        return Inertia::render('Participants/Show', [
            'participant' => $participant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant): Response
    {
        return Inertia::render('Participants/Edit', [
            'participant' => $participant,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        $validated = $request->validate([
            // Información general
            'email' => 'required|email|unique:participants,email,' . $participant->id,
            'category' => 'required|string',

            // Información del participante o representante
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'city_country' => 'nullable|string|max:255',
            'secondary_email' => 'nullable|email',
            'phone' => 'nullable|string|max:50',
            'linkedin' => 'nullable|url|max:255',

            // Descripción del proyecto
            'project_title' => 'required|string|max:255',
            'project_description' => 'nullable|string',
            'project_results' => 'nullable|string',
            'project_uniqueness' => 'nullable|string',

            // Material de apoyo
            'support_links' => 'nullable|array',
            'support_links.*' => 'nullable|url',

            // Referencia o contacto
            'reference_name' => 'nullable|string|max:255',
            'reference_role' => 'nullable|string|max:255',
            'reference_organization' => 'nullable|string|max:255',
            'reference_email' => 'nullable|email',
        ]);

        $participant->update($validated);

        return redirect()->route('participants.show', $participant)
            ->with('success', 'Registro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        // Eliminar archivos del storage
        if ($participant->complementary_files) {
            foreach ($participant->complementary_files as $file) {
                Storage::disk('public')->delete($file['path']);
            }
        }

        if ($participant->photos) {
            foreach ($participant->photos as $photo) {
                Storage::disk('public')->delete($photo['path']);
            }
        }

        $participant->delete();

        return redirect()->route('participants.index')
            ->with('success', 'Registro eliminado exitosamente.');
    }
}
