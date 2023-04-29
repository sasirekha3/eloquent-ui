import WordTable from "../model/WordTable";
import { Link } from "react-router-dom";

function ResultItem(props: {result: WordTable}) {

    return(
        <div className="my-result-item" id={props.result.word}>
            <Link to={"/word?wordString=" + props.result.word}>{props.result.word}</Link>
        </div>
    );
}

export default ResultItem;