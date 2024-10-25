# Server

A backend server created for ytClone app with the help of node, express, mongoose & rest apis.

## Prerequisites

Before you start, ensure you have Node.js installed on your machine. If not, you can download and install it from [here](https://nodejs.org/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/avi074/ShoppyGlobe-Server.git
```

2. Navigate into the project directory:

```bash
cd yt-clone/server
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

- `config` : Contains configuration files

- `middlewares/` : Contains middleware functions for api handling.

- `models/` : Contains mongodb models

- `controllers/` : Contains controller functions for models

- `routers/` : Contains multiple routers based on models

- `services/` : Contains youTube api service functions

- `tasks/` : Contains tasks regarding local-db updates from services

- `utils/` : Contains utility function for logging & handling

- `uploads/` : Conatins static files for users, channels & videos

- `server.js` : server js file

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
