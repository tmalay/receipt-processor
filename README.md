# Receipt Processor API

A simple application for processing receipts and calculating points based on predefined rules. 

## Endpoints

### 1. Process Receipts
- **Path**: `/receipts/process`
- **Method**: `POST`
- **Description**: Submits a receipt for processing and returns a unique receipt ID.
- **Payload**:
    ```json
    {
      "retailer": "Target",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
        { "shortDescription": "Emils Cheese Pizza", "price": "12.25" }
      ],
      "total": "18.74"
    }
    ```
- **Response**:
    ```json
    { "id": "some-unique-id" }
    ```

---

### 2. Get Points
- **Path**: `/receipts/{id}/points`
- **Method**: `GET`
- **Description**: Returns the points awarded for the given receipt ID.
- **Response**:
    ```json
    { "points": 32 }
    ```

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or later) and npm installed, or Docker installed.

---

### 2. Running Locally

#### Clone the Repository
------------

To clone this app, simply:

```console
$ git clone https://github.com/tmalay/receipt-processor.git
```
No you can go to our repo directory by, simply:

```console
$ cd receipt-processor
```
Install Global dependencies
------------

To install global dependencies, simply:

```console
$ npm install --global typescript @nestjs/cli
```
Install Dependencies
------------

To install dependencies, simply:

```console
$ npm install
```
or 

```console
$ yarn install
```

Run the Application
```console
$ npm run start
```

Build the Docker Image

```console
$ docker build -t receipt-processor
```

Run the Docker Container

```console
$ docker run -p 3000:3000 --name receipt-processor receipt-processor
```

You can check Swagger of the Application on
```
http://localhost:3000/api/

```