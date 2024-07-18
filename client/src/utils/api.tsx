let backendUrl = process.env.API_BACKEND;
backendUrl = 'http://127.0.0.1:8000/crhcap';


export const getUsers = async () => {
    /** Expected format from API
     * {
        "23881380": {
            "id": 1,
            "surname": "wang",
            "emplid": "23881380",
            "class_code": "CSE 110",
            "score": 0
        }
        }
     */
    const response = await fetch(`${backendUrl}/users`);
    const data = await response.json();

    return data;
}


// Add User.
export const addUser = async (userData: any) => {
    console.log(process.env)
    console.log('userData', userData)
    
    const response = await fetch(`${backendUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    return response;
}


// remove User.
export const removeUser = async (emplid: string) => {
    console.log('doesnt really work yet')
    const response = await fetch(`${backendUrl}/users?emplid=${emplid}`, {
        method: 'DELETE',
    });

    return response;
}


// Get all symbols.
export const getSymbols = async () => {
    const response = await fetch(`${backendUrl}/ticket`);
    const data = await response.json();

    return data;
}

// Add Symbol.
export const addSymbol = async (symbolString: string) => {
    const response = await fetch(`${backendUrl}/ticket?ticket_str=${symbolString}`, {
        method: 'POST',
    });

    return response;
}


// remove Symbol.
export const removeSymbol = async (symbol: string) => {
    const response = await fetch(`${backendUrl}/ticket?ticket_str=${symbol}`, {
        method: 'DELETE',
    });

    return response;
}



export const getUserData = async (emplid: string) => {
    console.log(`${backendUrl}/users/${emplid}`)
    const response = await fetch(`${backendUrl}/users/${emplid}`);
    const data = await response.json();

    return data;
}

export const getPhrases = async (table_id: string) => {
    // const response = await fetch(`${backendUrl}/phrases?table_id=${table_id}`);
    
    const response = await fetch(`${backendUrl}/phrases?table_id=${table_id}`);
    const data = await response.json();

    return data;
}


export const removePhrase = async (phraseId: string) => {
    const response = await fetch(`${backendUrl}/phrases/${phraseId}`, {
        method: 'DELETE',
    });
 
    return response;
}

export const removePhraseKeywordAndTable = async (keyword: string, table_id: string) => {
    // console.log(' ===== Remove Phrase =====')
    // console.log(`${backendUrl}/phrases?keyword=${keyword}&table_id${table_id}`);
    const response = await fetch(`${backendUrl}/phrases?keyword=${keyword}&table_id=${table_id}`, {
        method: 'DELETE',
    });
    return response;
}


export const addToReport = async (reportData: any) => {
    console.log(backendUrl);
    // const response = await fetch(`${backendUrl}/phrases`, {
    const response = await fetch(`${backendUrl}/phrases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
    });

    return response;

}


// Categories adding removing


// Get all categories.
export const getCategories = async () => {
    const response = await fetch(`${backendUrl}/category`);
    const data = await response.json();

    return data;
}

// Add Category.
export const addCategory = async (categoryString: string) => {
    const response = await fetch(`${backendUrl}/category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: categoryString})
    });

    return response;
}


export const removeCategory = async (category: string) => {
    const response = await fetch(`${backendUrl}/category?name=${category}`, {
        method: 'DELETE',
    });

    return response;
}



