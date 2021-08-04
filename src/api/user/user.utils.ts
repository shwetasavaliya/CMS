export const checkBlank = (payload: any[]) => {
  for (var i = 0; i < payload.length; i++) {
      if(payload[i] != '' || payload[i] != undefined || typeof payload[i] != 'undefined' ){
          return false;
      }
  }
  return true;
};
