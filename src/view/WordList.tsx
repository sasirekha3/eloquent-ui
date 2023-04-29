import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyMongoClient from '../controller/MyMongoClient';
import Query from '../model/Query';
import WordTable from '../model/WordTable';
import ResultTable from './ResultTable';
import secrets from '../secrets.json';

const mongoClient = MyMongoClient.getInstance();



function WordList() {

    let results: WordTable[] = [];

    let callback = (word: WordTable | null) => {
        console.log(word)
        if(word !== null) {
            results.push(word as WordTable);
        }
    }

    mongoClient.searchWords(new Query(secrets?.testerEmailId), callback);
    
    return(
        <div className='my-wordlist'>
            <br/>
            <Form className="d-flex my-search">
              <Form.Control
                type="search"
                placeholder="Search Word"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" >Search</Button>
            </Form>
            <br/>
            <ResultTable wordResults={results} />
        </div>
    );
}

export default WordList;

