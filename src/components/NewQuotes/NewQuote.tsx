import React, {useState} from 'react';
import {CATEGORY} from "../../constants";
import {ApiQuote, ApiQuotes, Quote} from "../../types";
import axiosApi from "../../axiosApi";
import {useParams} from "react-router-dom";

const NewQuote:React.FC = () => {

    const params = useParams();

    const [quotes, setQuotes] = useState<Quote[]>([]);


        const [newQuote, setNewQuote] = useState<ApiQuote>({
        id:Math.random().toString(),
        author: '',
        category: '',
        quote: ''
    });

    const onSubmitForm = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosApi.post('/quote.json', {...newQuote})
        } finally {

        }
    }

    const onChange = (e:React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewQuote(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onPut = (e:React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setQuotes(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const EditQuote = async (id:string) => {
        const response = await axiosApi.put<ApiQuotes | null>('/quote/' + id + '.json');
        const quote = response.data;
        if (quote){
            setQuotes(Object.keys(quote).map(id => ({
                ...quote[id],
                id
            })));
        } else{
            setQuotes([])
        }
    }

    const putQuote = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await axiosApi.put('/quote/' + params.id + '.json', {...quotes})
        } finally {

        }
    }

    return (
        <>
            <form className="text-lg-start container-fluid pb-5" onSubmit={params.id ? putQuote : onSubmitForm}>
                <h2>{params.id ? 'Edit post' : 'New post'}</h2>
                <div className="form-group mb-5">
                    <label className="mb-3">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="form-control"
                        required
                        value={params.id ? quotes.category : newQuote.category}
                        onChange={params.id ? onPut : onChange}
                    >
                        <option value="">category not selected</option>
                        {CATEGORY.map(category => (
                            <option key={category.value} value={category.value} id={category.value}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-5">
                    <label className="mb-3">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        className="form-control"
                        required
                        value={params.id ? quotes.author : newQuote.author}
                        onChange={params.id ? onPut : onChange}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-5">
                    <label className="mb-3">Quote text</label>
                    <textarea
                        name="quote"
                        id="quote"
                        cols={10}
                        rows={5}
                        value={params.id ? quotes.quote : newQuote.quote}
                        onChange={params.id ? onPut : onChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success" onClick={() => EditQuote}>Save</button>
            </form>
        </>
    );
};

export default NewQuote;