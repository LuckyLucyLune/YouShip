var copyUrl = false;
var format = 'mp4';  // Default format

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "start") {
    copyUrl = true;
    format = request.format;  // Get the format from the message
    copyCurrentUrl();  // Call the function directly here
  } else {
    copyUrl = false;
  }
});

function copyCurrentUrl() {
  if (copyUrl) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      // Replace the following URL with your server endpoint
      xhr.open("POST", "http://add-IP:5000/receive_url", true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
              // Notify that the download is complete
              chrome.runtime.sendMessage({ action: 'downloadComplete' });
            } else {
              console.error('Error:', response.message);
            }
          } else {
            console.error('Error:', xhr.statusText);
          }

          // Reset the copyUrl flag after handling the response
          copyUrl = false;
        }
      };

      xhr.send(JSON.stringify({
        url: url,
        format: format  // Include the format in the JSON data
      }));
    });
  }
}
