# Twitter (X) Trends Scraper

This project scrapes the trending hashtags from Twitter using Selenium WebDriver and ProxyMesh for anonymity. The scraper logs in to Twitter, extracts the top trending hashtags from whats Happening section, and saves them to a MongoDB database.

## Features

- **Scrape Trending Hashtags**: Uses Selenium WebDriver to interact with Twitter and extract trending hashtags.
- **Proxy Integration**: Uses ProxyMesh to rotate IPs for anonymity and bypass restrictions.
- **Data Storage**: Saves the scraped data to a MongoDB database with relevant metadata (e.g., IP address, timestamp).
- **Express Backend**: Exposes API endpoints to trigger the scraper and fetch the latest trends.

## Technologies Used

- **Selenium WebDriver**: Automates browser interactions to scrape data from the web.
- **ProxyMesh**: Provides proxy servers to hide the origin IP during the scraping process.
- **Express.js**: Web framework to handle HTTP requests and serve the API.
- **MongoDB**: NoSQL database to store the scraped data.
- **dotenv**: Loads environment variables from a `.env` file.

## Prerequisites

- Node.js installed on your machine.
- MongoDB database running locally or remotely.
- ProxyMesh account (for proxy rotation).

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/07Akashh/X_Trends-Scrapper.git
cd X_Trends-Scrapper.git
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```env
PORT = 3001
MONGO_URI = <MONGO DB URL>
X_USERNAME = twitter user name
X_PASSWORD = twitter password
X_EMAIL = twitter email
PROXY_URL = http_proxy=http://rahulk.softdev:KfdfX2fz6uuYT8@38.55.73.47:31280    # use this proxy url
```

### 4. Run the application:

```bash
npm start
```

This will start the Express server on port `3000` (or the port you specified in the `.env` file).

### 5. Access the application:

- **Trigger the Scraping**: You can trigger the scraping by making a POST request to `/api/trends`.
- **Get Latest Data**: Fetch the latest scraped trends by sending a GET request to `/api/latest`.

Example of the API response:

```json
{
    "_id": "e743831b-d51b-414f-981a-75860cff366a",
    "trend1": "#manusmriti_ka_klank",
    "trend2": "#ipoallotement",
    "trend3": "#MerryChristmas",
    "trend4": "#NewYear2024",
    "datetime": "2024-12-25T07:00:45.202Z",
    "ip_address": "45.32.86.6"
}
```

## Usage

### Scraping Trends

1. The scraper will automatically login to Twitter, scrape the top trending hashtags, and save the data to MongoDB.
2. The data will include:
   - Top 4 trending hashtags
   - Timestamp of the scraping operation
   - IP address used for scraping (provided by ProxyMesh)

### Trigger Scraping via API

Send a POST request to `/trends` to manually trigger the scraping process.

Example cURL request:

```bash
curl -X POST http://localhost:3000/api/trends
```

### Fetch Latest Trends

To retrieve the latest trends, send a GET request to `/latest`.

Example cURL request:

```bash
curl http://localhost:3000/api/latest
```

## Code Structure

```bash
twitter-trends-scraper/
│
├── app/
│   ├── controllers/
│   │   └── trendsController.js      # Contains logic for running the scraper and handling API requests
│   ├── models/
│   │   └── trend.js                 # Mongoose model for storing trends in MongoDB
│   ├── services/
│   │   └── scrapeService.js         # Service to handle Selenium scraping logic
│   ├── config/
│   │   └── db.js                    # Contains the Database configuration
│   └── app.js                       # Main Express application setup
│
├── public/
|   |── index.html
│   └── css/
│       └── style.css                # Styles for the frontend page
│
├── .env                             # Environment variables (proxy credentials, MongoDB URI, etc.)
├── package.json
├── package-lock.json
└── README.md
```

## ProxyMesh Integration

This project uses ProxyMesh for rotating IPs while scraping. Ensure that you have set up a ProxyMesh account and entered your credentials in the `.env` file.

## Troubleshooting

- **Unable to Obtain Browser Driver**: If you encounter issues related to Selenium WebDriver, make sure you have the correct drivers installed for the browser you're using (e.g., ChromeDriver).
- **Proxy Issues**: If you're having trouble with ProxyMesh, check that your credentials and proxy URL are correct in the `.env` file.

For more details on how to install and configure the necessary drivers, visit [Selenium's official documentation](https://www.selenium.dev/documentation/webdriver/troubleshooting/errors/driver_location/).


## License

This project is licensed under the MIT License.
