# JSON Deep Comparison Tool
This project is a JSON Comparison Tool developed with React on the frontend and NestJS on the backend. It enables users to perform a deep comparison of two JSON objects, highlighting any differences between them. The tool intelligently parses and sorts the objects, making it easy to identify discrepancies even when the data is presented in a different order. This is particularly useful for verifying that two objects contain the same data, regardless of the order in which the information appears.

## Future Improvements
This is a work in progress at the moment

* Add more comprehensive handling of edge cases for different JSON formats.
* Improve UI for a better user experience, especially for large JSON objects.
* Extend the comparison logic to detect differences in data types, not just values.
 
## Project setup

Before running the project, ensure that you have the following installed:
* Node.js
* npm
* NestJS
 
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../
npm install
```

## Compile and run the project

```bash
# build Frontend
npm run build:fe

# Run project
npm run start
```

## Run tests

```bash
# unit tests
npm run test
```


