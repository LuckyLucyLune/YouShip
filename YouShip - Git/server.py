from flask import Flask, request, jsonify
from flask_cors import CORS
from pytube import YouTube

app = Flask(__name__)
CORS(app)

# Replace the following with your desired values or use environment variables
CUSTOM_OUTPUT_PATH = 'Output\\'  # Customize this path as needed

@app.route('/receive_url', methods=['POST', 'OPTIONS'])
def receive_url():
    if request.method == 'OPTIONS':
        # Preflight request. Reply successfully:
        return 'OK'

    data = request.get_json()
    url = data['url']
    format = data['format']
    print(f"Received URL: {url}")
    print(f"Received Format: {format}")

    # Check if the URL is from YouTube
    if "youtube.com" not in url:
        response = "Invalid URL. Only YouTube links are accepted."
        print(response)
        return jsonify({'status': 'error', 'message': response})

    # Download the video
    if format == 'mp3':
        print("Downloading audio...")
        # Customize the output path for audio downloads
        YouTube(url).streams.filter(only_audio=True).first().download(output_path=f'{CUSTOM_OUTPUT_PATH}audios')
        print("Audio downloaded.")
    else:
        print("Downloading video...")
        # Customize the output path for video downloads
        YouTube(url).streams.get_highest_resolution().download(output_path=f'{CUSTOM_OUTPUT_PATH}videos')
        print("Video downloaded.")

    # Send response to indicate download is complete
    return jsonify({'status': 'success', 'message': 'URL received and video downloaded'})

if __name__ == '__main__':
    print("Starting the application...")
    # Customize the port as needed
    app.run(port=5000)
