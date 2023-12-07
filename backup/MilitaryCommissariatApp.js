// Load JSON
// create var data with this json
// create var tbody
// in loop create tr
// in loop create td(s) inside tr
// set value of field in td



console.log("lalalala");
class MilitaryCommissariatApp extends MilitaryCommissariat {
    constructor() {
        super(); // Виклик конструктора базового класу
        // Додаткові ініціалізації, якщо потрібно
    }

    //a.	Алгоритмом злиття відсортувати записи за кількістю працівників в військкоматі
    SortEmployeesUsingMergeSort() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        sortEmployeesButtons.forEach(function (button) {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Сортувати за к-стю працівників") {
                button.addEventListener("click", function () {
                    let tableBody = document.querySelector("tbody");
                    let originalRows = Array.from(
                        tableBody.querySelectorAll("tr")
                    );
                    let tbody = document.createElement("tbody");

                    // Створити копію початкового вмісту таблиці
                    let rows = originalRows.map((row) => row);

                    let data = rows.map(function (row, index) {
                        let cells = Array.from(row.getElementsByTagName("td"));
                        return {
                            index,
                            value: Number(cells[4].textContent) || 0,
                        };
                    });

                    console.log("Дані перед сортуванням:", data);

                    function merge(left, right) {
                        let result = [];
                        let i = 0,
                            j = 0;

                        while (i < left.length && j < right.length) {
                            if (left[i].value < right[j].value) {
                                result.push(left[i++]);
                            } else {
                                result.push(right[j++]);
                            }
                        }

                        return result
                            .concat(left.slice(i))
                            .concat(right.slice(j));
                    }

                    function mergeSort(arr) {
                        if (arr.length <= 1) {
                            return arr;
                        }

                        let middle = Math.floor(arr.length / 2);
                        let left = arr.slice(0, middle);
                        let right = arr.slice(middle);

                        return merge(mergeSort(left), mergeSort(right));
                    }

                    let sortedData = mergeSort(data);

                    console.log("Відсортовані дані:", sortedData);

                    sortedData.forEach(function (item) {
                        tbody.appendChild(originalRows[item.index]);
                    });

                    // Замінити існуючий tableBody новим tbody
                    tableBody.parentNode.replaceChild(tbody, tableBody);
                });
            }
        });
    }
    CalculateAverage() {
        let calculateAverageButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        calculateAverageButtons.forEach(function (button) {
            if (
                button.textContent.trim() === "Середні витрати по військкоматах"
            ) {
                button.addEventListener("click", function () {
                    // Отримуємо таблицю
                    var table = document.getElementById("myTable");

                    // Перевіряємо наявність таблиці
                    if (!table) {
                        console.error('Таблиця з ID "myTable" не знайдена.');
                        return;
                    }

                    // Отримуємо tbody, де містяться дані
                    var tbody = table.querySelector("tbody");

                    // Перевіряємо наявність tbody
                    if (!tbody) {
                        console.error("Таблиця не має елементу tbody.");
                        return;
                    }

                    // Отримуємо всі рядки таблиці в tbody
                    let rows = tbody.getElementsByTagName("tr");

                    // Змінні для збереження суми і кількості військкоматів
                    let totalExpenses = 0;
                    let numberOfVoyenkomats = 0;

                    // Проходимо всі рядки таблиці, починаючи з індексу 0
                    for (let i = 0; i < rows.length; i++) {
                        // Отримуємо комірку з витратами на працівника (індекс 3)
                        var expensesCell = rows[i].cells[3];

                        // Отримуємо значення витрат і конвертуємо його в число
                        var expenses = parseFloat(expensesCell.innerText);

                        // Додаємо витрати до загальної суми
                        totalExpenses += expenses;

                        // Збільшуємо кількість військкоматів
                        numberOfVoyenkomats++;
                    }

                    // Обчислюємо середні витрати
                    var averageExpenses = totalExpenses / numberOfVoyenkomats;
                    averageExpenses = averageExpenses.toFixed(3); // кількість цифр після коми

                    // Повертаємо середні витрати
                    alert(
                        `Середні витрати по всіх військкоматах: ${averageExpenses}`
                    );
                });
            }
        });
    }

    MilitaryCommissariatWithEmployeeLessThat50Registered() {
        let MilitaryCommissariatWithEmployeeLessThat50Registered =
            document.querySelectorAll(".button-container .right-button");

        MilitaryCommissariatWithEmployeeLessThat50Registered.forEach(function (
            button
        ) {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Працівників менше 50% к-сті приписаних") {
                button.addEventListener("click", function () {
                    let tableBody = document.querySelector("tbody");
                    let rows = Array.from(tableBody.querySelectorAll("tr"));
                    rows.forEach((el) => {
                        console.log(el);
                    });
                    // Отримати всі рядки таблиці

                    // Фільтрація рядків за умовою "Працівників менше 50% к-сті приписаних"
                    let filteredRows = rows.filter(function (row) {
                        let cells = row.getElementsByTagName("td");
                        let numEmployees =
                            parseInt(cells[4].textContent, 10) || 0;
                        let numAssigned =
                            parseInt(cells[5].textContent, 10) || 0;

                        // Умова для фільтрації
                        return numEmployees < 0.5 * numAssigned;
                    });

                    // Створити новий tbody для відфільтрованих даних
                    let filteredTbody = document.createElement("tbody");
                    filteredRows.forEach(function (row) {
                        filteredTbody.appendChild(row);
                    });

                    // Замінити існуючий tbody новим відфільтрованим tbody
                    tableBody.parentNode.replaceChild(filteredTbody, tableBody);
                });
            }
        });
    }

    IdentifyCommissariatsWithHigherExpenses() {
        let identifyHigherExpensesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        identifyHigherExpensesButtons.forEach(function (button) {
            let buttonText = button.textContent.trim();

            if (
                buttonText ===
                "Витрати на працівника більші за середні по всіх військкоматах"
            ) {
                button.addEventListener("click", function () {
                    // Отримуємо таблицю
                    let table = document.getElementById("myTable");

                    // Перевіряємо наявність таблиці
                    if (!table) {
                        console.error('Таблиця з ID "myTable" не знайдена.');
                        return;
                    }

                    // Отримуємо tbody, де містяться дані
                    let tbody = table.querySelector("tbody");

                    // Перевіряємо наявність tbody
                    if (!tbody) {
                        console.log("Таблиця не має елементу tbody.");
                        return;
                    }

                    // Отримуємо всі рядки таблиці в tbody
                    let rows = tbody.getElementsByTagName("tr");

                    // Змінні для збереження суми і кількості військкоматів
                    let totalExpenses = 0;
                    let numberOfCommissariats = 0;

                    // Проходимо всі рядки таблиці, починаючи з індексу 0
                    for (let i = 0; i < rows.length; i++) {
                        // Отримуємо комірку з витратами на працівника (індекс 3)
                        let expensesCell = rows[i].cells[3];

                        // Отримуємо значення витрат і конвертуємо його в число
                        let expenses = parseFloat(expensesCell.innerText);

                        // Додаємо витрати до загальної суми
                        totalExpenses += expenses;

                        // Збільшуємо кількість військкоматів
                        numberOfCommissariats++;
                    }

                    // Обчислюємо середні витрати
                    let averageExpenses = totalExpenses / numberOfCommissariats;
                    averageExpenses = averageExpenses.toFixed(3);

                    // Фільтрація військкоматів з витратами більше за середні
                    let higherExpensesCommissariats = Array.from(rows).filter(
                        function (row) {
                            let expenses = parseFloat(row.cells[3].innerText);
                            return expenses > averageExpenses;
                        }
                    );

                    // Створюємо новий tbody для військкоматів з витратами більше за середні
                    let newTbody = document.createElement("tbody");
                    higherExpensesCommissariats.forEach(function (row) {
                        newTbody.appendChild(row.cloneNode(true)); // Клонуємо рядок
                    });

                    // Замінюємо існуючий tbody новим
                    tbody.parentNode.replaceChild(newTbody, tbody);
                });
            }
        });
    }

    //e.	Вивести 4 військкомати, в яких кількість приписаних  більша середньої, проте витрати на працівника менші за середні.

    FourCommissariatsWithRegisteredMoreThanAverageButExpensesLessThanAverage() {
        let MilitaryCommissariatWithEmployeeLessThat50Registered =
            document.querySelectorAll(".button-container .right-button");

        MilitaryCommissariatWithEmployeeLessThat50Registered.forEach(function (
            button
        ) {
            if (
                button.textContent.trim() ===
                "Вивести чотири військкомати з вищою кількістю приписаних, але з нижчими витратами на працівника порівняно з середнім"
            ) {
                button.addEventListener("click", function () {
                    let table = document.getElementById("myTable");
                    let tbody = table.querySelector("tbody");
                    // Отримуємо всі рядки таблиці в tbody
                    let rows = tbody.getElementsByTagName("tr");

                    // Змінні для збереження суми і кількості приписаних
                    let SumOfRegistered = 0;
                    let SumOfExpenses = 0;
                    let NumberOfCommissariats = 0;

                    // Проходимо всі рядки таблиці, починаючи з індексу 0
                    for (var i = 0; i < rows.length; i++) {
                        // Отримуємо комірку з витратами на працівника (індекс 5)
                        var RegisteredCell = rows[i].cells[5];
                        var expensesCell = rows[i].cells[3];

                        // Отримуємо значення витрат і конвертуємо його в число
                        var Registered = parseFloat(RegisteredCell.innerText);
                        // Отримуємо значення витрат і конвертуємо його в число
                        let expenses = parseFloat(expensesCell.innerText);

                        // Додаємо витрати до загальної суми
                        SumOfRegistered += Registered;
                        SumOfExpenses += expenses;

                        // Збільшуємо кількість військкоматів
                        NumberOfCommissariats++;
                    }

                    // Обчислюємо середню кількість приписаних
                    let averageRegistered =
                        SumOfRegistered / NumberOfCommissariats;
                    let averageExpenses = SumOfExpenses / NumberOfCommissariats;

                    averageExpenses = Math.floor(averageExpenses);
                    averageRegistered = Math.floor(averageRegistered);
                    console.log(averageExpenses);
                    console.log(averageRegistered);
                });
            }
        });
    }

    // TEST
    ReturnToInitialOrder() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        sortEmployeesButtons.forEach(function (button) {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Вивести загальний список") {
                button.addEventListener("click", function () {
                    let tableBody = document.querySelector("tbody");
                    let originalRows = Array.from(
                        tableBody.querySelectorAll("tr")
                    );
                    let tbody = document.createElement("tbody");

                    // Створити копію початкового вмісту таблиці
                    let rows = originalRows.map((row) => row);

                    let data = rows.map(function (row, index) {
                        let cells = Array.from(row.getElementsByTagName("td"));
                        return {
                            index,
                            value: Number(cells[0].textContent) || 0,
                        };
                    });

                    console.log("Дані перед сортуванням:", data);

                    function merge(left, right) {
                        let result = [];
                        let i = 0,
                            j = 0;

                        while (i < left.length && j < right.length) {
                            if (left[i].value < right[j].value) {
                                result.push(left[i++]);
                            } else {
                                result.push(right[j++]);
                            }
                        }

                        return result
                            .concat(left.slice(i))
                            .concat(right.slice(j));
                    }

                    function mergeSort(arr) {
                        if (arr.length <= 1) {
                            return arr;
                        }

                        let middle = Math.floor(arr.length / 2);
                        let left = arr.slice(0, middle);
                        let right = arr.slice(middle);

                        return merge(mergeSort(left), mergeSort(right));
                    }

                    let sortedData = mergeSort(data);

                    console.log("Відсортовані дані:", sortedData);

                    sortedData.forEach(function (item) {
                        tbody.appendChild(originalRows[item.index]);
                    });

                    // Замінити існуючий tableBody новим tbody
                    tableBody.parentNode.replaceChild(tbody, tableBody);
                });
            }
        });
    }

    ListCopy() {
        let TableCopy = document.getElementById("myTable");
        let TBodyCopy = TableCopy.querySelector("tbody");
        // Отримуємо всі рядки таблиці в tbody
        let RowsCopy = TableCopy.getElementsByTagName("tr");

        let TableDataCopy = {
            table: TableCopy.cloneNode(true), // Копія всієї таблиці
            tbody: TBodyCopy.cloneNode(true), // Копія тільки tbody
            rows: Array.from(RowsCopy).map((row) => row.cloneNode(true)), // Масив копій рядків
        };
        // Повернути об'єкт з копією таблиці та даними
        return TableDataCopy;
    }

}

const app = new MilitaryCommissariatApp();
app.SortEmployeesUsingMergeSort();
app.CalculateAverage();
app.MilitaryCommissariatWithEmployeeLessThat50Registered();
app.IdentifyCommissariatsWithHigherExpenses();
app.FourCommissariatsWithRegisteredMoreThanAverageButExpensesLessThanAverage();
app.ReturnToInitialOrder();
