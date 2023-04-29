import { isConstructorDeclaration } from "typescript";

enum CategoryType {
    Integer = "Integer",
    String = "String"
}

namespace CategoryType {
    export function parse(str: string): CategoryType {
        if(str === "Integer"){
            return CategoryType.Integer;
        }
        
        return CategoryType.String;
    }
}

export default CategoryType;