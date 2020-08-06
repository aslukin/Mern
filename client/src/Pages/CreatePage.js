import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
    
    
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {request} = useHttp();
    const[link, setLink] = useState('');


    useEffect(() => {
        window.M.updateTextFields() 
    })

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', 
                {
                    from: link,
                    userId: auth.userId
                },
                {
                  Authorization: `Bearer ${auth.tocken}`
                }); 
                history.push(`/detail/${data.link._id}`)
            } catch (error) {  }
        }
    }

    return (
        <div className="col s8 offset-s2">
            <div className="input-field">
                <input
                    placeholder="from"
                    id="link"
                    type="text"
                    className="create-input"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler }
                />
                <label htmlFor="from">Your sourceLink</label>
            </div>
        </div>
    );
}