import requests
from bs4 import BeautifulSoup
import json

# Function to scrape event data
def scrape_events(url):
    # Send a GET request to fetch the webpage
    response = requests.get(url)
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all event items
    events = soup.find_all('li', class_='event item')

    event_data = []

    # Loop through each event item and extract relevant data
    for event in events:
        
        if event["data-title"] == "Ilmoitetaan myöhemmin":
            continue
        
        start_time_text = event.find('div', class_='start-time').text.strip()
        
        # Split start_time_text to extract start and end time
        try:
            time_range = start_time_text.split('–')  # Splits "18.00–20.19" based on "–"
            start_time = time_range[0].split("klo")[1].strip()  # Start time
            end_time = time_range[1].strip()    # End time
        except IndexError:
            start_time = start_time_text
            end_time = None

        event_info = {
            "title": event['data-title'],
            "venue": event['data-venue'],
            "time": event['data-time'],
            "day": event['data-day'],
            "url": event.find('a')['href'],
            "image": event.find('div', class_='img')['style'].split('(')[1].split(')')[0],
            "duration": event.find('div', class_='duration').text.strip(),
            "start_time": start_time,
            "end_time": end_time  # New field for end time
        }
        
        # Append the event data to the list
        event_data.append(event_info)

    # Convert the event data list to JSON format
    return event_data

def save_to_file(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# Example usage
url = 'https://hiff.fi/rakkautta-anarkiaa/aikataulu/'  # Replace with the actual URL
events_data = scrape_events(url)
save_to_file(events_data, 'public/events_data.json')
