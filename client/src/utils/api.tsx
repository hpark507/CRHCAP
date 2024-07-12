"use client";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    console.log('backendUrl', backendUrl)
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
    // const response = await fetch(`${backendUrl}/users/${emplid}`, {
    //     method: 'DELETE',
    // });

    // return response;
}


// Get all symbols.
export const getSymbols = async () => {
    const response = await fetch(`${backendUrl}/symbols`);
    const data = await response.json();

    return data;
}

// Add Symbol.
export const addSymbol = async (symbolString: string) => {
    const response = await fetch(`${backendUrl}/symbols`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: symbolString})
    });

    return response;
}


// remove Symbol.
export const removeSymbol = async (symbol: string) => {
    const response = await fetch(`${backendUrl}/symbols/${symbol}`, {
        method: 'DELETE',
    });

    return response;
}


// Get all categories.
export const getCategories = async () => {
    const response = await fetch(`${backendUrl}/categories`);
    const data = await response.json();

    return data;
}

// Add Category.
export const addCategory = async (categoryString: string) => {
    const response = await fetch(`${backendUrl}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: categoryString})
    });

    return response;
}





export const getUserData = async (emplid: string) => {
    const response = await fetch(`${backendUrl}/users/${emplid}`);
    const data = await response.json();

    return data;
}

export const getPhrases = async (table_id: string) => {
    // const response = await fetch(`${backendUrl}/phrases?table_id=${table_id}`);
    
    const response = await fetch(`http://localhost:3001/phrases?table_id=${table_id}`);
    const data = await response.json();
    /**  Expected format from API
     * [
            {
                "id": "f1e0",
                "keyword": "tesad",
                "quote": "saasd",
                "reason": "asda",
                "categories": [
                "Culture"
                ],
                "weight": "2",
                "user_id": "23881380",
                "symbol": "GOOGL",
                "table_id": "23881380GOOGL"
            },
            {
                "id": "d6c7",
                "keyword": "Another Keyword",
                "quote": "asdas",
                "reason": "Reason2",
                "categories": [
                "Culture"
                ],
                "weight": "2",
                "user_id": "23881380",
                "symbol": "GOOGL",
                "table_id": "23881380GOOGL"
            }
        ]
     */

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
    // console.log(`http://localhost:3001/phrases?keyword=${keyword}&table_id${table_id}`);
    const response = await fetch(`http://localhost:3001/phrases?keyword=${keyword}&table_id=${table_id}`, {
        method: 'DELETE',
    });
    return response;
}


export const addToReport = async (reportData: any) => {
    console.log(backendUrl);
    // const response = await fetch(`${backendUrl}/phrases`, {
    const response = await fetch(`http://localhost:3001/phrases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
    });

    return response;

}

