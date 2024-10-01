# Server

A backend server created for Frontend with the help of node, express, mongoose & rest apis.

## Prerequisites

Before you start, ensure you have Node.js installed on your machine. If not, you can download and install it from [here](https://nodejs.org/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/avi074/ShoppyGlobe-Server.git
```

2. Navigate into the project directory:

```bash
cd Web-Template/server
```

3. Install dependencies:

```bash
npm install
```

## Usage

To start the server, start the mongodb local server / add your mongo atlas uri & then open the Folder in IDE & run

```bash
npm start
```

## Folder Structure

- `middlewares/` : Contains middleware functions for api handling.

- `models/` : Contains mongodb models for cart, product & user

- `controllers/` : Contains controller functions for models

- `routers/` : Contains multiple routers based on models

- `screenshots/` : Contains sample screenshots of api calls

- `server.js` : server config js file

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
