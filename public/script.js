// Create a Tableau connector object
let myConnector = tableau.makeConnector() 

// Fetch the schema from NodeJS
// activate the schema so that Tableau can see it.
myConnector.getSchema = async (schemaCallback) => {
  let response = await fetch('/schema') 
  let tableSchema = await response.json()  
  schemaCallback([tableSchema])
} 

// Fetch data from NodeJS 
// Import rows of data into a Tableau Table
myConnector.getData = async (table, done) => {
  let response = await fetch('/data')
  let animals = await response.json()  
  table.appendRows(animals)
  done() 
}

// activate the connector in Tableau
tableau.registerConnector(myConnector)

// When the user clicks the submit button,
// Send the connector object to Tableau
document
  .querySelector('#submitButton')
  .addEventListener('click', () =>{
    // This will be the data source name in Tableau
    tableau.connectionName = "NASA NEO" 
    tableau.submit() 
  })
