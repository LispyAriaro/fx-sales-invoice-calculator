'use script'

import $ from 'jquery'


export function isOnline(path = '/favicon.ico') {
  const xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');

  // Open new request as a HEAD to the root hostname with a random param to bust the cache
  xhr.open('HEAD', `//${window.location.host}${path}?rand=${Math.floor((1 + Math.random()) * 0x10000)}`, true);

  return new Promise(resolve => {
    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
        return resolve(true);
      }
      resolve(false);
    }
    };
    xhr.send(null);
  });
}

export function firstWord(value, def) {
  if(!value)
    return value;

  value = value.split(' ');
  return value[0];
}

export function limitTo(word, maxLength) {
  if(word.length > maxLength) word = word.substring(0, maxLength);
  return word
}

export function getMultiLineHoverText(fullTitle) {
  var titleLength = fullTitle.length;
  var finalText = "";
  for(var i = 0; i < fullTitle.length; i++) {
      finalText += fullTitle.charAt(i);
      if (i > 0 & i % 45 == 0) {
          finalText += "\n";
      }
  }
  return finalText;
}

