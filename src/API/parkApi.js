import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api/v1/parks',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZTEyNiIsImF1dGgiOiJtZW1iZXIiLCJleHAiOjE3MDEyMjE0ODh9.s5NR6PAuIPFrU0eF2HdhRzSLOdg5YSem8ZcfCWtdOr6s2jIbeTU8xY8Or11n_B6uMDXU0vwy_9i7XnxOE5qKLQ',
    },
});

export const getParksStates = (setStates) =>
  api
    .get("/states")
    .then((response) => setStates(response.data.data))
    .catch((error) => console.error("There was an error!", error));

export const getParksCities = (selectedState, setCities) => {
  if (selectedState) {
    api
      .get(`/states/${selectedState}`)
      .then((response) => setCities(response.data.data))
      .catch((error) => console.error("There was an error!", error));
  }
};

export const getParksInCity = (selectedState, selectedCity, setParks) => {
  if (selectedState && selectedCity) {
    api
      .get(`/states/${selectedState}/${selectedCity}`)
      .then((response) => {
        const parkSet = new Set();
        const nonDuplicateParks = response.data.data.filter((park) => {
          const duplicate = parkSet.has(park.parkNm);
          parkSet.add(park.parkNm);
          return !duplicate;
        });
        console.log(nonDuplicateParks);
        setParks(nonDuplicateParks);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  } else {
    setParks([]);
  }
  
};  
