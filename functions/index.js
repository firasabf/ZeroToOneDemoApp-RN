const { Change } = require('firebase-functions');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
// const { default: context } = require('react-bootstrap/esm/AccordionContext');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.scheduledFunctionCrontab = functions.pubsub.schedule('every 5 minutes')
  .onRun((context) => {
  console.log('This will be run every day at 11:05 AM Eastern!');
  return null;
});

exports.computeLandRequirements = functions.database.ref('/kycinfos').onWrite((change, context) => {
    console.log('ONWRITE INITIATED')
    
    const before = change.before.val()
    const after = change.after.val()

    // if(after.location === undefined){ 
    //     // Deleted: data before but no data after
    //     console.log('Deleted');
    //   }
      
    //   if(before.location && after.location){ 
    //     // Updated: data before and data after
    //     console.log('Update');
    //   }
      
    //   if(!before.location && after.location){ 
    //     // Created: no data before but data after
    //     console.log('Created');
    //   }

    if(after === undefined){ 
        // Deleted: data before but no data after
        console.log('Deleted');
      }
      
      if(before && after){ 
        // Updated: data before and data after
        console.log('Update');
        landRequirements(before, after)
      }
      
      if(!before && after){ 
        // Created: no data before but data after
        console.log('Created');
        landRequirements(before, after)
      }
})

var Data = [];
landRequirements = async (before, after) => {
    const location = after.location
    const month = after.month
    const plantName = after.plantType
    const plantAge = after.plantAge
    const landSize = after.landSize
    const irrigationSystemCapacity = after.irrigationSystemCapacity
    const soilType = after.soilType
    console.log('irrigationSystemCapacity',irrigationSystemCapacity, after)
    //await Data.push({ kyc: after})
    // await Data.push({ 
    //   location: location,
    //   month: month,
    //   plantName: plantName,
    //   plantAge: plantAge,
    //   landSize: landSize,
    //   irrigationSystemCapacity: irrigationSystemCapacity,
    //   soilType: soilType
    // })
    Data['location'] = location
    Data['month'] = month
    Data['plantName'] =  plantName
    Data['plantAge'] = plantAge
    Data['landSize'] = landSize
    Data['irrigationSystemCapacity'] = irrigationSystemCapacity
    Data['soilType'] = soilType
    console.log('DAta irrigationSystemCapacity2222', Data)


    // Gets the ET0, Humidity, MaxTemp, MinTemp, Rad, Sun, Wind regarding to the month and location
    var dataCountries = await admin.database().ref().child('dataCountries/lebanon').child(location).child(month).once('value') 
    .then((snapshot) => {
       const value = snapshot.val()
       console.log('value',value)
       return value
     }).catch(error => {
       console.error('Error while reading data', error);
       return error
   });
  //  await Data.push({
  //   ETo: dataCountries.ETo,
  //   humidity: dataCountries.Humidity,
  //   // maxTemp: dataCountries.['Max Temp'],
  //   // minTemp: dataCountries.['Min Temp'],
  //   month: dataCountries.month,
  //   rad: dataCountries.Rad,
  //   sun: dataCountries.Sun,
  //   wind: dataCountries.Wind,
  //   })

    Data['ETo'] = dataCountries.ETo
    Data['humidity'] = dataCountries.Humidity
    // maxTemp: dataCountries.['Max Temp'],
    // minTemp: dataCountries.['Min Temp'],
    // Data['month'] = dataCountries.month
    Data['rad'] = dataCountries.Rad
    Data['sun'] = dataCountries.Sun
    Data['wind'] = dataCountries.Wind

   await console.log('dataCountries',dataCountries)
   await console.log('dataCountries2',Data)
   //console.log('dataCountries3',Data.dataCountries)
   await console.log('dataCountries4',Data.ETo)

   var plantDetails = await admin.database().ref().child('plantDetails').child(plantName).once('value') 
   .then((snapshot) => {
      const value = snapshot.val()
      console.log('value',value)
      return value
    }).catch(error => {
      console.error('Error while reading data', error);
      return error
  });
  console.log('plantDetails',plantDetails)
  //await Data.push({plantDetails: plantDetails})
  Data['Ldev'] = plantDetails.Ldev
  Data['Lini'] = plantDetails.Lini
  Data['Llate'] = plantDetails.Llate
  Data['Lmid'] = plantDetails.Lmid
  Data['kcEnd'] = plantDetails.kcEnd
  Data['kcIni'] = plantDetails.kcIni
  Data['kcMid'] = plantDetails.kcMid
  //Data['maxCropHeight'] = plantDetails.maxCropHeight
  Data['plantDate'] = plantDetails.plantDate
  Data['region'] = plantDetails.region
  Data['totalDays'] = plantDetails.totalDays

  console.log("plantDetails", Data)
  console.log("plantDetails2", Data)
  console.log("plantDetails3", Data.kcIni)

  // calculate Kc, get the stage and calculate that according to the age
  const et0 = Data.ETo
// calculate the stage of the plant
  //const plantKc = plantDetails
  const Lini = Data.Lini
  const Ldev = Data.Lini + Data.Ldev
  const Lmid = Data.Lini + Data.Ldev + Data.Lmid
  const Llate = Data.Lini + Data.Ldev + Data.Lmid + Data.Llate
  if (plantAge <= Lini){
    //plant is in ini stage
    const plantKc = Data.kcIni
    await calculateEtc(plantKc, et0)
  }else if(plantAge <= Ldev){
    //plant is in dev stage
    const plantKc = Data.kcMid
    await calculateEtc(plantKc, et0)
  }else if(plantAge <= Lmid){
    //plant is in mid stage
    const plantKc = Data.kcEnd
    await calculateEtc(plantKc, et0)
  }else if(plantAge <= Llate){
    //plant is in late stage
    const plantKc = Data.kcEnd
    await calculateEtc(plantKc, et0)
  }
  //const ETc = plantKc * et0
}

