### Chrome Extension

1. Open Chrome and navigate to chrome://extensions/.
2. Enable “Developer mode” in the top right corner.
3. Click “Load unpacked” and select the directory containing your extension files.

## Usage

1. Click on the YouShip extension icon in the Chrome toolbar.
2. Choose the desired format (MP3 or MP4).
3. Click “Send” to initiate the download.

## Configuration

### Flask Server Configuration:

- Set the Flask server IP and port in server.py and background.js file.
- Adjust the download paths, at server.py, and any other configurations if needed.

## Security Considerations

- Sanitize and validate user inputs to prevent security vulnerabilities.
- Implement error handling for various scenarios, including invalid URLs and download failures.

## Known Issues

- none

## Contributing

Pull requests and bug reports are welcome. Please follow the contributing guidelines.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Pytube
- Flask
- Chrome Extension API

## Contact

- Will Neto
- https://github.com/LuckyLucyLune
