# API Documentation

This document provides detailed information about all the endpoints available in the API.

---

## **Films Endpoints**

### **Get All Films**
- **URL**: `/films`
- **Method**: `GET`
- **Description**: Retrieves a list of all films.
- **Response Example**:
  ```json
  [
    {
      "title": "A New Hope",
      "opening_crawl": "It is a period of civil war...",
      "characters": "https://swapi.dev/api/people/1,https://swapi.dev/api/people/2",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25"
    }
  ]
  ```

### **Get Film by ID**
- **URL**: `/films/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific film by its ID.
- **Response Example**:
  ```json
  {
    "title": "A New Hope",
    "opening_crawl": "It is a period of civil war...",
    "characters": "https://swapi.dev/api/people/1,https://swapi.dev/api/people/2",
    "director": "George Lucas",
    "producer": "Gary Kurtz, Rick McCallum",
    "release_date": "1977-05-25"
  }
  ```

### **Get Most Frequent Character in a Film**
- **GraphQL Query**:
  ```graphql
  {
    film(id: "1") {
      title
      mostFrequentCharacter
    }
  }
  ```
- **Description**: Retrieves the name of the character that appears most frequently in the film's `opening_crawl`.
- **Response Example**:
  ```json
  {
    "title": "A New Hope",
    "mostFrequentCharacter": "Luke Skywalker"
  }
  ```

---

## **Species Endpoints**

### **Get All Species**
- **URL**: `/species`
- **Method**: `GET`
- **Description**: Retrieves a list of all species.
- **Response Example**:
  ```json
  [
    {
      "name": "Human",
      "classification": "mammal",
      "designation": "sentient",
      "average_height": "180",
      "skin_colors": "caucasian, black, asian, hispanic",
      "hair_colors": "blonde, brown, black, red",
      "eye_colors": "brown, blue, green, hazel, grey, amber",
      "average_lifespan": "120",
      "language": "Galactic Basic"
    }
  ]
  ```

### **Get Species by ID**
- **URL**: `/species/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific species by its ID.
- **Response Example**:
  ```json
  {
    "name": "Human",
    "classification": "mammal",
    "designation": "sentient",
    "average_height": "180",
    "skin_colors": "caucasian, black, asian, hispanic",
    "hair_colors": "blonde, brown, black, red",
    "eye_colors": "brown, blue, green, hazel, grey, amber",
    "average_lifespan": "120",
    "language": "Galactic Basic"
  }
  ```

---

## **Vehicles Endpoints**

### **Get All Vehicles**
- **URL**: `/vehicles`
- **Method**: `GET`
- **Description**: Retrieves a list of all vehicles.
- **Response Example**:
  ```json
  [
    {
      "name": "Sand Crawler",
      "model": "Digger Crawler",
      "manufacturer": "Corellia Mining Corporation",
      "cost_in_credits": "150000",
      "length": "36.8",
      "max_atmosphering_speed": "30",
      "crew": "46",
      "passengers": "30",
      "cargo_capacity": "50000",
      "consumables": "2 months",
      "vehicle_class": "wheeled"
    }
  ]
  ```

### **Get Vehicle by ID**
- **URL**: `/vehicles/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific vehicle by its ID.
- **Response Example**:
  ```json
  {
    "name": "Sand Crawler",
    "model": "Digger Crawler",
    "manufacturer": "Corellia Mining Corporation",
    "cost_in_credits": "150000",
    "length": "36.8",
    "max_atmosphering_speed": "30",
    "crew": "46",
    "passengers": "30",
    "cargo_capacity": "50000",
    "consumables": "2 months",
    "vehicle_class": "wheeled"
  }
  ```

---

## **Planets Endpoints**

### **Get All Planets**
- **URL**: `/planets`
- **Method**: `GET`
- **Description**: Retrieves a list of all planets.
- **Response Example**:
  ```json
  [
    {
      "name": "Tatooine",
      "rotation_period": "23",
      "orbital_period": "304",
      "diameter": "10465",
      "climate": "arid",
      "gravity": "1 standard",
      "terrain": "desert",
      "surface_water": "1",
      "population": "200000"
    }
  ]
  ```

### **Get Planet by ID**
- **URL**: `/planets/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific planet by its ID.
- **Response Example**:
  ```json
  {
    "name": "Tatooine",
    "rotation_period": "23",
    "orbital_period": "304",
    "diameter": "10465",
    "climate": "arid",
    "gravity": "1 standard",
    "terrain": "desert",
    "surface_water": "1",
    "population": "200000"
  }
  ```

---

## Notes
- All endpoints are paginated where applicable.
- The API returns data in JSON format.
- Error responses follow standard HTTP status codes.
  - `404`: Resource not found.
  - `500`: Internal server error.
  - `400`: Bad request.

---

This documentation covers all the available endpoints in the API for interacting with films, species, vehicles, starships, and planets.

