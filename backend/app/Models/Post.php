<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
        ];
    }

    protected $fillable = [
        'title',
        'content',
        'published',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
