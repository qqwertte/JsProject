
class MilitaryCommissariat{
    Number;
    MilitaryCommissariatName;
    #CostsPerEmployee;    //private field
    #AmountOfEmployee;    //private field
    #AmountOfRegistered;  //private field
    constructor(
        number = 0,
        CommissariatName = "",
        CostsPerEmployee = 0,
        AmountOfEmployee = 0,
        AmountOfRegistered = 0
    ) {
        this.Number = number;
        this.MilitaryCommissariatName = CommissariatName;
        this.#CostsPerEmployee = CostsPerEmployee;
        this.#AmountOfEmployee = AmountOfEmployee;
        this.#AmountOfRegistered = AmountOfRegistered;
    }

    copy(){
        const copyInstance = new MilitaryCommissariat();
        copyInstance.Number = this.Number;
        copyInstance.MilitaryCommissariatName = this.MilitaryCommissariatName;
        copyInstance.#CostsPerEmployee = this.#CostsPerEmployee;
        copyInstance.#AmountOfEmployee = this.#AmountOfEmployee;
        copyInstance.#AmountOfRegistered = this.#AmountOfRegistered;
        return copyInstance;
    }
    GetCostsPerEmployee(){
        return this.#CostsPerEmployee;
    }
    SetCostsPerEmployee(value){
        this.#CostsPerEmployee = value;
    }
    GetAmountOfEmployee(){
        return this.#AmountOfEmployee;
    }
    SetAmountOfEmployee(value){
        this.#AmountOfEmployee = value;
    }
    SetAmountOfRegistered(value){
        this.#AmountOfRegistered = value;
    }
    GetAmountOfRegistered(){
        return this.#AmountOfRegistered;
    }
}

