export default class HttpBaseService {
    
    apiUrl = process.env.baseApiUrl;
    corsMode = process.env.corsMode;

    removeEntity(url) {
        var options = {
            method: 'DELETE',
            mode: 'cors'
        };

        return fetch(this.apiUrl + url, options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
        });
    }

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

    saveEntity(url, entitity) {
        var options = {
            method: entitity.Id == 0 ? 'POST' : 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(entitity),
            mode: 'cors'
        };

        return fetch(this.apiUrl + url, options)
        .then(response => response.json())
        .catch(error => {
            // Notify the error through Toastr
        });
    }
};
    