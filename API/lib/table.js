const dummyData = 
[
    {
        "id": 0,
        "meal": "Chicken Salad",
        "protein": 20,
        "carbohydrates": 15,
        "fats": 8 
    
    },
    {
        "id": 1,
        "meal": "Ceasar Salad",
        "protein": 15,
        "carbohydrates": 25,
        "fats": 10
    }
]


class MacroTable{
    
    constructor(){
        this.data = dummyData;
        this.idNum = 2;
    }
    add(meal){

        // console.log(meal)
        // console.log(idNum)
        const id = this.idNum;
        this.idNum++;
        this.data.push({...meal, id});
    }
    delete(selected){
        var positionID = selected.id;
        var deleteThisOne = null;
        for(var i = 0; i < data.length; i++){
            if (data[i].id === positionID){
                deleteThisOne = i;
            }
        }
        data.splice(deleteThisOne, 1);
    }
    get(){
        return this.data;
    }
}

const macroTable = new MacroTable();

module.exports = macroTable;