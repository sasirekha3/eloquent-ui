import Pagination from 'react-bootstrap/esm/Pagination';
import Table from 'react-bootstrap/Table';
import WordTable from '../model/WordTable';
import ResultItem from './ResultItem';

function ResultTable(props: { wordResults: WordTable[] }) {


    return (
        <div className="my-word">
            <Table striped>
                <tbody>
                    {
                        props.wordResults.map(resultItem =>
                            <tr>
                                <ResultItem result={resultItem} />
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Pagination className="my-word paginate">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

export default ResultTable;



