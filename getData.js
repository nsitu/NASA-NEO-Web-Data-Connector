import fetch from "node-fetch" 
import { cleanData } from './cleanData.js'
  

const getData = async (pageCount = 10) => { 

  // array of all the pages we want (e.g. the first 10 pages)
  let pageIndex = Array.from({length: pageCount}).map((v,k)=>k+1)
  console.log(pageIndex) 
  
  // for all these pages, retrieve some data from an API endpoint
  let pages = pageIndex.map(async pageNumber => {
    let url = new URL('https://api.nasa.gov/neo/rest/v1/neo/browse/')
    url.searchParams.append('page', pageNumber)
    url.searchParams.append('api_key', process.env.API_KEY) 
    let response = await fetch(url.href)
    let json = await response.json() 
    return json.near_earth_objects.map(data => cleanData(data)) 
  }) 
  // wait for all the pages to finish fetching rows
  let rows = await Promise.all(pages)  
  // flatten all the pages into one array of rows
  return rows.flat()  
 
}

export { getData } 