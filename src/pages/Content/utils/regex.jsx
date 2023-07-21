// regex function to check if string is an email
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// regex function to check if string is a url
export const validateUrl = (url) => {
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  return re.test(url);
}

// regex function to check if string is full name
export const validateName = (name) => {
  const re = /^[a-zA-Z]{2,} \s [a-zA-Z]{2,}$/;
  const re2 = /^[a-z ,.'-]+$/i;
  const re3 = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  return re3.test(name);
}

// regex function to remove all ansi characters
export const stripAnsi = (str) => {
  return str.replace(/\u001b\[[0-9]{1,2}m/g, "");
}
