export default class HttpBaseService {
    
    apiUrl = process.env.baseApiUrl;
    corsMode = process.env.corsMode;

    getRequest(url, parameters, defaultValue) {        
        var options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        if (parameters) {
            url += '?';
            for (var key in parameters) {
                var parameter = parameters[key];
                if (parameter) {
                    url += (key + '=' + encodeURIComponent(parameter) + '&');
                }
            }
            url = url.substring(0, url.length - 1);
        }
        
        return fetch(this.apiUrl + url, options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
            return defaultValue;
        });
    }
};
    