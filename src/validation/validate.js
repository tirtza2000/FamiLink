  
export const checkValidity = (value, rules) => {
    let isValid = true;
    let errMessage = '';
    if (rules.required) {
      isValid = value.trim() !== '' && isValid === true;
      if (!isValid) {
        errMessage = 'שדה זה הינו שדה חובה';
        return errMessage;
      }
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid === true;
      if (!isValid) {
        errMessage = `הכנס לפחות ${rules.minLength} תווים`;
        return errMessage;
      }
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid === true;
      if (!isValid) {
        errMessage = errMessage = `הכנס עד ${rules.maxLength} תווים`;
        return errMessage;
      }
    }
    if (rules.regExc) {
      isValid = rules.regExc.test(value);
      if (!isValid) {
        errMessage = 'ערך לא חוקי';
        return errMessage;
      }
    }
    if (rules.letterOnly) {
      isValid = !/\d/.test(value);
      if (!isValid) {
        errMessage = 'הכנס רק אותיות';
        return errMessage;
      }
    }

    if (rules.numberOnly) {
        isValid = /^[0-9]+$/.test(value);
        if (!isValid) {
          errMessage = 'הכנס רק מספרים';
          return errMessage;
        }
      }
    return errMessage;
  };