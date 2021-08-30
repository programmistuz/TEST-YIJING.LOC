export default {

    // ------------------------------------------------------------------
    // признак загрузки
    ACTION_loading({commit}, getValue) {

        commit('MUTATTION_loading', getValue);
    },

    // ------------------------------------------------------------------
    // гексарама - создать по id
    ACTION_geksaramaMakeOnID({commit}, getID) {

        commit('MUTATTION_geksaramaMakeOnID', getID);
    },

    // ------------------------------------------------------------------
    // гексарамы все - массив с линиями полная расшифровка
    ACTION_geksaramaArrFull({commit}) {

        commit('MUTATTION_geksaramaArrFull');
    },

    // ------------------------------------------------------------------
    // гексарама - перемешанный массив гексарам
    ACTION_geksaramaArr({commit}) {

        commit('MUTATTION_geksaramaArr');
    },

    // ------------------------------------------------------------------
    // гексарама текущая
    ACTION_geksaramaCurrent({commit}, getObject) {

        // гексарама текущая
        commit('MUTATTION_geksarabaCurrent', getObject);
        // гексарама текущая отображается сейчас
        commit('MUTATTION_geksarabaCurrentIsShow', true);
        // записать в историю
        commit('MUTATTION_historeSave', getObject);
    },

    // ------------------------------------------------------------------
    // гексарама текущая отображается сейчас
    ACTION_geksaramaCurrentIsShow({commit}, getValue) {

        commit('MUTATTION_geksarabaCurrentIsShow', getValue);
    },

    // ------------------------------------------------------------------
    // загрузка истории
    ACTION_historeLoad({commit}) {

        commit("MUTATTION_historeLoad");
    },
};