calculateEtc = async (plantKc, et0) => {
    const ETc = plantKc * et0
    await console.log('ETc DAta calculated',ETc)
    //await Data.push({ETc: ETc})
    Data['ETc'] = ETc
    console.log('ETC', Data)
    console.log('ETC1', Data)
    console.log('ETC2', Data.ETc)
    await calculateIrigationTime()
    await calculateSensorPressure()
    await saveLandRequirementsData()
}

calculateIrigationTime = async () => {
  console.log("DATA STATE", Data.landSize, Data.ETc, Data.irrigationSystemCapacity)
  //get ETc
  const ETc = Data.ETc
  //convert ETc from mm/day to m3/ha
  var cubicMeterPerHectar = ETc * 10
  //convert landSize from m2 to ha
  const meterToHectare = Data.landSize * 0.0001
  //gets the area of the land in m3
  const area = meterToHectare * cubicMeterPerHectar
  console.log('timeToIrrigate Data',ETc,cubicMeterPerHectar, meterToHectare, area, Data.irrigationSystemCapacity )
  //converts from m3 to liters   ---land water requirements
  const areaToLiters = area * 1000 
  const timeToIrrigate = areaToLiters / Data.irrigationSystemCapacity
  console.log('timeToIrrigate',timeToIrrigate)
}

calculateSensorPressure = async () => {
  if(Data.soilType === 'silt'){
    Data['sensorPressure']= {
      'min': 30,
      'max': 50,
      'freeWaterRange': '0 - 10',
      'fieldCapacityRange': '10 - 20',
    }
    // Data.push({
    //   "sensorPressure": {
    //     'min': 30,
    //     'max': 50,
    //   }
    //})
  }
  else if(Data.soilType === 'clay'){
    Data['sensorPressure']= {
      'min': 50,
      'max': 60,
      'freeWaterRange': '0 - 10',
      'fieldCapacityRange': '10 - 20',
    }
  }
  else if(Data.soilType === 'sand'){
    Data['sensorPressure']= {
      'min': 20,
      'max': 30,
      'freeWaterRange': '0 - 10',
      'fieldCapacityRange': '10 - 20',
    }
  }else{
    // error 
    Data['sensorPressure']= {
      'min': 0,
      'max': 0,
      'freeWaterRange': '0 - 10',
      'fieldCapacityRange': '10 - 20',
    }
  }

  await console.log('FINAL DATA LIST', Data)
}

saveLandRequirementsData = async () => {
  //save data in landRequirements database
  const landRequirementsRef = admin.database().ref().child('landRequirements');
  await landRequirementsRef.set({
    status: true,
    Data
    })
    .then(() => {
      return true
    })
}