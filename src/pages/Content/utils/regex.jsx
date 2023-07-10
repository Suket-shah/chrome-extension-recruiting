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
  return re.test(name);
}
