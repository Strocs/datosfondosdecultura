import { spawn } from 'node:child_process'
export const processPdfWithPython = async ({ url, type, year }) => {
  try {
    // Fetch the PDF and get the buffer
    const pdfBuffer = await fetch(url).then(res => res.arrayBuffer())

    // Spawn a Python process
    const pythonProcess = spawn('py', ['../parse-pdf-py/main.py', type, year])

    // Send the PDF buffer to the Python process's stdin
    pythonProcess.stdin.write(Buffer.from(pdfBuffer))
    pythonProcess.stdin.end()

    pythonProcess.stdout.on('data', data => {
      console.log(`Python stdout:\n${data}`)
    })

    pythonProcess.stderr.on('data', data => {
      console.error(`Python stderr:\n${data}`)
    })

    pythonProcess.on('close', code => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`)
      }
    })

    await new Promise((resolve, reject) => {
      pythonProcess.on('exit', code => {
        if (code === 0) {
          resolve(console.log(`Successful data process of: ${url}`))
        } else {
          reject(new Error(`Python process exited with code ${code}`))
        }
      })
    })
  } catch (error) {
    console.error(`Error processing PDF ${url}:`, error)
  }
}
