export default {

    // ------------------------------------------------------------------
    // признак загрузки
    MUTATTION_loading(state, getValue) {

        // присвоить новое значение
        state.STATE_loading = getValue;
    },

    // ------------------------------------------------------------------
    // гексарама - создать по id
    MUTATTION_geksaramaMakeOnID(state, getID) {

        let myGeksarama = state.STATE_geksarama.find(function (item) {
            return (Number(item.id) === Number(getID));
        });
        // верхняя часть
        let myTop = state.STATE_geksaramaHalf.find(function (item) {
            return (Number(item.id) === Number(myGeksarama.top));
        });
        // нижняя часть
        let myBottom = state.STATE_geksaramaHalf.find(function (item) {
            return (Number(item.id) === Number(myGeksarama.bottom));
        });

        // вверхняя и нижняя часть вместе
        let myMerge = myTop.lines.concat(myBottom.lines);

        // присвоить новое значение
        state.STATE_geksaramaMakeOnID = {
            'id': getID,
            'name': myGeksarama.name,
            'text': myGeksarama.text,
            'lines': myMerge,

        };
    },

    // ------------------------------------------------------------------
    // гексарамы все - массив с линиями полная расшифровка
    MUTATTION_geksaramaArrFull(state) {
        state.STATE_geksaramaArrFull = [];

        // проскнаировать и собрать воедино вверх и низ
        state.STATE_geksarama.map(function (item) {

            // верхняя часть
            let myTop = state.STATE_geksaramaHalf.find(function (item2) {
                return (Number(item2.id) === Number(item.top));
            });
            // нижняя часть
            let myBottom = state.STATE_geksaramaHalf.find(function (item2) {
                return (Number(item2.id) === Number(item.bottom));
            });

            // вверхняя и нижняя часть вместе
            let myMerge = myTop.lines.concat(myBottom.lines);

            // присвоить новое значение
            state.STATE_geksaramaArrFull.push({
                'id': item.id,
                'name': item.name,
                'text': item.text,
                'lines': myMerge,
            });
        });
    },

    // ------------------------------------------------------------------
    // гексарама - перемешанный массив гексарам
    MUTATTION_geksaramaArr(state) {

        // признак загрузки
        state.STATE_loading = true;

        // очистить
        state.STATE_geksaramaArr = [];
        // заполнить по порядку
        for (let i = 1; i <= 64; i++) {
            state.STATE_geksaramaArr.push(i);
        }
        // перемешать
        state.STATE_geksaramaArr.sort(() => Math.random() - 0.5);

        // признак загрузки
        state.STATE_loading = false;
    },

    // ------------------------------------------------------------------
    // гексарама текущая
    MUTATTION_geksarabaCurrent(state, getObject) {

        // присвоить новое значение
        state.STATE_geksarabaCurrent = getObject;
    },

    // ------------------------------------------------------------------
    // гексарама текущая отображается сейчас
    MUTATTION_geksarabaCurrentIsShow(state, getValue) {

        // присвоить новое значение
        state.STATE_geksarabaCurrentIsShow = getValue;
    },

    // ------------------------------------------------------------------
    // сохранение истории
    MUTATTION_historeSave(state, getObject) {

        // признак загрузки
        state.STATE_loading = true;

        // данные post-запроса
        let form = new FormData();
        form.append("object", JSON.stringify(getObject));
        form.append("user", JSON.stringify(state.Auth));

        // запрос
        axios
            .post("/api/histore_save", form)
            .then(response => {
                // запрос успешно прошел
                console.log(response.data);
            })
            .catch(error => {
                // ошибка
            })
            .finally(() => {
                // финальная обработка

                // признак загрузки
                state.STATE_loading = false;
            });
    },

    // ------------------------------------------------------------------
    // загрузка истории
    async MUTATTION_historeLoad(state) {

        // признак загрузки
        state.STATE_loading = true;

        // данные post-запроса
        let form = new FormData();
        form.append("user", JSON.stringify(state.Auth));

        // запрос
        axios
            .post("/api/histore_load", form)
            .then(response => {
                // запрос успешно прошел
                console.log(response.data);

                // сохранить в переменную
                state.STATE_histore = response.data;
            })
            .catch(error => {
                // ошибка
            })
            .finally(() => {
                // финальная обработка

                // признак загрузки
                state.STATE_loading = false;
            });
    },

    // ------------------------------------------------------------------
    // авторизированный пользователь
    Login(state) {

        // присвоить новые значения
        state.Auth.user_id = localStorage.getItem("user_id");
        state.Auth.api_token = localStorage.getItem("api_token");
        state.Auth.name = localStorage.getItem("name");
        state.Auth.photo = localStorage.getItem("photo");
        state.Auth.login =
            state.Auth.user_id !== null &&
            state.Auth.api_token !== null &&
            state.Auth.name !== null;
    },

    // ------------------------------------------------------------------
    showInfo(state, message) {
        state.info.text = message;
        state.info.show = true;
    },

    // ------------------------------------------------------------------
    // setHistoreList(state, payload) {
    //     state.imagesList = payload;
    // },
};
