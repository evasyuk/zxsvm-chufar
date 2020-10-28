import { GoogleSpreadsheet } from 'google-spreadsheet'
import { getSheetsCredentials } from './helper/meta'
import { SHEETS_ID } from './helper/_AppConfigGenerated'

const ROWS_ABC = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

class BaseTab {
  constructor(parentDOC, sheetId) {
    this.sheetId = sheetId
    this.parentDOC = parentDOC

    this.headerRow = null

    this.ready = false
  }
  
  init = async () => {
    const [_, sheet, headerRow] = await BaseTab.getSheetInfo(this.parentDOC, this.sheetId)
    this.sheet = sheet
    this.headerRow = headerRow

    await this.sheet.loadCells({ // GridRange object
      startRowIndex: 0, endRowIndex: 10, startColumnIndex:0, endColumnIndex: 10
    })

    this.ready = true
    debug('tab initialized', this.sheetId, this.headerRow)
  }

  _readRow = async (rIndex, startC = 0, endC = 10) => {
    let row = []
    let internalIndex = 0

    const range = `${ROWS_ABC[startC]}${rIndex}:${ROWS_ABC[endC]}${rIndex}`
    await this.sheet.loadCells(range)

    for (let cIndex = startC; cIndex < endC; cIndex += 1, internalIndex += 1) {
      const cell = await this.sheet.getCell(rIndex, cIndex)
      row[internalIndex] = {
        value: cell.value,
        rIndex,
        cIndex,
      }
    }
    return row
  }

  _readColumn = async (cIndex, startR = 1, endR = 10) => {
    let column = []
    let internalIndex = 0

    const range = `${ROWS_ABC[cIndex]}${startR}:${ROWS_ABC[cIndex]}${endR}`

    await this.sheet.loadCells(range)

    for (let rIndex = startR; rIndex < endR; rIndex += 1, internalIndex += 1) {
      const cell = await this.sheet.getCell(rIndex, cIndex)
      column[internalIndex] = {
        value: cell.value,
        rIndex,
        cIndex,
      }
    }
    return column
  }

  getRealRow = async (rIndex) => {
    const row = []

    for (let cIndex = 0; cIndex < this.headerRow.length; cIndex += 1) {
      const cell = await this.sheet.getCell(rIndex, cIndex)
      row[cIndex] = {
        value: cell.value,
        rIndex,
        cIndex,
      }
    }

    return {
      headerRow: this.headerRow,
      rIndex,
      row,
    }
  }

  getObjectById = async (rIndex) => {
    let result = {}
    const row = await this.getRealRow(rIndex)

    row.headerRow.forEach((key, index) => {
      result[key] = row.row[index].value
    })

    return {
      rIndex,
      value: result,
    }
  }

  getRealColumn = async (cIndex) => {
    const header = await this.sheet.getCell(0, cIndex).value
    const values = []

    let shouldStop = false

    let step = 10
    let startR = 1, endR = 50
    while (!shouldStop) {
      const interimValues = await this._readColumn(cIndex, startR, startR + step)

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

  static getSheetInfo = async (myDoc, sheetId = 0) => {
    return new Promise((resolve, reject) => {
      const sheet = myDoc.sheetsByIndex[sheetId]
      sheet.loadHeaderRow()
        .then(() => {
          resolve([sheetId, sheet, sheet.headerValues])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

class UserTab extends BaseTab {
  findExistingUser = async (user) => {
    const id = user.id

    // await this.sheet.loadCells({ // GridRange object
    //   startRowIndex: 0, endRowIndex: 10, startColumnIndex:0, endColumnIndex: 10
    // })

    const column_id = await this.getRealColumn(0)

    const found = column_id.values.find((it) => it.value === id)

    if (found) {
      const objMeta = await this.getObjectById(found.rIndex)
      return [objMeta.rIndex, objMeta.value]
    }

    return [null, null]
  }

  addUser = async (user) => {
    const [rIndex] = await this.findExistingUser(user)

    if (rIndex) {
      // debug('record already exist. skipping..')
      return false
    }

    await this.sheet.addRow(user)
    return true
  }
}

class EventsTab extends BaseTab {
  queryEventsByDate = async (date = '12/11/2020') => {
    const column_date = await this.getRealColumn(0)

    console.log('column_date', column_date)

    const items = column_date.filter((it) => it.value === date)
    console.log(items)

    return []
  }

  queryEventsInRange = async (startDate, endDate) => {
    return []
  }
}

class MySheets {
  constructor(doc_id) {
    this.DOC = null
    this.doc_id = doc_id

    this.userSheet = null

    this.ready = false
  }

  init = async () => {
    this.DOC = new GoogleSpreadsheet(this.doc_id)
    // use service account credentials
    await this.DOC.useServiceAccountAuth(getSheetsCredentials())

    await this.DOC.loadInfo() // loads document properties and worksheets

    this.eventsSheet = new EventsTab(this.DOC, 0)
    this.userSheet = new UserTab(this.DOC, 1)

    await this.eventsSheet.init()
    await this.userSheet.init()

    this.ready = true

    debug('sheets document initialized')
  }

  waitForInit = async () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.ready) {
          clearInterval(interval)
          resolve()
        }
      }, 1000)
    })
  }
}

const mySheet = new MySheets(SHEETS_ID);

(async () => {
  await mySheet.init()
})()

export {
  mySheet,
}
