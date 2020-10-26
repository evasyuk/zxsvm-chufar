import { GoogleSpreadsheet } from 'google-spreadsheet'
import { getSheetsCredentials } from './helper/meta'
import { SHEETS_ID } from './helper/_AppConfigGenerated'

let DOC

// Identifying which document we'll be accessing/reading from
(async () => {
  DOC = new GoogleSpreadsheet(SHEETS_ID)
  // use service account creds
  await DOC.useServiceAccountAuth(getSheetsCredentials())

  await DOC.loadInfo() // loads document properties and worksheets
  console.log('sheets success!', DOC.title)
})()
