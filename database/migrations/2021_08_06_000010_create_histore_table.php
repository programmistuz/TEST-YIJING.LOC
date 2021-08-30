<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoreTable extends Migration
{
    // имя таблицы
    public $tableName = 'histore';

    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->String('question')->nullable();
            $table->integer('geksarama_id')->nullable();

            // поля Laravel
            $table->timestamps();

            // связи
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('no action')
                ->onUpdate('no action');
        });

        // комментарий к таблице
        try {
            DB::statement("ALTER TABLE `" . $this->tableName . "` comment 'История'");
        } catch (\Exception $e) {
        }
    }

    // на случай отката
    public function down()
    {
        Schema::dropIfExists($this->tableName);
    }
}
