import got from 'got'

export async function apiRequest(url, method, object) {
  try {
    return await got
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
  } catch (error) {
    console.log('Błąd: ', error)
  }

}
