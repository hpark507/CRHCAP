const backendUrl = 'https://crvmb5tnnr.us-east-1.awsapprunner.com/crhcap'


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
    const response = await fetch(`${backendUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    return response;
}

export const update_user_stock = async (stock_names: string[], emplid: string) => {
    const response = await fetch(`${backendUrl}/users_stock`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({stock_names: stock_names, emplid: emplid})
    });
    return response;
}

// remove User.
export const removeUser = async (emplid: string) => {
    const response = await fetch(`${backendUrl}/users?emplid=${emplid}`, {
        method: 'DELETE',
    });

    return response;
}

export const getUser = async (emplid: string) => {
    const response = await fetch(`${backendUrl}/users/${emplid}`);
    const data = await response.json();

    return data;
}


export const addSymbolTab = async (symbol: string, tab: string) => {
    const response = await fetch(`${backendUrl}/ticket?ticket_str=${symbol}&tab=${tab}`, {
        method: 'POST',
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

export const getPhrases = async (table_name: string) => {
    // const response = await fetch(`${backendUrl}/phrases?table_name=${table_name}`);
    
    const response = await fetch(`${backendUrl}/phrases?table_name=${table_name}`);
    const data = await response.json();

    return data;
}


export const removePhrase = async (phraseId: string) => {
    const response = await fetch(`${backendUrl}/phrases/${phraseId}`, {
        method: 'DELETE',
    });
 
    return response;
}

export const removePhraseKeywordAndTable = async (keyword: string, table_name: string) => {
    const response = await fetch(`${backendUrl}/phrases?keyword=${keyword}&table_name=${table_name}`, {
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
    const response = await fetch(`${backendUrl}/category?name=${categoryString}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}


export const removeCategory = async (category: string) => {
    const response = await fetch(`${backendUrl}/category?name=${category}`, {
        method: 'DELETE',
    });

    return response;
}



