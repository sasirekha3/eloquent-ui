import secrets from "../secrets.json";

class Query {
    possibleValues?: string[];
    wordString?: string;
    emailId: string;
    skip: number;

    constructor(emailId: string, possibleValues?: string[], wordString?: string, skip?: number) {
        this.emailId = emailId;
        this.possibleValues = possibleValues;
        this.wordString = wordString;
        this.skip = (skip === undefined || skip === null) ? 0 : skip;
    }

    get() {
        // let query: any = {
        //     emailId: this.emailId
        // };
        let query: any = [
            {
                $search: {
                    index: 'standardsearchIndex',
                    compound: {
                        "filter": [{
                            "text": {
                                "query": this.emailId,
                                "path": "emailId"
                            }
                        }],
                    }
                }
            },
            {
                $skip: this.skip
            },
            {
                $limit: secrets?.paginationSize
            }
        ];
        // if(this.possibleValues !== null && this.possibleValues !== undefined) {
        //     query.categories = {
        //         $all: this.possibleValues
        //     };
        // }
        if (this.possibleValues !== null && this.possibleValues !== undefined) {
            query.$search.compound.filter.push({
                "keyword": {
                    "query": this.possibleValues,
                    "path": "categories"
                }
            });
        }
        if (this.wordString !== null && this.wordString !== undefined) {
            query.$search.compound.must = [
                {
                    autocomplete: {
                        path: 'word',
                        query: this.wordString
                    }
                }
            ];
        }


        return query;
    }

}


export default Query;