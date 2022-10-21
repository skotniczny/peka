import got from 'got'

export async function apiRequest(url, method, object) {
  try {
    const data = await got
      .post({
        url: url,
        form: {
          method: method,
          p0: JSON.stringify(object)
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      const body = JSON.parse(data.body)
      return body
  } catch (error) {
    console.log('Błąd: ', error)
  }

}
