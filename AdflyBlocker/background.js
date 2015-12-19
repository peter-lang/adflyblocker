var url_has_scheme = /^https?:\/\//i

function createListener(regexp) {
    return function(details) {

        if (!regexp.test(details.url))
            return;

        var new_url = regexp.exec(details.url)[1];
        if (!url_has_scheme.test(new_url))
            new_url = 'http://' + new_url;
        
        return {
            redirectUrl: new_url
        };        
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    createListener(/linkbucks\.com.*\/url\/(.+)$/i),
    {
        urls: [
            "*://*.linkbucks.com/*"
        ]
    },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
    createListener(/adf\.ly\/\d+\/(.+)$/i),
    {
        urls: [
            "*://adf.ly/*"
        ]
    },
    ["blocking"]
);