import Result from "./Result";

class WordTable implements Result {
    word: string;
    myDefinition: string;
    myExamples: string[];
    categories: string[];
    emailId: string;
    pageNumber?: number;

    constructor(word: string, myDefinition: string, myExamples: string[], categories: string[], emailId: string, pageNumber?: number){
        this.word = word;
        this.myDefinition = myDefinition;
        this.myExamples = myExamples;
        this.categories = categories;
        this.emailId = emailId;
        this.pageNumber = pageNumber;

        if(pageNumber === undefined || pageNumber === null){
            if(this.categories !== null && this.categories !== undefined && this.categories.includes("MyBookPage")){
                let i = this.categories.indexOf("MyBookPage");
                this.categories.splice(i);
            }
        }
    }

    parseMongoDbResult(jsonString: String): WordTable {
        return new WordTable("test", "test def", ["ex1", "ex2"], ["c1", "c2"], "s@k.com", 34);
    }

    toJson(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

}

export default WordTable;