export const parseHeaders = (request: Request): Record<string, string> => {
    let headers: Record<string, string> = {};
    for (let [name, value] of request.headers.entries()) {
        headers[name] = value;
    }
    return headers;
};

export const parseRequest = (request: Request): { query: Record<string, string>, headers: Record<string, string> } => {
    let query = parseQuery(request);
    let headers = parseHeaders(request);
    return { query, headers };
};


export const parseQuery = (request: Request): Record<string, string> => {
    const url = new URL(request.url.toString()); // Convert Location to URL
    const query = parseSearchParams(url);
    return query;
};

export const parseSearchParams = (url: URL): Record<string, string> => {
    const searchParams = new URLSearchParams(url.search);
    let data: Record<string, string> = {};
    for (let [name, value] of searchParams.entries()) {
        data[name] = value;
    }
    return data;
};