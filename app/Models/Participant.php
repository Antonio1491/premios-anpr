<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
        'email',
        'category',
        'name',
        'role',
        'organization',
        'city_country',
        'secondary_email',
        'phone',
        'linkedin',
        'project_title',
        'project_description',
        'project_results',
        'project_uniqueness',
        'support_links',
        'complementary_files',
        'photos',
        'reference_name',
        'reference_role',
        'reference_organization',
        'reference_email',
    ];

    protected $casts = [
        'support_links' => 'array',
        'complementary_files' => 'array',
        'photos' => 'array',
    ];
}
