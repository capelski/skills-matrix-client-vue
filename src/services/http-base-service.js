export default class HttpBaseService {
    
    apiUrl = process.env.baseApiUrl;
    corsMode = process.env.corsMode;

    getRequest(url, defaultValue) {        
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        
        return fetch(this.apiUrl + url, options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
            return defaultValue;
        });
    }
};
    