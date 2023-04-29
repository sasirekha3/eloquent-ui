import CategoryType from "./CategoryType";
import Result from "./Result";

class CategoryTable implements Result {
    category: string;
    type: CategoryType;
    possibleValues?: string[];
    emailId: string;

    constructor(category: string, type: CategoryType, emailId: string, possibleValues?: string[]){
        this.category = category;
        this.type = type;
        this.possibleValues = possibleValues;
        this.emailId = emailId;
    }

    toJson(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}

export default CategoryTable;