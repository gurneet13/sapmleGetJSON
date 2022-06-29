const moment = require('moment');
const axios = require('axios').default;
 
const isPrime = async (num) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

const getData = async (url) => {
    let data = await axios.get(url);
    return data
}

const compareLogic = async(req,res) => {
    try {
         //chcekPrimeOrNot

        let data = await getData("https://jsonkeeper.com/b/N9OS");
        data = data.data;
        //console.log(data)
        if(!data) {
            //return error
            res.status(200).json({
                "msg":"No DATA"
            })
        }

        let currentDay = moment().format("DD");
        let responseObject = {
            isTags: [],
            noTags: []
        }


        for(let i of data) {
            let daycreatedAt = moment(i.createdAt).format("DD");
            let diff = (currentDay - daycreatedAt);
            let isPrimeOrNot = await isPrime(diff);
            i["isPrime"] = isPrimeOrNot;
            if(i && i.tag) {
                responseObject.isTags.push(i);
            } else {
                responseObject.noTags.push(i);
            }
        } 
        
        res.status(200).json({
            "msg":"Success",
            "data": responseObject
        })
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    compareLogic
}