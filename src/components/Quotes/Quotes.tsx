import {useCallback, useEffect, useState} from "react";
import {ApiQuotes, Quote} from "../../types";
import axiosApi from "../../axiosApi";
import {Link} from "react-router-dom";
const Quotes = () =>
    {const [quotes, setQuotes] = useState<Quote[]>([]);

    const fetchQuotes = useCallback( async () => {
        const response = await axiosApi.get<ApiQuotes | null>('/quote.json');
        const quote = response.data;
        if (quote){
            setQuotes(Object.keys(quote).map(id => ({
                ...quote[id],
                id
            })));
        } else{
            setQuotes([])
        }
    }, []);

    const fetchDelete = async (id:string | undefined) => {
        const response = await axiosApi.delete<ApiQuotes | null>('/quote/' + id + '.json');
        const quote = response.data;
        if (quote){
            setQuotes(Object.keys(quote).map(id => ({
                ...quote[id],
                id
            })));
        } else{
            setQuotes([])
        }

        void fetchQuotes()
    };

    useEffect(() => {
        void fetchQuotes();
    },[fetchQuotes]);
    return (
            <div className="d-flex justify-content-between p-3">
                <div>
                    <ul>
                        <li>All</li>
                        <li>Star Wars</li>
                        <li>Famous people</li>
                        <li>Saying</li>
                        <li>Humor</li>
                        <li>Motivation</li>
                    </ul>
                </div>
                <div>
                {quotes.map(quote => (
                    <div key={quote.id} className="card text-lg-start mb-3"
                         style={{maxWidth: '800px', margin: "auto"}}>
                        <div
                            className="card-body d-flex justify-content-between">
                            <div>
                                <p>"{quote.quote}"</p>
                                <p>-{quote.author}</p>
                            </div>
                            <div className="mb-auto ms-auto d-flex gap-2 align-items-center">
                                <button className="btn btn-danger" onClick={() => fetchDelete(quote.id)}>X</button>
                                <Link to={'/posts/' + quote.id + '/edit'} className="btn btn-success">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
    );
};

export default Quotes;