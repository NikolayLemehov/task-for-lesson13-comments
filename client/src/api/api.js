class Api {
  static defaultErrorHandler(e) {
    throw new Error(e);
  }

  static defaultSuccessHandler(e) {
    console.log('Response successful.');
  }

  static get(url, successCallback=Api.defaultSuccessHandler, errorCallback=Api.defaultErrorHandler) {
    $.ajax({
      method: 'GET',
      url,
      success: successCallback,
      error: errorCallback
    });
    // const xhr = new XMLHttpRequest();
    //
    // xhr.open('GET', url, true);
    //
    // xhr.send();
    //
    // xhr.addEventListener('readystatechange', () => {
    //   if (xhr.readyState === 4) {
    //     if(xhr.status === 200) {
    //       successCallback(JSON.parse(xhr.response));
    //     } else {
    //       errorCallback(e.responseText);
    //     }
    //   }
    // });
  }

  static post(url, data, successCallback=Api.defaultSuccessHandler, errorCallback=Api.defaultErrorHandler) {
    $.ajax({
      method: 'POST',
      url,
      data,
      success: successCallback,
      error: errorCallback
    });
    // const xhr = new XMLHttpRequest();
    //
    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(data));
    //
    // xhr.addEventListener('readystatechange', () => {
    //   if (xhr.readyState === 4) {
    //     if(xhr.status === 200) {
    //       successCallback(JSON.parse(xhr.response));
    //     } else {
    //       errorCallback(e.responseText);
    //     }
    //   }
    // });
  }

  static delete(url, successCallback=Api.defaultSuccessHandler, errorCallback=Api.defaultErrorHandler) {
    $.ajax({
      method: 'DELETE',
      url,
      success: successCallback,
      error: errorCallback
    });
    // const xhr = new XMLHttpRequest();
    //
    // xhr.open('DELETE', url, true);
    //
    // xhr.send();
    //
    // xhr.addEventListener('readystatechange', () => {
    //   if (xhr.readyState === 4) {
    //     if(xhr.status === 200) {
    //       successCallback(JSON.parse(xhr.response));
    //     } else {
    //       errorCallback(e.responseText);
    //     }
    //   }
    // });
  }
}

export { Api };