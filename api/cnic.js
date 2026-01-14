import fs from "fs"
import path from "path"

export default async function handler(req, res) {
  const { cnic } = req.query

  if (!cnic) {
    return res.status(400).json({ success: false, message: "CNIC required" })
  }

  const filePath = path.join(process.cwd(), "data.csv")
  const data = fs.readFileSync(filePath, "utf8").split("\n")

  const headers = data[0].split(",")

  for (let i = 1; i < data.length; i++) {
    const row = data[i].split(",")

    if (row[0] === cnic) {
      const record = {}
      headers.forEach((h, idx) => {
        record[h] = row[idx]
      })

      return res.status(200).json({
        success: true,
        record
      })
    }
  }

  return res.status(404).json({
    success: false,
    message: "Record not found"
  })
}
