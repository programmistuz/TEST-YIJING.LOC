<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// модель
class Histore extends Model
{
    // управляемая таблица
    protected $table = "histore";

    // список полей, разрешенных на редактирование
    protected $fillable = [];
    // список полей запрещенных на редактирование
    protected $guarded = [];
    // скрытые поля
    protected $hidden = [];

    // связи
    // с пользователями user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }
}
