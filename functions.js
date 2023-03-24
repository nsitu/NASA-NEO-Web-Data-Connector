import { DateTime } from "luxon" 
import fetch from "node-fetch"
 
 
const getDataType = (id, property) => {
  // try to infer the data type of the given property
  // bool, date, datetime, float, geometry, int, string 
  let dataType = null
  
  if (typeof property == 'string') dataType = 'string'
  if (Number(property) === property){
    if ( property % 1 === 0) dataType = 'int'
    if ( property % 1 !== 0) dataType = 'float' 
  } 
  
  let iso = DateTime.fromISO(property)
  if (!iso.invalid){
    if (iso.c.hour == 0 && iso.c.minute == 0){ dataType = 'date' }
    else{ dataType = 'datetime' }
  }
  if (property === true) dataType = 'bool'
  if (property === false) dataType = 'bool'

  return dataType
}

// try to make a human readable alias with nice spacing and capitalization 
// in this case we replace underscores, dots, and dashes with spaces
// we also capitalize each word to attain "Title Case"
const getHumanFriendlyName = (propertyName) => {
  return propertyName
      .replaceAll('.',' ')
      .replaceAll('_',' ')
      .replaceAll('-',' ')
      .replace( /\w\S*/g, (txt) => {
        let firstLetterOfWord = txt.charAt(0).toUpperCase()
        let restOfTheWord = txt.substr(1).toLowerCase()
        return  firstLetterOfWord + restOfTheWord
      })
      .trim()
}

export { getDataType, getHumanFriendlyName}