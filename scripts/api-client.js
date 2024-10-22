// to fetch the data from mock server
export default async function makeNetworkCall(URL){
    // const promise= fetch(URL); // async way
    try{
       const response=await fetch(URL);
       return response;
    }catch(err){
       throw err;
    }
    // return promise;
 }