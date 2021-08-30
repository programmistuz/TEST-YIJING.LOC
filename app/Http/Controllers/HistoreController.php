<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

// модели
use App\Models\Histore;

class HistoreController extends Controller
{
    // ------------------------------------------------------------------
    // сохранение истории
    public function histore_save(Request $request)
    {
        // данные с фронта
        $getObject = json_decode($request['object'], true);
        $getUser = json_decode($request['user'], true);
        $getQuestionUser = $request['questionUser'];

        // для ответа
        $result = ['success' => true];
        $result['object'] = $getObject;
        $result['user'] = $getUser;
        $result['questionUser'] = $getQuestionUser;

        // сохранение в БД
        $histore = new Histore();
        $histore->user_id = $getUser['user_id'];
        $histore->question = $getQuestionUser;
        $histore->geksarama_id = $getObject['id'];
        $histore->save();

        // возвращаемый параметр
        return response()->json($result);
    }

    // ------------------------------------------------------------------
    // загрузка истории
    public function histore_load(Request $request)
    {
        // данные с фронта
        $getUser = json_decode($request['user'], true);

        // загрузка с БД
        $histore = Histore::where('user_id', $getUser['user_id'])->latest()->get(); // take(10)

        // возвращаемый параметр
        return $histore;
    }
}
