import { getDataType, getHumanFriendlyName} from './functions.js'
import { getData } from './getData.js'

// Build a Schema based on the first page of results
const getSchema = async () => {
  let results = await getData(1)
  let columns = []  
  results.forEach(element => {
     Object.keys(element).map(id => {
       // if there isn't already a record in the schema
       if( !columns.some(column => column.id === id)){ 
         // try to infer the dataType
         let dataType = getDataType(id, element[id]) 
         // if the dataType isn't null
         if (dataType != null){
           // create an Alias
           let alias = getHumanFriendlyName(id)
           // add the column to the schema
           columns.push({ id, alias, dataType })
         } 
       } 
    })
  }) 
  return {
    id: "nasa_neo",
    alias: "NASA NEO",
    columns: columns
  }
} // end generateSchema

export { getSchema }