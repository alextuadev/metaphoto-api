# MetaPhoto API

This project is a RESTful API developed for MetaPhoto, a startup that helps photographers organize their photo libraries. The API provides endpoints to retrieve enriched information about photos, including associated album and user details.

## Features

- Retrieval of photo information enriched with album and user details
- Filtering of photos by title, album title, and user email
- Pagination of results

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Axios for HTTP calls

## Prerequisites

- Node.js (version 20.x or higher recommended)
- npm (usually comes with Node.js)

## Local Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/metaphoto-api.git
   cd metaphoto-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root and add the following line:
   ```
   PORT=3001
   ```
   You can change the port number if desired.

4. Compile the project:
   ```
   npm run build
   ```

5. Start the server in development mode:
   ```
   npm start
   ```

The server should now be running at `http://localhost:3000` (or the port you specified).

## Usage

The API provides the following endpoints:

- `GET /externalapi/photos`: Retrieves all photos (with filtering and pagination options)
- `GET /externalapi/photos/:id`: Retrieves a specific photo by ID

### Usage Examples

1. Get all photos:
   ```
   GET http://localhost:3000/externalapi/photos
   ```

2. Filter photos by title:
   ```
   GET http://localhost:3000/externalapi/photos?title=repudiandae%20iusto
   ```

3. Filter photos by album title:
   ```
   GET http://localhost:3000/externalapi/photos?album.title=quidem
   ```

4. Filter photos by album user's email:
   ```
   GET http://localhost:3000/externalapi/photos?album.user.email=Sincere@april.biz
   ```

5. Combine multiple filters:
   ```
   GET http://localhost:3000/externalapi/photos?album.title=quidem&title=repudiandae%20iusto
   ```

6. Use pagination:
   ```
   GET http://localhost:3000/externalapi/photos?limit=10&offset=20
   ```

## Deployment

To deploy this API on a production server, follow these steps:

1. Ensure you have Node.js version 20.x or higher installed on your server.

2. Clone the repository on your server:
   ```
   git clone https://github.com/your-username/metaphoto-api.git
   cd metaphoto-api
   ```

3. Install dependencies:
   ```
   npm install --production
   ```

4. Create a `.env` file and configure the necessary environment variables:
   ```
   PORT=80
   NODE_ENV=production
   ```

5. Compile the project:
   ```
   npm run build
   ```

6. Start the server:
   ```
   npm run start
   ```

To keep the API running after closing the SSH session, consider using a process manager like PM2:

1. Install PM2 globally:
   ```
   npm install -g pm2
   ```

2. Start the application with PM2:
   ```
   pm2 start dist/server.js --name metaphoto-api
   ```

3. Configure PM2 to restart the application if the server reboots:
   ```
   pm2 startup
   pm2 save
   ```
