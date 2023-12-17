document.querySelectorAll('.btn-check').forEach(function(radio) {
  radio.addEventListener('click', function() {
    // Reset all to default color
    document.querySelectorAll('label.btn').forEach(function(label) {
      label.style.backgroundColor = '#ff0000';
      label.style.borderColor = '#ff0000';
    });

    // Change color of checked button
    if (this.classList.contains('active')) {
      this.checked = false;
      this.classList.remove('active');
      this.nextElementSibling.style.backgroundColor = '#ff0000'; // Change to the color you want
      this.nextElementSibling.style.borderColor = '#ff0000'; // Change to the color you want
    } else {
      this.classList.add('active');
      this.nextElementSibling.style.backgroundColor = '#851717'; // Change to the color you want
      this.nextElementSibling.style.borderColor = '#851717'; // Change to the color you want
    }
  });
});

document.getElementById('start').addEventListener('click', function() {
  // Show loading GIF
  document.getElementById('loading').style.display = 'block';
  // Hide the completed message if it's visible
  document.getElementById('completed').style.display = 'none';

  var format;
  if (document.getElementById('mp3Option').classList.contains('active')) {
    format = 'mp3';
  } else if (document.getElementById('mp4Option').classList.contains('active')) {
    format = 'mp4';
  }

  // Send message to background script
  chrome.runtime.sendMessage({
    action: 'start',
    format: format
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'downloadComplete') {
    // Hide loading GIF when download is complete
    document.getElementById('loading').style.display = 'none';
    // Show the completed message
    document.getElementById('completed').style.display = 'block';
    // Hide the completed message after 2 seconds
    setTimeout(function() {
      document.getElementById('completed').style.display = 'none';
    }, 2000);
  }
});

