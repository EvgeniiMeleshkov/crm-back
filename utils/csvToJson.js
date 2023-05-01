export default function csvToJson (csv) {
  if (!csv) {
    throw new Error('Unexpected input')
  }
  const arr = csv.split('\n')
  const result = []

  for (let i = 1; i < arr.length; i++) {
    const obj = {}
    const keyArr = arr[0].split(',')
    for (let j = 0; j < keyArr.length; j++) {
      const valueArr = arr[i].split(',')
      obj[keyArr[j]] = valueArr[j]
    }
    result.push(obj)
  }
  return result
}
