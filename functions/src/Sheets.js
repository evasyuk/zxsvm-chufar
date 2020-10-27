import { GoogleSpreadsheet } from 'google-spreadsheet'
import { getSheetsCredentials } from './helper/meta'
import { SHEETS_ID } from './helper/_AppConfigGenerated'

const ROWS_ABC = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

let DOC
let SHEET_1
let HEADER_ROW_1

const getSheetInfo = (sheetId = 0) => {
  return new Promise((resolve, reject) => {
    const sheet = DOC.sheetsByIndex[sheetId]
    sheet.loadHeaderRow()
      .then(() => {
        resolve([sheetId, sheet, sheet.headerValues])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const _readRow = async (rIndex, startC = 0, endC = 10) => {
  let row = []
  let internalIndex = 0

  const range = `${ROWS_ABC[startC]}${rIndex}:${ROWS_ABC[endC]}${rIndex}`
  await SHEET_1.loadCells(range)

  for (let cIndex = startC; cIndex < endC; cIndex += 1, internalIndex += 1) {
    const cell = await SHEET_1.getCell(rIndex, cIndex)
    row[internalIndex] = {
      value: cell.value,
      rIndex,
      cIndex,
    }
  }
  return row
}

const _readColumn = async (cIndex, startR = 1, endR = 10) => {
  let column = []
  let internalIndex = 0

  const range = `${ROWS_ABC[cIndex]}${startR}:${ROWS_ABC[cIndex]}${endR}`

  await SHEET_1.loadCells(range)

  for (let rIndex = startR; rIndex < endR; rIndex += 1, internalIndex += 1) {
    const cell = await SHEET_1.getCell(rIndex, cIndex)
    column[internalIndex] = {
      value: cell.value,
      rIndex,
      cIndex,
    }
  }
  return column
}

const getRealRow = async (rIndex) => {
  const row = []

  for (let cIndex = 0; cIndex < HEADER_ROW_1.length; cIndex += 1) {
    const cell = await SHEET_1.getCell(rIndex, cIndex)
    row[cIndex] = {
      value: cell.value,
      rIndex,
      cIndex,
    }
  }

  return {
    headerRow: HEADER_ROW_1,
    rIndex,
    row,
  }
}

const getObjectById = async (rIndex) => {
  let result = {}
  const row = await getRealRow(rIndex)

  row.headerRow.forEach((key, index) => {
    result[key] = row.row[index].value
  })

  return {
    rIndex,
    value: result,
  }
}

const getRealColumn = async (cIndex) => {
  const header = await SHEET_1.getCell(0, cIndex).value
  const values = []

  let shouldStop = false

  let step = 10
  let startR = 1, endR = 50
  while (!shouldStop) {
    const interimValues = await _readColumn(cIndex, startR, startR + step)

    for (let index = 0; index < interimValues.length; index += 1) {
      const item = interimValues[index]
      if (item.value !== null) {
        values.push(item)
      } else {
        shouldStop = true
        break
      }
    }

    startR = startR + step

    if (!shouldStop) {
      shouldStop = startR >= endR
    } else {
      break
    }
  }
  return {
    header,
    values,
    cIndex,
  }
}

const findExistingUser = async (id) => {
  await SHEET_1.loadCells({ // GridRange object
    startRowIndex: 0, endRowIndex: 10, startColumnIndex:0, endColumnIndex: 10
  })

  const column_id = await getRealColumn(0)

  const found = column_id.values.find((it) => it.value === id)

  if (found) {
    const objMeta = await getObjectById(found.rIndex)
    return [objMeta.rIndex, objMeta.value]
  }

  return [null, null]
}

// Identifying which document we'll be accessing/reading from
(async () => {
  DOC = new GoogleSpreadsheet(SHEETS_ID)
  // use service account credentials
  await DOC.useServiceAccountAuth(getSheetsCredentials())

  await DOC.loadInfo() // loads document properties and worksheets

  const [_, sheet, headerRow] = await getSheetInfo(1)

  SHEET_1 = sheet
  HEADER_ROW_1 = headerRow

  console.log('sheets success! DOC.title', DOC.title)
  // console.log('loaded sheet', [sheetId, sheet, headerRow])
})()

export const addUser = async (tgMessage) => {
  const { id, is_bot, first_name, username, language_code } = tgMessage.message.from
  const text = tgMessage.message.text

  const line = [id, is_bot, first_name, username, language_code]

  try {
    const [existRow, existColumn] = await findExistingUser(id)
  } catch (err) {
    console.log(err)
  }
  //
  // // console.log('HEADER_ROW_1', HEADER_ROW_1)
  // await SHEET_1.addRow(line)

  //
  // await findAlreadyExisting(1, '')
  //
  // const sheet = DOC.sheetsByIndex[1]
  // // const rows = await sheet.getRows()
  //
  // // await sheet.loadCells({ // GridRange object
  // //   startRowIndex: 0, endRowIndex: 100, startColumnIndex:0, endColumnIndex: 200
  // // });
  //
  //
  // console.log('sheet title', sheet.title)
  // console.log('sheet rows', sheet.rowCount)
  //
  // // console.log('iterating rows', )
  // // rows.forEach((row) => {
  // //   console.log('row', row)
  // // })
}

const findAlreadyExisting = async (sheetId = 1, columnName, cellValue) => {
  // const sheet = DOC.sheetsByIndex[sheetId]
  // const headerRow = await sheet.loadHeaderRow()

  console.log('findAlreadyExisting', headerRow)
}
