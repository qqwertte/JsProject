class MilitaryCommissariatApp extends MilitaryCommissariat {
    constructor(data) {

        super(); // Виклик конструктора базового класу
        // Додаткові ініціалізації, якщо потрібн

        this.initialData = JSON.parse(localStorage.getItem("data")) || data;
        this.data = JSON.parse(localStorage.getItem("data")) || data;

        this.renderList(this.data);
    }

    //a.	Алгоритмом злиття відсортувати записи за кількістю працівників в військкоматі
    SortEmployeesUsingMergeSort() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        sortEmployeesButtons.forEach((button) => {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Сортувати за к-стю працівників") {
                button.addEventListener("click", () => {

                    console.log("Дані перед сортуванням:", data);

                    function merge(left, right) {
                        let result = [];
                        let i = 0,
                            j = 0;

                        while (i < left.length && j < right.length) {
                            if (parseInt(left[i][4]) < parseInt(right[j][4])) {
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

                    let sortedData = mergeSort(this.data);

                    this.data = sortedData;

                    console.log("Відсортовані дані:", sortedData);

                    this.renderList(sortedData);

                });
            }
        });
    }
    CalculateAverage() {
        let calculateAverageButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        calculateAverageButtons.forEach((button) => {
            if (
                button.textContent.trim() === "Середні витрати по військкоматах"
            ) {
                button.addEventListener("click", () => {
                    // Змінні для збереження суми і кількості військкоматів
                    let totalExpenses = 0;
                    let numberOfVoyenkomats = 0;

                    // Проходимо всі рядки таблиці, починаючи з індексу 0
                    for (let i = 0; i < this.initialData.length; i++) {
                        // Отримуємо комірку з витратами на працівника (індекс 3)
                        let expensesCell = this.initialData[i][3];

                        // Отримуємо значення витрат і конвертуємо його в число
                        let expenses = parseFloat(expensesCell);

                        // Додаємо витрати до загальної суми
                        totalExpenses += expenses;

                        // Збільшуємо кількість військкоматів
                        numberOfVoyenkomats++;
                    }

                    // Обчислюємо середні витрати
                    let averageExpenses =numberOfVoyenkomats === 0 ? 0 : totalExpenses / numberOfVoyenkomats;
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

        MilitaryCommissariatWithEmployeeLessThat50Registered.forEach(
            (button) => {
                // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
                let buttonText = button.textContent.trim();

                // Порівняйте текст кнопки з використанням умовного оператора if
                if (buttonText === "Працівників менше 50% к-сті приписаних") {
                    button.addEventListener("click", () => {
                        // Фільтрація рядків за умовою "Працівників менше 50% к-сті приписаних"
                        let filteredRows = this.initialData.filter(function (row) {
                            let numEmployees = parseInt(row[4], 10) || 0;
                            let numAssigned = parseInt(row[5], 10) || 0;

                            // Умова для фільтрації
                            return numEmployees < 0.5 * numAssigned;
                        });

                        this.data =filteredRows;

                        this.renderList(filteredRows);
                    });
                }
            }
        );
    }

    IdentifyCommissariatsWithHigherExpenses() {
        const button = document.querySelector("#expenses-more-than-avarage");

        button.addEventListener("click", () => {
            // Змінні для збереження суми і кількості військкоматів
            let totalExpenses = 0;
            let numberOfCommissariats = 0;

            console.log("asdasd");

            // Проходимо всі рядки таблиці, починаючи з індексу 0
            for (let i = 0; i < this.initialData.length; i++) {
                // Отримуємо комірку з витратами на працівника (індекс 3)
                let expensesCell = this.initialData[i][3];

                // Отримуємо значення витрат і конвертуємо його в число
                let expenses = parseFloat(expensesCell);

                // Додаємо витрати до загальної суми
                totalExpenses += expenses;

                // Збільшуємо кількість військкоматів
                numberOfCommissariats++;
            }

            // Обчислюємо середні витрати
            let averageExpenses = totalExpenses / numberOfCommissariats;
            averageExpenses = averageExpenses.toFixed(3);

            // Фільтрація військкоматів з витратами більше за середні
            let higherExpensesCommissariats = Array.from(this.initialData).filter(
                function (row) {
                    let expenses = parseFloat(row[3]);
                    return expenses > averageExpenses;
                }
            );

            this.data = higherExpensesCommissariats;
            this.renderList(higherExpensesCommissariats);
        });
    }

    //e.	Вивести 4 військкомати, в яких кількість приписаних  більша середньої, проте витрати на працівника менші за середні.

    FourCommissariatsWithRegisteredMoreThanAverageButExpensesLessThanAverage() {
        const button = document.querySelector("#show-four");

        button.addEventListener("click", () => {
            // Змінні для збереження суми і кількості приписаних
            let SumOfRegistered = 0;
            let SumOfExpenses = 0;
            let NumberOfCommissariats = 0;

            // Проходимо всі рядки таблиці, починаючи з індексу 0
            for (let i = 0; i < this.initialData.length; i++) {
                // Отримуємо комірку з витратами на працівника (індекс 5)
                let RegisteredCell = this.initialData[i][5];
                let expensesCell = this.initialData[i][3];

                // Отримуємо значення витрат і конвертуємо його в число
                let Registered = parseFloat(RegisteredCell);
                // Отримуємо значення витрат і конвертуємо його в число
                let expenses = parseFloat(expensesCell);

                // Додаємо витрати до загальної суми
                SumOfRegistered += Registered;
                SumOfExpenses += expenses;

                // Збільшуємо кількість військкоматів
                NumberOfCommissariats++;
            }

            // Обчислюємо середню кількість приписаних
            let averageRegistered = SumOfRegistered / NumberOfCommissariats;
            let averageExpenses = SumOfExpenses / NumberOfCommissariats;

            averageExpenses = Math.floor(averageExpenses);
            averageRegistered = Math.floor(averageRegistered);

            const newData = this.initialData
                .filter(
                    (elem) =>
                        parseInt(elem[5]) > averageRegistered &&
                        parseInt(elem[3]) < averageExpenses
                )
                .slice(0, 4);

            console.log(newData);

            console.log(averageExpenses, averageRegistered);

            this.data = newData;
            this.renderList(newData);
        });
    }

    // TEST
    ReturnToInitialOrder() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        sortEmployeesButtons.forEach((button) => {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Вивести початковий список") {
                button.addEventListener("click", () => {
                    this.data = this.initialData;
                    this.renderList(this.data);
                });
            }
        });
    }

    saveDataAsTxtFile() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        sortEmployeesButtons.forEach((button) => {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Вивести список, який на екрані у файл") {
                button.addEventListener("click", () => {
                    try{
                        if (this.data.length === 0) {
                            throw `Empty list!!!`;
                        }

                        // Перетворення даних у рядок
                        const textToSave = this.data
                            .map((row) => row.join(", "))
                            .join("\n");

                        // Створення нового Blob (бінарного великого об'єкта) з текстовими даними
                        const blob = new Blob([textToSave], { type: "text/plain" });

                        // Створення посилання для завантаження
                        const downloadLink = document.createElement("a");
                        downloadLink.download = "data.txt";
                        downloadLink.href = window.URL.createObjectURL(blob);
                        downloadLink.style.display = "none";

                        // Додавання посилання до DOM та імітація кліку
                        document.body.appendChild(downloadLink);
                        downloadLink.click();

                        // Видалення посилання після завантаження
                        document.body.removeChild(downloadLink);

                    }catch(error) {
                        Toastify({
                            text: error,
                            duration: 3000
                        }).showToast();
                        return;
                    }
                });
            }
        });
    }

    addNewCommissariat() {
        let sortEmployeesButtons = document.querySelectorAll(
            ".button-container .right-button"
        );

        document.querySelector(".close").onclick = function () {
            document
                .getElementById("addCommissariat")
                .classList.remove("active");
        };

        const commissariatForm = document.querySelector("#addCommissariatForm");

        commissariatForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const newCommissariatData = new FormData(commissariatForm);

            const newCommissariat = [];
            try{
                for (const [key, value] of newCommissariatData) {
                    let nameregex = /\b[^\d\W]+\b/g;


                    if(!value){
                        throw `field: ${key} is required!`;
                    }
                    if(key === 'number' && !this.isNumeric(value)){
                        throw `field number should have only numbers!`;
                    }

                    if(key === 'name' && !nameregex.test(value) ){
                        throw `field name should have only letters!`;
                    }

                    newCommissariat.push(value);
                }

                commissariatForm.reset();

            }catch (error){
                Toastify({
                    text: error,
                    duration: 3000
                }).showToast();
                return;
            }



            this.initialData.push(newCommissariat);
            this.data = JSON.parse(JSON.stringify(this.initialData));

            console.log(this.data);

            this.renderList(this.initialData);

            localStorage.setItem("data", JSON.stringify(this.initialData));
        });

        // Закриття модального вікна при кліку за його межами
        window.onclick = function (event) {
            let modal = document.getElementById("addCommissariat");
            if (event.target == modal) {
                modal.classList.remove("active");
            }
        };

        sortEmployeesButtons.forEach((button) => {
            // Виберіть текст кнопки та видаліть пробіли на початку та в кінці
            let buttonText = button.textContent.trim();

            // Порівняйте текст кнопки з використанням умовного оператора if
            if (buttonText === "Додати Військкомат") {
                button.addEventListener("click", () => {
                    document
                        .getElementById("addCommissariat")
                        .classList.add("active");
                });
            }
        });
    }

    uploadFile() {
        const input = document.querySelector("#file-upload");
        input.addEventListener("change", (event) => {
            let files = event.target.files; // Get the selected files
            try{
                if (files.length > 0) {
                    let extension = files[0].type;
                    if(extension !== 'text/plain'){
                        throw 'Invalid file type!';
                    }
                    let file = files[0]; // Get the first file (if multiple are selected)

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const content = e.target.result;
                        const lines = content.split(/\r\n|\n/); // Split by new line
                        const parsedData = lines.map((line) => line.split(",")); // Split each line by comma

                        console.log(parsedData);

                        // Display or process the parsed data
                        this.data = parsedData;
                        this.initialData = parsedData;
                        localStorage.setItem("data", JSON.stringify(parsedData));
                        this.renderList(this.data);
                    };
                    reader.readAsText(file);
                } else {
                    throw "No file selected";
                    fileInfo.innerHTML = "No file selected";
                }
            } catch (error){
                Toastify({
                    text: error,
                    duration: 3000
                }).showToast();
            }
        });
    }

    // render list
    renderList(list) {
            let TableCopy = document.getElementById("myTable");
            let TBodyCopy = TableCopy.querySelector("tbody");

            const deleteItem = (number) => {
                this.initialData = this.initialData.filter(item => item[0] !== number);
                this.data = JSON.parse(JSON.stringify(this.initialData));

                localStorage.setItem("data", JSON.stringify(this.initialData));
                this.renderList(this.initialData);
            }

            TBodyCopy.innerHTML = "";

            for (let item of list) {
                // const { number, commissariat, address, expences, workersAmount, registeredAmount } = item;
                let tr = document.createElement("tr");
                for (let property of item) {
                    let td = document.createElement("td");
                    td.innerText = property;
                    tr.appendChild(td);
                }
                let td = document.createElement("td");
                td.classList.add("small")
                let button = document.createElement("button");
                let img = document.createElement("img");
                img.src = "./trash.svg";
                button.classList.add("delete");
                button.addEventListener("click", () => deleteItem(item[0]));
                button.append(img);
                td.append(button);
                tr.append(td);
                TBodyCopy.appendChild(tr);
            }
    }

    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (parseFloat alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
}

//data to first screen table
const data = [
];

const app = new MilitaryCommissariatApp(data);
app.SortEmployeesUsingMergeSort();
app.CalculateAverage();
app.MilitaryCommissariatWithEmployeeLessThat50Registered();
app.IdentifyCommissariatsWithHigherExpenses();
app.FourCommissariatsWithRegisteredMoreThanAverageButExpensesLessThanAverage();
app.ReturnToInitialOrder();
app.saveDataAsTxtFile();
app.addNewCommissariat();
app.uploadFile();
