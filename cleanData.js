import flatten from "flat"
import { DateTime } from "luxon" 

// function to clean up API data
const cleanData = (input) => {
  // flatten the structural hierarchy 
  // See also: https://www.npmjs.com/package/flat
 

  // flatten the hierarchy of the data 
  let data = flatten(input, { delimiter: '_' })  
  
  return data
}

export {cleanData}