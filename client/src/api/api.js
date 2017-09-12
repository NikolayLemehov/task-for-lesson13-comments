class Api {
  static get(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.send();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) {
          successCallback(JSON.parse(xhr.response));
        } else {
          errorCallback(e.responseText);
        }
      }
    });
  }

  static post(url, data,  successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) {
          successCallback(JSON.parse(xhr.response));
        } else {
          errorCallback(e.responseText);
        }
      }
    });
  }

  static delete(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', url, true);

    xhr.send();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) {
          successCallback(JSON.parse(xhr.response));
        } else {
          errorCallback(e.responseText);
        }
      }
    });
  }
}

export { Api };