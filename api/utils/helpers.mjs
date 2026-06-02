import got from 'got'

export async function apiRequest(url, method, object) {
  try {
    const data = await got
      .post(url, {
        form: {
          method: method,
          p0: JSON.stringify(object)
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        responseType: 'json'
      })
      return data.body
  } catch (error) {
    console.log('Błąd: ', error)
  }

}
